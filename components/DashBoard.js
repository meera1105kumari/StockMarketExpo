import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setErrorMessage } from '../redux/authActions';

const DashBoard = ({ navigation }) => {
  const stockDispatch = useDispatch();
  const stockSelector = useSelector((state) => state.auth);
  const [activeStocks, setActiveStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_85f3a8219df849ab901a724fcc4d0046'
      );

      setActiveStocks(response.data);
    } catch (error) {
      stockDispatch(setErrorMessage('Error fetching stock data.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockPress = (symbol) => {
    // Navigate to the detailed page for the selected stock
    navigation.navigate('StockDetail', { symbol });
  };

  const renderStockCard = ({ item }) => (
    <TouchableOpacity style={styles.stockCard} onPress={() => handleStockPress(item.symbol)}>
      <Text style={styles.stockName}>{`${item.companyName} ${item.symbol}`}</Text>
      <Text style={styles.latestPrice}>{`Latest Price: $${item.latestPrice}`}</Text>
      <Text style={styles.changePrice}>{`Change: ${item.change} (${item.changePercent}%)`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Active Stocks</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={activeStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={renderStockCard}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  stockCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // for Android 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  latestPrice: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
  changePrice: {
    fontSize: 16,
    color: 'green', // or use red for negative change
    marginTop: 4,
  },
});

export default DashBoard;
