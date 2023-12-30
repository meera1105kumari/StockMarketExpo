import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
import LoginPage from './components/LoginPage';
import SignupScreen from './components/SignupScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoard from './components/DashBoard';

import StockPage from './components/StockPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          
          <Stack.Screen name="Dashboard" component={DashBoard} />
          <Stack.Screen name="StockDetail" component={StockPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MostActive" component={DashBoard} />
      
      
    </Tab.Navigator>
  );
};


export default App;


