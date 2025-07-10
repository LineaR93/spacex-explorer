import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Azione asincrona per ottenere tutti i razzi
export const fetchRockets = createAsyncThunk(
  'spacex/fetchRockets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/rockets');
      if (!response.ok) throw new Error('Failed to fetch rockets');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Azione asincrona per ottenere tutti i lanci
export const fetchLaunches = createAsyncThunk(
  'spacex/fetchLaunches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches');
      if (!response.ok) throw new Error('Failed to fetch launches');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Stato iniziale semplificato
const initialState = {
  rockets: [],
  launches: [],
  loading: false,
  error: null,
  filters: {
    rocketType: 'all',
    launchStatus: 'all',
    year: 'all'
  }
};

// Slice semplificato per SpaceX
const spacexSlice = createSlice({
  name: 'spacex',
  initialState,
  reducers: {
    // Azione per impostare i filtri
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Azione per pulire l'errore
    clearError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Gestione del fetch dei razzi
      .addCase(fetchRockets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.loading = false;
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Gestione del fetch dei lanci
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.launches = action.payload;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Esporto le azioni
export const { setFilter, clearError } = spacexSlice.actions;

// Selettori semplici
export const selectRockets = (state) => state.spacex.rockets;
export const selectLaunches = (state) => state.spacex.launches;
export const selectLoading = (state) => state.spacex.loading;
export const selectError = (state) => state.spacex.error;
export const selectFilters = (state) => state.spacex.filters;

// Selettore memoizzato per i razzi filtrati
export const selectFilteredRockets = createSelector(
  [selectRockets, selectFilters],
  (rockets, filters) => {
    if (filters.rocketType === 'all') return rockets;
    
    return rockets.filter(rocket => 
      rocket.name.toLowerCase().includes(filters.rocketType.toLowerCase())
    );
  }
);

// Selettore memoizzato per i lanci filtrati
export const selectFilteredLaunches = createSelector(
  [selectLaunches, selectFilters],
  (launches, filters) => {
    let filtered = launches;

    // Filtro per stato del lancio
    if (filters.launchStatus !== 'all') {
      filtered = filtered.filter(launch => {
        if (filters.launchStatus === 'success') return launch.success === true;
        if (filters.launchStatus === 'failure') return launch.success === false;
        if (filters.launchStatus === 'upcoming') return launch.upcoming === true;
        return true;
      });
    }

    // Filtro per anno
    if (filters.year !== 'all') {
      filtered = filtered.filter(launch => {
        const launchYear = new Date(launch.date_utc).getFullYear();
        return launchYear.toString() === filters.year;
      });
    }

    // Creo una copia dell'array prima di ordinarlo per evitare errori di mutazione
    return [...filtered].sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc));
  }
);

export default spacexSlice.reducer; 