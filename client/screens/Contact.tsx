import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import type { IContact as Contact } from "../../server/src/modules/contact/contact.model";

import type { RootStackParamList } from "./types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { API_URL } from "../consts";

type ContactProps = NativeStackScreenProps<RootStackParamList, "Contact">;

export default function Contact({ navigation, route }: ContactProps) {
  const id = route.params?.id;
  const [contact, setContact] = useState<Contact>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    entreprise: "",
    siteWeb: "",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getContact() {
      try {
        const res = await fetch(`${API_URL}/contacts/${id}`);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération du contact");
        }
        const data = await res.json();
        setContact(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    }
    getContact();
  }, [id]);

  const deleteContact = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la suppression du contact");
      }
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  return (
    <View style={styles.contactContainer}>
      <Text style={styles.contactTitle}>
        Informations de {contact.prenom + " " + contact.nom}
      </Text>
      <View style={styles.contactInfoContainer}>
        {contact.email && <Text>Adresse e-mail : {contact.email}</Text>}
        {contact.telephone && <Text>Téléphone : {contact.telephone}</Text>}
        {contact.adresse && <Text>Adresse : {contact.adresse}</Text>}
        {contact.entreprise && <Text>Entreprise : {contact.entreprise}</Text>}
        {contact.siteWeb && <Text>Site web : {contact.siteWeb}</Text>}
        {contact.note && <Text>Note : {contact.note}</Text>}
      </View>
      <Button
        color="red"
        title="Supprimer le contact"
        onPress={() => {
          Alert.alert(
            "Supprimer le contact",
            "Êtes-vous sûr de vouloir supprimer ce contact ?",
            [
              {
                text: "Annuler",
                style: "cancel",
              },
              {
                text: "Supprimer",
                onPress: deleteContact,
              },
            ]
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contactContainer: {
    flex: 1,
    paddingVertical: 50,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  contactInfoContainer: {
    flex: 1,
    paddingVertical: 50,
    gap: 10,
  },
});
