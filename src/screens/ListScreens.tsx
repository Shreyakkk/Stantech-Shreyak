// src/screens/ListScreen.tsx
import React, { useEffect } from 'react';
import { View, FlatList, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard';
import { fetchItems, deleteItem } from '../redux/itemsSlice';

const ListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.items.data);

  useEffect(() => {
    console.log("items",items)
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    Alert.alert('Delete Item', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => dispatch(deleteItem(id)),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Add New Item" onPress={() => navigation.navigate('AddEdit')} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard item={item} onEdit={() => navigation.navigate('AddEdit', { item })} onDelete={() => handleDelete(item.id)} />
        )}
      />
    </View>
  );
};

export default ListScreen;
