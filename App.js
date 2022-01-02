import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Login from './screens/Login'
import Signup from './screens/Signup'
import HomeScreen from './screens/HomeScreen';
import ProductSearch from './screens/ProductSearch';
import ProductDetails from './screens/ProductDetails'
import Cart from './screens/Cart'
import DeliveryPage from './screens/DeliveryPage'
import Message from './screens/Message'

import {StatusBar} from 'react-native';


const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <Stack.Navigator screenOptions={{header: () => null}}>
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProductSearch" component={ProductSearch} />
         <Stack.Screen name="ProductDetails" component={ProductDetails} />
         <Stack.Screen name="Cart" component={Cart} />
         <Stack.Screen name="DeliveryPage" component={DeliveryPage} />
          <Stack.Screen name="Message" component={Message} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;