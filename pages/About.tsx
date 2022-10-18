import { StyleSheet, Image } from "react-native";
import * as React from 'react';

const Home = () => {
  return (
    <Image source={require('../assets/qrcode.png')} />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Home;

