import { configureStore } from '@reduxjs/toolkit';
import spacexReducer from './spacexSlice';

// Store semplificato per l'app SpaceX
export const store = configureStore({
  reducer: {
    spacex: spacexReducer,
  },
}); 