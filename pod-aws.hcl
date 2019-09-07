job "cinemas-microservice" {

  datacenters = ["aero-aws-us-west-1"]
  region      = "aero-aws-us-west-1-region"
  type        = "service"

  constraint {
    attribute = "${node.class}"
    value     = "app"
  }

  group "movies-api" {
    count = 1

    task "movies-api" {
      driver = "docker"
      config {
        image   = "crizstian/movies-service:v0.1"
        force_pull = true
        port_map {
          service_port = 3000
        }
      }

      env {
       DB="movies"
       DB_USER="cristian"
       DB_PASS="cristianPassword2017"
       PORT="3000"
       DB_SERVERS="mongodb1.query.consul:27017,mongodb2.query.consul:27017,mongodb3.query.consul:27017"
      }

      resources {
        network {
            mbits = 10
            port "service_port" {}
            port "aero" {}
        }
      }
      service {
        name = "movies-api"
        tags = [ "cinemas-microservice" ]
        port = "service_port"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }
  }

  group "cinema-catalog-api" {
    count = 1

    task "cinema-catalog-api" {
      driver = "docker"
      config {
        image   = "crizstian/cinema-catalog-service:v0.1"
        force_pull = true
        port_map {
          service_port = 3000
        }
      }

      env {
       DB="cinemas"
       DB_USER="cristian"
       DB_PASS="cristianPassword2017"
       PORT="3000"
       DB_SERVERS="mongodb1.query.consul:27017,mongodb2.query.consul:27017,mongodb3.query.consul:27017"
      }

      resources {
        network {
            mbits = 10
            port "service_port" {}
            port "aero" {}
        }
      }
      service {
        name = "cinema-catalog-api"
        tags = [ "cinemas-microservice" ]
        port = "service_port"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }
  }

  group "booking-api" {
    count = 1

    restart {
      attempts = 10
      interval = "5m"
      delay = "25s"
      mode = "delay"
    }

    # - app - #
    task "booking-api" {
      driver = "docker"


      config {
        image   = "crizstian/booking-service:v0.1"
        force_pull = true
        port_map {
          service_port = 3000
        }
      }

      env {
       DB="cinemas"
       DB_USER="cristian"
       DB_PASS="cristianPassword2017"
       PORT="3000"
       DB_SERVERS="mongodb1.query.consul:27017,mongodb2.query.consul:27017,mongodb3.query.consul:27017"
       NOTIFICATION_SERVICE="${NOMAD_ADDR_booking-proxy_notification}"
       PAYMENT_SERVICE="${NOMAD_ADDR_booking-proxy_payment}"
      }

      resources {
        network {
            mbits = 10
            port "service_port" {}
            port "aero" {}
        }
      }

      service {
        name = "booking-api"
        tags = [ "cinemas-microservice", "ENTRY" ]
        port = "service_port"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    } # - end app - #

    task "booking-proxy" {
      driver = "exec"

      config {
        command = "/usr/local/bin/run-proxy.sh"
        args    = ["${NOMAD_IP_proxy}", "${NOMAD_TASK_DIR}", "${NOMAD_META_source_target}"]
      }

      meta {
        source_target       = "booking-api"
        notification_target = "notification-api"
        payment_target      = "payment-api"
      }

      template {
        data = <<EOH
          {
              "name": "{{ env "NOMAD_META_source_target" }}-proxy",
              "port": {{ env "NOMAD_PORT_proxy" }},
              "kind": "connect-proxy",
              "proxy": {
                "destination_service_name": "{{ env "NOMAD_META_source_target" }}",
                "destination_service_id": "{{ env "NOMAD_META_source_target" }}",
                "upstreams": [
                  {
                    "destination_name": "{{ env "NOMAD_META_payment_target" }}",
                    "local_bind_address": "{{ env "NOMAD_IP_payment" }}",
                    "local_bind_port": {{ env "NOMAD_PORT_payment" }}
                  },
                  {
                    "destination_name": "{{ env "NOMAD_META_notification_target" }}",
                    "local_bind_address": "{{ env "NOMAD_IP_notification" }}",
                    "local_bind_port": {{ env "NOMAD_PORT_notification" }}
                  }
                ]
              }
          }
          EOH

        destination = "local/${NOMAD_META_source_target}-proxy.json"
      }

      resources {
        network {
          port "proxy" {}
          port "notification" {}
          port "payment" {}
        }
      }
    } # - end upstream proxy - #
  } # end booking group

  group "notification-api" {
    count = 1

    task "notificationapi" {
      driver = "docker"
      config {
        image   = "crizstian/notification-service:v0.1"
        force_pull = true
        port_map {
          serviceport = 3000
        }
      }

      env {
       EMAIL="cristiano.rosetti@gmail.com"
       EMAIL_PASS="Cris123@#"
       PORT="3000"
      }

      resources {
        network {
            mbits = 10
            port "serviceport" {}
            port "aero" {}
        }
      }
      service {
        name = "notification-api"
        tags = [ "cinemas-microservice" ]
        port = "serviceport"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

     # - notification-api- proxy - #
    task "notification-api-proxy" {
      driver = "exec"

      config {
        command = "/usr/local/bin/consul"
        args    = [
          "connect", "proxy",
          "-http-addr", "${NOMAD_IP_proxy}:8500",
          "-log-level", "trace",
          "-service", "notification-api",
          "-service-addr", "${NOMAD_ADDR_notificationapi_serviceport}",
          "-listen", ":${NOMAD_PORT_proxy}",
          "-register",
        ]
      }

      resources {
        network {
          port "proxy" {}
        }
      }
    } # - end notification-api-proxy - #
  }

  group "payment-api" {
    count = 1

    task "paymentapi" {
      driver = "docker"
      config {
        image   = "crizstian/payment-service:v0.1"
        force_pull = true
        port_map {
          serviceport = 3000
        }
      }

      env {
       DB="cinemas"
       DB_USER="cristian"
       DB_PASS="cristianPassword2017"
       PORT="3000"
       DB_SERVERS="mongodb1.query.consul:27017,mongodb2.query.consul:27017,mongodb3.query.consul:27017"
      }

      resources {
        network {
            mbits = 10
            port "serviceport" {}
            port "aero" {}
        }
      }
      service {
        name = "payment-api"
        tags = [ "cinemas-microservice" ]
        port = "serviceport"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

     # - payment-api- proxy - #
    task "payment-api-proxy" {
      driver = "exec"

      config {
        command = "/usr/local/bin/consul"
        args    = [
          "connect", "proxy",
          "-http-addr", "${NOMAD_IP_proxy}:8500",
          "-log-level", "trace",
          "-service", "payment-api",
          "-service-addr", "${NOMAD_ADDR_paymentapi_serviceport}",
          "-listen", ":${NOMAD_PORT_proxy}",
          "-register",
        ]
      }

      resources {
        network {
          port "proxy" {}
        }
      }
    } # - end payment-api-proxy - #
  }
}