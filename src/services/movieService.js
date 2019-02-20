import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  const body = { ...movie };
  body.genreId = body.genreId.replace(/a/g, "b");
  return http.post(apiEndpoint, body);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
