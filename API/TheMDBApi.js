const API_KEY = 'df9ebd4583f506c88575e69e7d0beba9';

// get film according to text and page from API
export function getFilmsFromApi(text, page){
    const url =  'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=fr&query=' + text + "&page=" + page;
     return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
// Get image according to name
export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300'+ name;
}

// Get film according to id
export function getFilmFromApi(id) {
    return fetch( 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_KEY + '&language=fr' )
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
