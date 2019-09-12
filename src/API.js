class API {
  static init() {
    this.portIp = 3000;
    this.baseUrl = "http://localhost:" + this.portIp;
  }

  // LOGIN
  static login(credentials) {
    return fetch(this.baseUrl + "/auth/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    }).then(resp => resp.json());
  }

  // LOGIN - GET CURRENT USER
  static getCurrentUser(token) {
    return fetch(this.baseUrl + "/auth/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }

  // GET USER FAVOURITES

  static getUserMovies(token) {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }
  //

  // ADD AND REMOVE FAVOURITE MOVIE

  static addMovieToCollection = (movie, token) => {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        movie_ref_id: movie.id
      })
    }).then(resp => resp.json());
  };

  static removeMovieFromCollection = (movie, token) => {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ movie_id: movie.id })
    }).then(resp => resp.json());
  };

  // CREATE USER
  static createUser = user => {
    return fetch(this.baseUrl + "/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  };

  // GET MOVIES AND MOVIE INFO FROM API

  static getMovies(page) {
    return fetch(this.baseUrl + "/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  }

  static getOneMovie = movieId => {
    return fetch(this.baseUrl + "/movies/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    }).then(resp => resp.json());
  };

  static searchMovie = searchTerm => {
    return fetch(this.baseUrl + "/movies/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: 1,
        search_term: searchTerm
      })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getMovieCredits = movieId => {
    return fetch(this.baseUrl + "/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    })
      .then(resp => resp.json())
      .then(json => json.cast);
  };

  static getMovieTrailers = movieId => {
    return fetch(this.baseUrl + "/trailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getMovieRecommendations = movieId => {
    return fetch(this.baseUrl + "/recommended", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  // GET SHOWS AND TV SHOW INFO FROM API

  static getShows(page) {
    return fetch(this.baseUrl + "/shows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  }

  static getOneShow = showId => {
    return fetch(this.baseUrl + "/shows/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_id: showId })
    }).then(resp => resp.json());
  };

  static getShowTrailers = showId => {
    return fetch(this.baseUrl + "/show_trailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_id: showId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  // GET ACTOR INFO FROM API

  static getActorDetails = actorId => {
    return fetch(this.baseUrl + "/actors/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor_id: actorId })
    }).then(resp => resp.json());
  };

  static getActorMovies = actorId => {
    return fetch(this.baseUrl + "/actor_movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor_id: actorId })
    }).then(resp => resp.json());
  };
}

API.init();

export default API;
