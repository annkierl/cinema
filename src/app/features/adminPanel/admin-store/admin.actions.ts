import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie, Shows } from '../../home/showing/Showings/interfaces';

export const RepertoirActions = createActionGroup({
  source: 'Films',
  events: {
    getFilms: emptyProps(),
    updateFilms: props<{ films: Movie[] }>(),
    postMovie: props<{ movie: Movie }>(),
    addNewMovieState: emptyProps(),
  },
});

export const ShowActions = createActionGroup({
  source: 'Shows',
  events: {
    getShows: props<{ dayId: number; screenId: number }>(),
    updateShows: props<{ shows: Shows[] }>(),
    postShow: props<{ show: Shows }>(),
    addNewShowState: emptyProps(),
  },
});
