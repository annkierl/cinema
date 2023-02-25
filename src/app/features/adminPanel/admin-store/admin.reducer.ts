import { createReducer, on } from '@ngrx/store';
import { RepertoirActions, ShowActions } from './admin.actions';

const initialState = {
  films: [],
  shows: [],
};

export const Repertoir = createReducer(
  initialState.films,
  on(RepertoirActions.updatefilms, (state, films) => ({
    ...state,
    films,
  })),
  on(ShowActions.updateshows, (state, shows) => ({
    ...state,
    shows,
  }))
);

// export const ShowsReducer = createReducer(
//   initialState.shows,
//   on(ShowActions.updateshows, (state, shows) => ({
//     ...state,
//     shows,
//   }))
// );
