const data = require('./someData');

module.exports = Object.freeze({
  getAllDirectors: () => data.directors.map((director) => ({ ...director, movies: data.movies.filter(movie => movie.directorId === director.id)})),
  getAllMovies: () => data.movies.map((movie) => ({ ...movie, director: data.directors.find(director => director.id === movie.directorId)})),
  getMovie: params => data.movies.find(movie => movie.id === params.id),
  getDirector: params => data.directors.find(director => director.id === params.id),
  addDirector: params => {
    data.directors.push({id: (data.directors.length + 1).toString(), name: params.director.name, age: params.director.age });
    return true;
  }
});