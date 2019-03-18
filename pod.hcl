job "cinemas-microservice" {

  datacenters = ["aero-cluster"]
  type = "service"


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
       DB_SERVERS="mongodb1.service.consul:27017,mongodb2.service.consul:27017,mongodb3.service.consul:27017"
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
       DB_SERVERS="mongodb1.service.consul:27017,mongodb2.service.consul:27017,mongodb3.service.consul:27017"
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
       DB_SERVERS="mongodb1.service.consul:27017,mongodb2.service.consul:27017,mongodb3.service.consul:27017"
       NOTIFICATION_SERVICE="notification-api.service.consul:13000"
      //  NOTIFICATION_SERVICE="${NOMAD_ADDR_booking-proxy_notification}"
       PAYMENT_SERVICE="payment-api.service.consul:14000"
      //  PAYMENT_SERVICE="${NOMAD_ADDR_booking-proxy_payment}"
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

    // task "booking-proxy" {
    //   driver = "exec"

    //   config {
    //     command = "/usr/local/bin/run-proxy.sh"
    //     args    = ["${NOMAD_IP_proxy}", "${NOMAD_TASK_DIR}", "${NOMAD_META_source_proxy_name}"]
    //   }

    //   meta {
    //     source_proxy_name   = "booking-api"
    //     notification_target = "notification-api"
    //     payment_target      = "payment-api"
    //   }

    //   template {
    //     data = <<EOH
    //       {
    //           "name": "{{ env "NOMAD_META_source_proxy_name" }}-proxy",
    //           "port": {{ env "NOMAD_PORT_proxy" }},
    //           "kind": "connect-proxy",
    //           "proxy": {
    //             "destination_service_name": "{{ env "NOMAD_META_source_proxy_name" }}",
    //             "destination_service_id": "{{ env "NOMAD_META_source_proxy_name" }}",
    //             "upstreams": [
    //               {
    //                 "destination_name": "{{ env "NOMAD_META_payment_target" }}",
    //                 "local_bind_address": "{{ env "NOMAD_IP_payment" }}",
    //                 "local_bind_port": {{ env "NOMAD_PORT_payment" }}
    //               },
    //               {
    //                 "destination_name": "{{ env "NOMAD_META_notification_target" }}",
    //                 "local_bind_address": "{{ env "NOMAD_IP_notification" }}",
    //                 "local_bind_port": {{ env "NOMAD_PORT_notification" }}
    //               }
    //             ]
    //           }
    //       }
    //       EOH

    //     destination = "local/${NOMAD_META_source_proxy_name}-proxy.json"
    //   }

    //   resources {
    //     network {
    //       port "proxy" {}
    //       port "notification" {}
    //       port "payment" {}
    //     }
    //   }
    // } # - end upstream proxy - #
  } # end booking group

  group "notification-api" {
    count = 1

    task "notification-api" {
      driver = "docker"
      config {
        image   = "crizstian/notification-service:v0.1"
        force_pull = true
        port_map {
          service_port = 3000
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
            port "service_port" {static=13000}
            port "aero" {}
        }
      }
      service {
        name = "notification-api"
        tags = [ "cinemas-microservice" ]
        port = "service_port"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

    //  # - notification-api- proxy - #
    // task "notification-api-proxy" {
    //   driver = "exec"

    //   config {
    //     command = "/usr/local/bin/consul"
    //     args    = [
    //       "connect", "proxy",
    //       "-http-addr", "${NOMAD_IP_proxy}:8500",
    //       "-log-level", "trace",
    //       "-service", "notification-api",
    //       "-service-addr", "${NOMAD_ADDR_notification-api_service_port}",
    //       "-listen", ":${NOMAD_PORT_proxy}",
    //       "-register",
    //     ]
    //   }

    //   resources {
    //     network {
    //       port "proxy" {}
    //     }
    //   }
    // } # - end notification-api-proxy - #
  }

  group "payment-api" {
    count = 1

    task "payment-api" {
      driver = "docker"
      config {
        image   = "crizstian/payment-service:v0.1"
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
       DB_SERVERS="mongodb1.service.consul:27017,mongodb2.service.consul:27017,mongodb3.service.consul:27017"
      }

      resources {
        network {
            mbits = 10
            port "service_port" {static=14000}
            port "aero" {}
        }
      }
      service {
        name = "payment-api"
        tags = [ "cinemas-microservice" ]
        port = "service_port"
        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

    //  # - payment-api- proxy - #
    // task "payment-api-proxy" {
    //   driver = "exec"

    //   config {
    //     command = "/usr/local/bin/consul"
    //     args    = [
    //       "connect", "proxy",
    //       "-http-addr", "${NOMAD_IP_proxy}:8500",
    //       "-log-level", "trace",
    //       "-service", "payment-api",
    //       "-service-addr", "${NOMAD_ADDR_payment-api_service_port}",
    //       "-listen", ":${NOMAD_PORT_proxy}",
    //       "-register",
    //     ]
    //   }

    //   resources {
    //     network {
    //       port "proxy" {}
    //     }
    //   }
    // } # - end payment-api-proxy - #
  }
}