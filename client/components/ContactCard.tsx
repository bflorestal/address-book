import { Image, Text, StyleSheet, View } from "react-native";

import type { IContact as Contact } from "../../server/src/modules/contact/contact.model";

type ContactWithId = Contact & { _id: string };

type ContactCardProps = {
  id: string;
  contact: ContactWithId;
};

export default function ContactCard({ id, contact }: ContactCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/default-user-image.png")}
        alt={contact.prenom + " " + contact.nom}
        style={styles.image}
      />
      <Text style={styles.name}>
        {contact.prenom} {contact.nom}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 35,
    height: 75,
    aspectRatio: 1,
  },
  name: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
});
