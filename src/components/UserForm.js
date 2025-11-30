// src/components/UserForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/users/usersSlice';

// Componente `UserForm` (Formulario de creación)
// - Campos: Nombre, Job
// - Al enviar: despacha `createUser` (POST) y muestra alerta de éxito

export default function UserForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);
  const page = useSelector((s) => s.users.page);

  const handleSubmit = async () => {
    if (!name.trim() || !job.trim()) {
      Alert.alert('Campos incompletos', 'Completá nombre y job antes de enviar.');
      return;
    }

    try {
      setLoading(true);
      const result = await dispatch(createUser({ name, job, page })).unwrap();
      Alert.alert('Usuario creado exitosamente');
      setName('');
      setJob('');
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear usuario</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Job" value={job} onChangeText={setJob} />
      <Button title={loading ? 'Enviando...' : 'Crear usuario'} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 8 },
});
