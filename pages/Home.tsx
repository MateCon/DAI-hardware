import { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, Linking, Platform, View, Button } from "react-native";
import * as Contacts from "expo-contacts";
import * as React from 'react';
import { getData, storeData } from '../helpers/localstorage';
import { ShakeEventExpo } from '../helpers/shakeEvent';
import { useFocusEffect } from '@react-navigation/native';
import Strong from '../components/strong';

const Home = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [emergencyContact, setEmergencyContact] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const data = await getData("emergency_contact");
        setEmergencyContact(data || "");
      })()
    }, [])
  )

  useEffect(() => {
    ShakeEventExpo.addListener(() => {
      console.log("");
      const phoneNumbers = contacts.find(contact => contact.id === emergencyContact)?.phoneNumbers;
      const phoneNumber = phoneNumbers && phoneNumbers[0];
      if (!phoneNumber) return;
      const phoneWithCountryCode = "54 9 " + phoneNumber.number;
      Linking.openURL(`whatsapp://send?text=hola&phone=${Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode}`)
    })

    return () => {
      ShakeEventExpo.removeListener();
    }
  }, [])

  const keyExtractor = (item: any, idx: number) => {
    return item.id;
  };

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    return (
      <View>
        <Text>
          <Strong>{item.firstName} {item.lastName}</Strong> {item.phoneNumbers && item.phoneNumbers[0].number} {item.id === emergencyContact ? "🔴" : ""}
        </Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("ContactoDeEmergencia")} title={"Configurar contacto de emergencia"} />
      <Button onPress={() => navigation.navigate("Tiempo")} title={"Tiempo"} />
      <Button onPress={() => navigation.navigate("About")} title={"About"} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

