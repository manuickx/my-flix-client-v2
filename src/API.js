class API {
  static init() {
    // this.portIp = 3000;
    // this.baseUrl = "http://localhost:" + this.portIp;
    this.baseUrl = "https://myflixtwo.herokuapp.com/";
  }

  static createUser = user => {
    return fetch(this.baseUrl + "/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  };

  static login(credentials) {
    return fetch(this.baseUrl + "/auth/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    }).then(resp => resp.json());
  }

  static getCurrentUser(token) {
    return fetch(this.baseUrl + "/auth/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }

  static getUserMovies(token) {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }

  static addMovieToCollection = (movie, token) => {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        movie_ref_id: movie.id,
        title: movie.title ? movie.title : movie.name,
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        type: movie.title ? "movie" : "tv"
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

  static searchMovie = (searchTerm, searchType, page) => {
    return fetch(this.baseUrl + "/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: page,
        search_term: searchTerm,
        search_type: searchType
      })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getShowSeason = (showId, season) => {
    return fetch(this.baseUrl + "/show_season", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_id: showId, season: season })
    }).then(resp => resp.json());
  };

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

  static getActorImages = actorId => {
    return fetch(this.baseUrl + "/actor_images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actor_id: actorId })
    }).then(resp => resp.json());
  };

  static getItems(type, page) {
    return fetch(this.baseUrl + "/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, page: page })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  }

  static getOneItem = (type, itemId) => {
    return fetch(this.baseUrl + "/items/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: itemId, type: type })
    }).then(resp => resp.json());
  };

  static getTrailers = (type, itemId) => {
    return fetch(this.baseUrl + "/trailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getCredits = (type, itemId) => {
    return fetch(this.baseUrl + "/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.cast);
  };

  static getRecommendations = (type, itemId) => {
    return fetch(this.baseUrl + "/recommended", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };
}

API.init();

export default API;
