import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./pages/Home";
import { Button, LogBox } from 'react-native';
import About from './pages/About';
import ContactoDeEmergencia from './pages/ContactoDeEmergencia';
import Tiempo from './pages/Tiempo';

LogBox.ignoreLogs(['Remote debugger']);

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ContactoDeEmergencia" component={ContactoDeEmergencia} />
        <Stack.Screen name="Tiempo" component={Tiempo} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
