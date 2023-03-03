export interface date {
  id: string;
}
export interface Film {
  id: number;
  movieId: number;
  dateId: number;
  movie: {
    img: string;
    genre: string;
    title: string;
    length: string;
    descriptionShort: string;
    descriptionLong: string;
    ageRest: string;
    director: string;
    actors: string[];
    boxOff: string;
    premiere: boolean;
    addToFav: boolean;
    canBeJudged: boolean;
  };
}
export interface Price {
  type: string;
  price: string;
}
export interface Shows {
  id: number;
  hour: string;
  screenId: number;
  reservedSeats: number[][];
  priceList: Price[];
  movieId: number;
  dateId: number;
  screen: Screen;
  screenLayout: number[][];
}

export interface Screen {
  id: number;
  name: string;
  rows: number;
  colu: number;
  specialSeats: string[];
}

export interface Score {
  id: number;
  score: number[];
}

export interface Movie {
  id: number;
  img: string;
  genre: string;
  title: string;
  length: string;
  descriptionShort: string;
  descriptionLong: string;
  ageRest: string;
  director: string;
  actors: string[];
  boxOff: string;
  premiere: boolean;
  addToFav: boolean;
  canBeJudged: true;
}

export interface ShowWithMovie {
  id: number;
  hour: string;
  screenId: number;
  reservedSeats: number[][];
  priceList: Price[];
  movieId: number;
  dateId: number;
  screen: Screen;
  screenLayout: number[][];
  movie: {
    id: number;
    img: string;
    genre: string;
    title: string;
    length: string;
    descriptionShort: string;
    descriptionLong: string;
    ageRest: string;
    director: string;
    actors: string[];
    boxOff: string;
    premiere: boolean;
    addToFav: boolean;
    canBeJudged: true;
  };
}

export const initialShowWithMovie: ShowWithMovie = {
  id: 0,
  hour: '',
  screenId: 0,
  reservedSeats: [],
  priceList: [],
  movieId: 0,
  dateId: 0,
  screen: {
    id: 0,
    name: '',
    rows: 0,
    colu: 0,
    specialSeats: [],
  },
  screenLayout: [],
  movie: {
    id: 0,
    img: '',
    genre: '',
    title: '',
    length: '',
    descriptionShort: '',
    descriptionLong: '',
    ageRest: '',
    director: '',
    actors: [],
    boxOff: '',
    premiere: false,
    addToFav: false,
    canBeJudged: true,
  },
};
