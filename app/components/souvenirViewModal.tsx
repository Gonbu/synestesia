import React, { useState, useEffect } from "react";
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
import { getAccessToken } from "../services/spotifyConfig";

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

interface SpotifyTrack {
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
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
  const [trackInfo, setTrackInfo] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (souvenir?.spotifyTrackId) {
      fetchTrackInfo();
    }
  }, [souvenir?.spotifyTrackId]);

  const fetchTrackInfo = async () => {
    if (!souvenir?.spotifyTrackId) return;
    
    setLoading(true);
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${souvenir.spotifyTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTrackInfo(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de la piste:", error);
    } finally {
      setLoading(false);
    }
  };

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
            {souvenir.spotifyTrackId && (
              <View style={styles.musicPreview}>
                <Text style={styles.musicPreviewTitle}>Musique associée</Text>
                {loading ? (
                  <Text>Chargement...</Text>
                ) : trackInfo ? (
                  <View style={styles.musicPreviewTrackContainer}>
                    <Image
                      source={{ uri: trackInfo.album.images[2]?.url }}
                      style={styles.musicPreviewTrackImage}
                    />
                    <View style={styles.musicPreviewTrackInfo}>
                      <Text style={styles.musicPreviewTrackName} numberOfLines={1}>
                        {trackInfo.name}
                      </Text>
                      <Text style={styles.musicPreviewTrackArtist} numberOfLines={1}>
                        {trackInfo.artists.map((a) => a.name).join(", ")}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text>Impossible de charger les informations de la piste</Text>
                )}
              </View>
            )}
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
