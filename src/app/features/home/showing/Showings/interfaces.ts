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
}
