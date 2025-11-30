// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

// Pantalla principal
// - Carga inicial: dispatch(fetchUsers(1))
// - Integra `UserForm` y `UserList`, maneja paginación

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { items, status, error, page, totalPages, total } = useSelector((s) => s.users);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handlePageChange = (p) => {
    dispatch(fetchUsers(p));
  };

  return (
    <View style={styles.container}>
      <UserForm />
      <UserList users={items} loading={status === 'loading'} error={error} page={page} totalPages={totalPages} total={total} onPageChange={handlePageChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
});
