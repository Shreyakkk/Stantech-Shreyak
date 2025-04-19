import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ItemCard = ({ item, onEdit, onDelete }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <Text>{item.description}</Text>
    <View style={styles.actions}>
      <Button title="Edit" onPress={onEdit} />
      <Button title="Delete" onPress={onDelete} color="red" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default ItemCard;