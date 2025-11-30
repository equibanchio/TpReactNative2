# GestorUsuariosPrueba

Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Expo CLI opcional (puedes usar `npx expo` si no está instalado globalmente)

Instalación

1. Abrir una terminal y situarse en el directorio del proyecto:

2. Instalar dependencias:

npm install

npm install @reduxjs/toolkit react-redux

Ejecución:

npx expo start -c

o

npm start

Descripción breve

`GestorUsuariosPrueba` es una app Expo con React Native que consume la API pública de https://reqres.in para:

- Listar usuarios paginados (GET `https://reqres.in/api/users?page=1`).
- Crear usuarios de prueba (POST `https://reqres.in/api/users` con body `{ name, job }`).

Características principales:

- Pantalla principal (`src/screens/HomeScreen.js`) que integra el formulario y la lista.
- Listado de usuarios (`src/components/UserList.js`) mostrando nombre y email (si viene en la API). Muestra estados de carga y error.
- Formulario de creación (`src/components/UserForm.js`) con campos `Nombre` y `Job`, realiza POST y muestra alerta de éxito.
- Estado global `users` en Redux (`src/features/users/usersSlice.js`): contiene `items`, `status`, `error`, metadatos de paginación y usuarios creados localmente.
- Thunks: `fetchUsers` y `createUser` implementados en `usersSlice.js`.
- Paginación simple: botones Anterior / Siguiente que despachan `fetchUsers(page)`.
- Se incluyen usuarios creados localmente en la página donde se crearon para que permanezcan visibles al navegar entre páginas durante la sesión.

Notas

- Las llamadas a la API incluyen un header `x-api-key: reqres-free-v1` tal como se configuró en el proyecto.
- La persistencia local de usuarios creados es en memoria durante la sesión (no se guarda en disco).

Archivos clave

- `src/features/users/usersSlice.js` — thunks y estado global (GET/POST, manejo de errores, persistencia local por página).
- `src/components/UserList.js` — componente de presentación de la lista y paginador.
- `src/components/UserForm.js` — formulario de creación y llamada al thunk `createUser`.
- `src/screens/HomeScreen.js` — pantalla que integra los componentes y lanza `fetchUsers(1)` al iniciar.
- `src/store/store.js` — `configureStore` con el reducer `users`.
