/*
       --------------------------------------
    |                                        |
    |                                        v
    |                       Jane  ------(went to)-----
    |                         |                          |
    |                         | (loyal vistor)           |
    |                         v                          v
  Joe --(common user)--> Movie Name <--(displayed)-- Plaza Morelia
                             |                           |
                             |  (format)                 | (city)
                             v                           v
                            4DX                       Morelia

      city
        |
      cinema
        |
      movie
        |
    --- | ---------
  |                 |
visitor            format
  |                 |
--- | ----       ---  | ---
|         |     |     |    |
normal    loyal  4Dx   3D   normal

const nodes = {
movie: '',
visitor: '',
cinema: '',
city: '',
format: ''
}

const edges = {
wentTo: '',
displayed: '',
available: ''
}

*/
