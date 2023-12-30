import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const StockPage = ({ route }) => {
  const { symbol } = route.params;
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        'https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_85f3a8219df849ab901a724fcc4d0046'
      );

      setStockData(response.data);
    } catch (error) {
      console.error('Error :', error);
      
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map(({ label, value }) => (
        <View style={styles.row} key={label}>
          <Text style={styles.label}>{label}:</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <LineChart
            data={{
              labels: stockData?.chart.map((point) => point.label) || [],
              datasets: [
                {
                  data: stockData?.chart.map((point) => point.close) || [],
                },
              ],
            }}
            width={300}
            height={200}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '1',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          {renderSection('Important Records', [
            { label: 'Company Name', value: stockData?.quote?.companyName },
            { label: 'Symbol', value: stockData?.quote?.symbol },
            { label: 'Latest Price', value: `$${stockData?.quote?.latestPrice}` },
            { label: 'Change', value: `${stockData?.quote?.change} (${stockData?.quote?.changePercent}%)` },
          ])}
          {renderSection('Other Details', [
            { label: 'Avg Total Volume', value: stockData?.quote?.avgTotalVolume },
            { label: 'Currency', value: stockData?.quote?.currency },
            { label: 'Day High', value: `$${stockData?.quote?.high}` },
            { label: 'Day Low', value: `$${stockData?.quote?.low}` },
            { label: 'PE Ratio', value: stockData?.quote?.peRatio },
            { label: '52 Week High', value: `$${stockData?.quote?.week52High}` },
            { label: '52 Week Low', value: `$${stockData?.quote?.week52Low}` },
          ])}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
  },
});

export default StockPage;
