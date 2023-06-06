import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import type { IContact as Contact } from "../../server/src/modules/contact/contact.model";

import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

type ContactWithId = Contact & { _id: string };

import { API_URL } from "../consts";

export default function Home({ navigation }: HomeProps) {
  const [contacts, setContacts] = useState<ContactWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getAllContacts() {
      try {
        const res = await fetch(`${API_URL}/contacts`);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des contacts");
        }
        const data = await res.json();
        setContacts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    }
    getAllContacts();
  }, []);

  const addContact = async (contact: Contact) => {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de l'ajout du contact");
      }

      const data = await res.json();

      setContacts([...contacts, data]);

      navigation.navigate("Contact", { id: data._id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Contacts</Text>
      <Button onPress={() => setIsOpen(true)} title="Ajouter un contact" />
      {isError ? (
        <Text>Erreur lors de la récupération des contacts.</Text>
      ) : isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Contact", { id: item._id })}
            >
              <ContactCard id={item._id} contact={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            flexDirection: "column",
            gap: 10,
            alignItems: "stretch",
          }}
          numColumns={3}
        />
      )}
      <ContactModal
        isOpen={isOpen}
        addContact={addContact}
        closeModal={() => setIsOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingVertical: 30,
    alignItems: "center",
    gap: 10,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  contactName: {
    fontSize: 12,
    fontWeight: "500",
  },
});
