import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

import type { IContact as Contact } from "../../server/src/modules/contact/contact.model";

import { API_URL } from "../consts";
import { useState } from "react";

type ContactModalProps = {
  isOpen: boolean;
  addContact: (contact: Contact) => void;
  closeModal: () => void;
};

const ContactModal = ({
  isOpen,
  addContact,
  closeModal,
}: ContactModalProps) => {
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

  return (
    <Modal visible={isOpen} animationType="fade">
      <View style={styles.modalContainer}></View>
      <Text style={styles.modalTitle}>Ajouter un contact</Text>
      <View style={styles.modalInfoContainer}>
        <TextInput
          placeholder="Prénom"
          style={styles.modalInput}
          value={contact.prenom}
          onChangeText={(text: string) =>
            setContact({ ...contact, prenom: text })
          }
        />
        <TextInput
          placeholder="Nom"
          style={styles.modalInput}
          value={contact.nom}
          onChangeText={(text: string) => setContact({ ...contact, nom: text })}
        />
        <TextInput
          placeholder="Email"
          style={styles.modalInput}
          value={contact.email}
          onChangeText={(text: string) =>
            setContact({ ...contact, email: text })
          }
        />
        <TextInput
          placeholder="Téléphone"
          keyboardType="phone-pad"
          style={styles.modalInput}
          value={contact.telephone}
          onChangeText={(text: string) =>
            setContact({ ...contact, telephone: text })
          }
        />
        <TextInput
          placeholder="Adresse"
          style={styles.modalInput}
          value={contact.adresse}
          onChangeText={(text: string) =>
            setContact({ ...contact, adresse: text })
          }
        />
        <TextInput
          placeholder="Entreprise"
          style={styles.modalInput}
          value={contact.entreprise}
          onChangeText={(text: string) =>
            setContact({ ...contact, entreprise: text })
          }
        />
        <TextInput
          placeholder="Site web"
          style={styles.modalInput}
          value={contact.siteWeb}
          onChangeText={(text: string) =>
            setContact({ ...contact, siteWeb: text })
          }
        />
        <TextInput
          placeholder="Note"
          style={styles.modalInput}
          value={contact.note}
          onChangeText={(text: string) =>
            setContact({ ...contact, note: text })
          }
        />
      </View>
      <View style={styles.modalButtonsContainer}>
        <Button
          color="green"
          onPress={() => {
            addContact(contact);
            closeModal();
          }}
          title="Ajouter"
        />
        <Button color="red" onPress={closeModal} title="Annuler" />
      </View>
    </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  modalInfoContainer: {
    paddingHorizontal: 50,
  },
  modalInput: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  modalButtonsContainer: {
    paddingHorizontal: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
