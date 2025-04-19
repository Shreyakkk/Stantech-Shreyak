// src/screens/AddEditScreen.tsx
import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/itemsSlice';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const existingItem = (route.params as any)?.item;

  const [name, setName] = useState(existingItem?.name || '');
  const [description, setDescription] = useState(existingItem?.description || '');

  useLayoutEffect(() => {
    navigation.setOptions({ title: existingItem ? 'Edit Item' : 'Add Item' });
  }, []);

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Validation', 'All fields are required.');
      return;
    }

    if (existingItem) {
      dispatch(updateItem({ id: existingItem.id, name, description }));
    } else {
      dispatch(addItem({ name, description }));
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderBottomWidth: 1, marginBottom: 12 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderBottomWidth: 1, marginBottom: 12 }} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddEditScreen;
