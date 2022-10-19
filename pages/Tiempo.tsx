import { StyleSheet, Text, View } from "react-native";
import * as React from 'react';
import * as Location from 'expo-location';
import axios from "axios";

const apiKey = ""

const Tiempo = () => {
  const [weather, setWeather] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const data = await Location.getCurrentPositionAsync({});
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${apiKey}&units=metric`)
      setWeather(res.data);
    })();
  }, []);

  return (
    <View>
      <Text>{new Date().toLocaleString()}</Text>
      <Text>Latitud: {weather?.lat}</Text>
      <Text>Longitud: {weather?.lon}</Text>
      <Text>Temperatura: {weather?.current.temp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Tiempo;
