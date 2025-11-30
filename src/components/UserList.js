// src/components/UserList.js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';

// Componente `UserList`
// - Muestra la lista de usuarios (nombre, email si aplica)
// - Muestra estados de carga y error
// - Paginador simple (Anterior / Siguiente)
export default function UserList({ users = [], loading, error, page = 1, totalPages = 1, total, onPageChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
      {loading && <Text>Cargando usuarios...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}


      <Text style={styles.summary}>{`Mostrando ${users.length} Usuarios`}</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => (item.id ? String(item.id) : Math.random().toString())}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.avatar ? <Image source={{ uri: item.avatar }} style={styles.avatar} /> : null}
            <View style={styles.itemText}>
              <Text style={styles.name}>{item.first_name ? `${item.first_name} ${item.last_name}` : item.name}</Text>
              {item.email ? <Text style={styles.email}>{item.email}</Text> : null}
              {item.job ? <Text style={styles.job}>{item.job}</Text> : null}
            </View>
          </View>
        )}
        ListEmptyComponent={!loading && <Text>No hay usuarios.</Text>}
      />


      <View style={styles.pager}>
        <Button title="Anterior" onPress={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} />
        <Text style={styles.pageInfo}>{`Página ${page} / ${totalPages}`}</Text>
        <Button title="Siguiente" onPress={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  summary: { marginBottom: 8, color: '#333' },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 8 },
  itemText: { flex: 1 },
  name: { fontWeight: '600' },
  email: { color: '#666' },
  job: { color: '#444', fontStyle: 'italic' },
  pager: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  pageInfo: { marginHorizontal: 8 },
  error: { color: 'red', marginBottom: 8 },
});
