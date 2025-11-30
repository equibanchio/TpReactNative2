// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Gestor de Usuarios de Prueba:
// - GET /api/users?page= -> listado paginado (thunk: fetchUsers)
// - POST /api/users -> crear usuario (thunk: createUser)
// - Estado global `users` con items, status, error, paginación y users creados localmente
const initialState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  perPage: 0,
  total: 0,
  created: [],
};

// Thunk para obtener usuarios (paginación simple)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
      method: 'GET',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Error al obtener usuarios');
    const data = await res.json();
    return data;
  }
);

// Thunk para crear usuario
export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ name, job, page } = {}) => {
    const res = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': 'reqres-free-v1' },
      body: JSON.stringify({ name, job }),
    });
    if (!res.ok) throw new Error('Error al crear usuario');
    const data = await res.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // acciones síncronas simples
    addLocalUser(state, action) {
      state.items.unshift(action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // la API devuelve { data, page, total_pages, per_page, total, support }
        state.items = action.payload.data || [];
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.total_pages || 1;
        state.perPage = action.payload.per_page || 0;
        state.total = action.payload.total || 0;
        const localForPage = state.created.filter((u) => u._page === state.page);
        if (localForPage.length) {
          state.items = [...localForPage, ...state.items];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'No se pudieron cargar los usuarios. Verificá tu conexión e intentá de nuevo.';
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // action.payload contiene { id, name, job, createdAt }
        const created = action.payload;
        const arg = action.meta?.arg || {};
        const pageForUser = arg.page || state.page || 1;
        // Mapeo a objeto usuario para mostrarlo en la lista y marcarlo como local
        const userObj = {
          id: created.id,
          name: created.name || created.id,
          email: created.email || '',
          job: created.job || '',
          _local: true,
          _page: pageForUser,
        };
        // Guardar en `created` para que persista durante la sesión al navegar
        state.created.unshift(userObj);
        // Si se creó en la página actual, mostrarlo de inmediato
        if (state.page === pageForUser) {
          state.items.unshift(userObj);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'No se pudo crear el usuario. Intentá nuevamente más tarde.';
      });
  },
});

export const { addLocalUser, clearError } = usersSlice.actions;

export default usersSlice.reducer;
