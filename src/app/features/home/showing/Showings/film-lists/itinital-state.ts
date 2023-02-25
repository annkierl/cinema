import { Film, Shows } from '../interfaces';
import { singleMovieProp } from './shows/shows.component';
export const initialFilms: Film = {
  id: 0,
  dateId: 0,
  movieId: 0,
  movie: {
    img: '',
    title: '',
    genre: '',
    length: '',
    ageRest: '',
    descriptionShort: '',
    descriptionLong: '',
    director: '',
    actors: [''],
    boxOff: '',
    premiere: true,

    addToFav: false,
  },
};
export const initialShows: Shows = {
  id: 0,
  hour: '',
  screenId: 0,
  screenLayout: [],
  reservedSeats: [],
  priceList: [],
  movieId: 0,
  dateId: 0,
  screen: {
    id: 0,
    name: '',
    rows: 10,
    colu: 10,
    specialSeats: [''],
  },
};

export const initialSingleMovieProp: singleMovieProp = {
  title: '',
  hour: '',
};
