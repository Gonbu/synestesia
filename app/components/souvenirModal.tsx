import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import ColorPicker from "react-native-wheel-color-picker";
import { captureImage, uploadImage } from "./imageManager";
import { Souvenir, saveSouvenir, updateSouvenir } from "./souvenirManager";
import { styles } from "../styles";
import MusicManager from "./musicManager";

interface SouvenirModalProps {
  isVisible: boolean;
  onClose: () => void;
  clickedLocation: { latitude: number; longitude: number } | null;
  color: string;
  setColor: (color: string) => void;
  memoryNote: string;
  setMemoryNote: (note: string) => void;
  spotifyTrackId?: string;
  setSpotifyTrackId?: (trackId: string) => void;
  onSouvenirCreated?: () => void;
}

const SouvenirModal: React.FC<SouvenirModalProps> = ({
  isVisible,
  onClose,
  clickedLocation,
  color,
  setColor,
  memoryNote,
  setMemoryNote,
  spotifyTrackId,
  setSpotifyTrackId,
  onSouvenirCreated,
}) => {
  const [title, setTitle] = useState("");

  const handlePhotoButtonPress = async () => {
    if (!clickedLocation) {
      alert("No location selected!");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title for your souvenir!");
      return;
    }

    try {
      const result = await captureImage();
      if (!result) {
        alert("Error during capture.");
        return;
      }

      const newSouvenir = new Souvenir(
        clickedLocation.longitude,
        clickedLocation.latitude,
        color,
        "",
        memoryNote,
        title,
        spotifyTrackId
      );

      const souvenirId = await saveSouvenir(newSouvenir);
      if (!souvenirId) {
        alert("Error saving souvenir.");
        return;
      }

      const downloadURL = await uploadImage(souvenirId, result.blob, result.fileName);
      if (!downloadURL) {
        alert("Error uploading image.");
        return;
      }

      newSouvenir.image = downloadURL;
      await updateSouvenir(newSouvenir, souvenirId);
      
      alert("Souvenir added!");
      setTitle("");
      onClose();
      onSouvenirCreated?.();
    } catch (error) {
      console.error("Error capturing image:", error);
      alert("An error occurred while creating the souvenir.");
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create your souvenir</Text>
          </View>

          <ScrollView 
            style={styles.modalScrollContent}
            contentContainerStyle={styles.modalScrollContentContainer}
          >
            <TextInput
              placeholder="Enter a title for your souvenir"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />

            <TextInput
              placeholder="Write a little note..!"
              value={memoryNote}
              onChangeText={setMemoryNote}
              style={styles.noteInput}
            />

            <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>Rechercher une musique</Text>
            <MusicManager onTrackSelected={setSpotifyTrackId ?? (() => {})} />

            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600' }}>Choisir une couleur</Text>
              <ColorPicker
                color={color}
                onColorChangeComplete={setColor}
                sliderHidden={true}
                thumbSize={40}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              onPress={handlePhotoButtonPress}
              style={styles.photoButton}
            >
              <Text style={styles.photoButtonText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SouvenirModal;
