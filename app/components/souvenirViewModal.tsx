import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Souvenir } from "./souvenirManager";
import { styles } from "../styles";

interface SouvenirViewModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddSouvenir: () => void;
  souvenir: Souvenir | null;
  onPreviousMarker?: () => void;
  onNextMarker?: () => void;
  onPreviousSouvenir?: () => void;
  onNextSouvenir?: () => void;
  hasPreviousMarker?: boolean;
  hasNextMarker?: boolean;
  hasMultipleSouvenirs?: boolean;
  currentSouvenirIndex?: number;
  totalSouvenirs?: number;
}

const SouvenirViewModal: React.FC<SouvenirViewModalProps> = ({
  isVisible,
  onClose,
  onEdit,
  onAddSouvenir,
  souvenir,
  onPreviousMarker,
  onNextMarker,
  onPreviousSouvenir,
  onNextSouvenir,
  hasPreviousMarker = false,
  hasNextMarker = false,
  hasMultipleSouvenirs = false,
  currentSouvenirIndex = 0,
  totalSouvenirs = 1,
}) => {
  if (!souvenir) return null;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View 
          style={[
            styles.viewModalContent, 
            { backgroundColor: souvenir.color }
          ]}
        >
          <View style={styles.navigationContainer}>
            <View style={styles.navigationButtons}>
              <TouchableOpacity 
                onPress={onPreviousMarker} 
                style={[styles.navButton, !hasPreviousMarker && styles.navButtonDisabled]}
                disabled={!hasPreviousMarker}
              >
                <Ionicons name="chevron-back" size={24} color={hasPreviousMarker ? "white" : "#666"} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={onNextMarker} 
                style={[styles.navButton, !hasNextMarker && styles.navButtonDisabled]}
                disabled={!hasNextMarker}
              >
                <Ionicons name="chevron-forward" size={24} color={hasNextMarker ? "white" : "#666"} />
              </TouchableOpacity>
            </View>
            {hasMultipleSouvenirs && (
              <View style={styles.navigationButtons}>
                <TouchableOpacity 
                  onPress={onPreviousSouvenir} 
                  style={[styles.navButton, styles.navButtonSmall]}
                >
                  <Ionicons name="arrow-back" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={onNextSouvenir} 
                  style={[styles.navButton, styles.navButtonSmall]}
                >
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView 
            contentContainerStyle={styles.viewModalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.viewModalTitle}>{souvenir.title}</Text>
            {souvenir.image && (
              <Image
                source={{ uri: souvenir.image }}
                style={styles.souvenirImage}
                resizeMode="cover"
              />
            )}
            <Text style={styles.souvenirNote}>{souvenir.note}</Text>
            <Text style={styles.souvenirDate}>
              {new Date(souvenir.date).toLocaleDateString()}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onAddSouvenir} style={styles.addButton}>
                <Text style={styles.buttonText}>Add souvenir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.viewCloseButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SouvenirViewModal; 
