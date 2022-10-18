import { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, Linking, Platform, View, Button } from "react-native";
import * as Contacts from "expo-contacts";
import * as React from 'react';
import { getData, storeData } from '../components/localstorage';
import { ShakeEventExpo } from '../helpers/shakeEvent';

const ContactoDeEmergencia = ({ navigation }: any) => {
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

    (async () => {
      const data = await getData("emergency_contact");
      setEmergencyContact(data || "");
    })
  }, []);

  const keyExtractor = (item: any, idx: number) => {
    return item.id;
  };

  const renderItem = ({ item: { id, name } }: any) => {
    return (
      <View>
        <Text
          onPress={() => {
            setEmergencyContact(id);
            storeData("emergency_contact", id);
          }}
        >
          {name}{id === emergencyContact ? " EMERGENCY CONTACT" : ""}
        </Text>
      </View>
    )
  };

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default ContactoDeEmergencia;

