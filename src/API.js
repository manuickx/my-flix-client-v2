class API {
  static init() {
    // use this lines if you want to use a local server:
    // this.portIp = 3000;
    // this.baseUrl = "http://localhost:" + this.portIp;

    // use this line if you want to use the online server
    this.baseUrl = "https://myflixxdb-api.herokuapp.com/";
  }

  // USER FUNCTIONS * CREATE * LOGIN * GET USER * GET USER COLLECTION

  static createUser = user => {
    return fetch(this.baseUrl + "/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  };

  static login = credentials => {
    return fetch(this.baseUrl + "/auth/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    }).then(resp => resp.json());
  };

  static getCurrentUser = token => {
    return fetch(this.baseUrl + "/auth/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  };

  static getUserMovies = token => {
    return fetch(this.baseUrl + "/user_favourites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  };

  // COLLECTION FUNCTIONS * ADD TO COLLECTION * REMOVE FROM COLLECTION - (WORK FOR MOVIES AND TV SHOWS)

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

  // SEARCH FUNCTION - (WORK FOR MOVIES AND TV SHOWS)

  static searchMovie = (searchTerm, searchType, page, adult) => {
    return fetch(this.baseUrl + "/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: page,
        search_term: searchTerm,
        search_type: searchType,
        adult: adult
      })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  // GET SHOW SEASONS FUNCTION

  static getShowSeason = (showId, season) => {
    return fetch(this.baseUrl + "/show_season", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_id: showId, season: season })
    }).then(resp => resp.json());
  };

  // ACTOR FUNCTIONS * DETAILS * MOVIES * TV SHOWS * IMAGES

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

  static getActorShows = actorId => {
    return fetch(this.baseUrl + "/actor_shows", {
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

  // ITEMS (MOVIES AND TV SHOWS) FUNCTIONS * GET ITEMS * GET ONE ITEM * GET TRAILERS * GET CAST * GET RECOMMENDATIONS

  static getItems = (type, page) => {
    return fetch(this.baseUrl + "/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, page: page })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getOneItem = (type, itemId) => {
    return fetch(this.baseUrl + "/items/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: itemId, type: type })
    })
      .then(resp => resp.json())
      .catch(error => error);
  };

  static getTrailers = (type, itemId) => {
    return fetch(this.baseUrl + "/trailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.results)
      .catch(error => error);
  };

  static getCredits = (type, itemId) => {
    return fetch(this.baseUrl + "/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.cast)
      .catch(error => error);
  };

  static getRecommendations = (type, itemId) => {
    return fetch(this.baseUrl + "/recommended", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, item_id: itemId })
    })
      .then(resp => resp.json())
      .then(json => json.results)
      .catch(error => error);
  };
}

API.init();

export default API;
