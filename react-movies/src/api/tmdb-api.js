// export const getMovies = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=true&include_video=true&page=${page}`
//     );
//     if (!response.ok) {
//       throw new Error(await response.json().message);
//     }
//     const movieData = await response.json();

//     for (const movie of movieData.results) {
//       try {
//         const movieDetails = await getMovie({ queryKey: ["movie", { id: movie.id }] });
//         movie.certification = movieDetails.certification || "Not Rated"; //appends certification to each movie in movieData
//       } catch (error) {
//         movie.certification = "Error"; //troubleshooting
//       }
//     }

//     return movieData;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUpcomingMovies = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=truee&include_video=true&page=${page}&region=US`
//     );
//     if (!response.ok) {
//       throw new Error(await response.json().message);
//     }
//     const movieData = await response.json();

//     for (const movie of movieData.results) {
//       try {
//         const movieDetails = await getMovie({ queryKey: ["movie", { id: movie.id }] });
//         movie.certification = movieDetails.certification || "Not Rated"; //appends certification to each movie in movieData
//       } catch (error) {
//         movie.certification = "Error"; //troubleshooting
//       }
//     }

//     return movieData;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getNowPlayingMovies = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=true&include_video=true&page=${page}&region=US`
//     );
//     if (!response.ok) {
//       throw new Error(await response.json().message);
//     }
//     const movieData = await response.json();

//     for (const movie of movieData.results) {
//       try {
//         const movieDetails = await getMovie({ queryKey: ["movie", { id: movie.id }] });
//         movie.certification = movieDetails.certification || "Not Rated"; //appends certification to each movie in movieData
//       } catch (error) {
//         movie.certification = "Error"; //troubleshooting
//       }
//     }

//     return movieData;
//   } catch (error) {
//     throw error;
//   }
// };
// export const getTopRatedMovies = async (page = 1) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=true&include_video=true&page=${page}`
//     );
//     if (!response.ok) {
//       throw new Error(await response.json().message);
//     }
//     const movieData = await response.json();

//     for (const movie of movieData.results) {
//       try {
//         const movieDetails = await getMovie({ queryKey: ["movie", { id: movie.id }] });
//         movie.certification = movieDetails.certification || "Not Rated"; //appends certification to each movie in movieData
//       } catch (error) {
//         movie.certification = "Error"; //troubleshooting
//       }
//     }

//     return movieData;
//   } catch (error) {
//     throw error;
//   }
// };
  
// export const getMovie = (args) => {
//   const [, idPart] = args.queryKey;
//   const { id } = idPart;

//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=release_dates`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.json().message);
//       }
//       return response.json();
//     })
//     .then((movieData) => {
//       const releaseDates = movieData.release_dates?.results || []; //extract certification data from release_dates

//       const ieCertification = releaseDates.find(
//         (result) => result.iso_3166_1 === "IE"
//       );
  
//       const theatricalRelease = ieCertification //find the release type for cinemas
//         ? ieCertification.release_dates.find((date) => date.type === 3)
//         : null;
//           const certification = theatricalRelease ? theatricalRelease.certification : "Not Rated";
      
//       return { //appends certification to movieData
//         ...movieData,
//         certification,
//       };
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// export const getGenres = async () => {
//   return fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
//       process.env.REACT_APP_TMDB_KEY +
//       "&language=en-US"
//   ).then( (response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     throw error
//   });
// };

// export const getMovieImages = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then( (response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//   .catch((error) => {
//     throw error
//   });
// };

// export const getMovieReviews = (id) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   )
//     .then((res) => res.json())
//     .then((json) => {
//       // console.log(json.results);
//       return json.results;
//     });
// };

// export const getActors = (page = 1) => {
//   return fetch(
//     `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}` 
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     throw error;
//   });
// };

// export const getActor = (args) => {
//   const [, idPart] = args.queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//       throw error
//   });
// };

// export const getActorImages = ({ queryKey }) => {
//   const [, idPart] = queryKey;
//   const { id } = idPart;
//   return fetch(
//     `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
//   ).then( (response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();

//   })
//   .catch((error) => {
//     throw error
//   });
// };

// //https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
// export const getActorRoles = async (id) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
//     )
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
    
//     const movieData = await response.json()
//     const cast = movieData.cast; //extract only the cast array
//     console.log(cast)

//     for (const movie of cast) {
//       try {
//         const movieDetails = await getMovie({ queryKey: ["movie", { id: movie.id }] });
//         movie.certification = movieDetails.certification || "Not Rated"; //appends certification to each movie in movieData
//       } catch (error) {
//         movie.certification = "Error"; //troubleshooting
//       }
//     }
  
//     return cast;
//     } catch(error) {
//       throw error;
//     };
// };

// export const getMovieCast = (id) => {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     })
//     .then((data) => data.cast) // Extract only the cast array
//     .catch((error) => {
//       throw error;
//     });
// };


// export const getCertifications = async () => {
//   return fetch(
//     "https://api.themoviedb.org/3/certification/movie/list?api_key=" +
//       process.env.REACT_APP_TMDB_KEY +
//       "&language=en-US"
//   ).then( (response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     throw error
//   });
// };

export const getMovies = async () => {
  // const [, idPart] = args.queryKey;
  // const { page } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )

  console.log('Raw Response:', response);
  
  return response.json();
};

export const getUpcomingMovies = async (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/upcoming?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
}

export const getNowPlayingMovies = async (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/nowplaying?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
}

export const getTopRatedMovies = async (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/toprated?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
}

export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
}

export const getGenres = async (args) => {
  const response = await fetch(
    'http://localhost:8080/api/genres', {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
}

export const getMovieImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/images` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getMovieReviews = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/reviews` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getActors = async (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/actors?page=${page}` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getActor = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/actors/${id}` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getActorImages = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/actors/${id}/images` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getActorRoles = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/actors/${id}/roles` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getMovieCast = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/cast` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const getMovieCertifications = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/certifications` ,{
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
    }
  )
  return response.json();
}

export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};