import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import SouvenirModal from "./components/souvenirModal";
import SouvenirViewModal from "./components/souvenirViewModal";
import { Souvenir, getSouvenirs } from "./components/souvenirManager";
import { styles } from "./styles";

interface GroupedSouvenir {
  location: {
    latitude: number;
    longitude: number;
  };
  souvenirs: Souvenir[];
}

const Map = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [clickedLocation, setClickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedSouvenir, setSelectedSouvenir] = useState<Souvenir | null>(null);
  const [souvenirs, setSouvenirs] = useState<Souvenir[]>([]);
  const [color, setColor] = useState("red");
  const [memoryNote, setMemoryNote] = useState("");
  const mapRef = useRef<MapView>(null);
  const [currentSouvenirIndex, setCurrentSouvenirIndex] = useState<number>(0);
  const [tempMarker, setTempMarker] = useState<{latitude: number; longitude: number} | null>(null);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission refused");
        setInitialRegion({
          latitude: 48.8566, // Paris by default
          longitude: 2.3522,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low, // Less accurate, faster
      });

      const region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setInitialRegion(region);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    refreshSouvenirs(); // Load souvenirs in background
  }, []);

  const refreshSouvenirs = async () => {
    const fetchedSouvenirs = await getSouvenirs();
    console.log('Fetched souvenirs:', fetchedSouvenirs);
    setSouvenirs(fetchedSouvenirs);
  };

  const filteredSouvenirs = souvenirs.filter(souvenir => {
    console.log('Checking souvenir:', souvenir);
    return souvenir.latitude && souvenir.longitude;
  });
  console.log('Filtered souvenirs:', filteredSouvenirs);

  const centerMapOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const centerMapOnSouvenir = (souvenir: Souvenir) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: souvenir.latitude,
        longitude: souvenir.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const centerMapOnTempMarker = () => {
    if (mapRef.current && tempMarker) {
      mapRef.current.animateToRegion({
        latitude: tempMarker.latitude,
        longitude: tempMarker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  useEffect(() => {
    if (tempMarker && isCreateModalVisible) {
      centerMapOnTempMarker();
    }
  }, [tempMarker, isCreateModalVisible]);

  useEffect(() => {
    if (selectedSouvenir && isViewModalVisible) {
      centerMapOnSouvenir(selectedSouvenir);
    }
  }, [selectedSouvenir, isViewModalVisible]);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setClickedLocation({ latitude, longitude });
    setTempMarker({ latitude, longitude });
    setIsCreateModalVisible(true);
  };

  const groupSouvenirsByLocation = (souvenirs: Souvenir[]): GroupedSouvenir[] => {
    const grouped: { [key: string]: GroupedSouvenir } = {};
    
    souvenirs.forEach(souvenir => {
      const key = `${souvenir.latitude},${souvenir.longitude}`;
      if (!grouped[key]) {
        grouped[key] = {
          location: {
            latitude: souvenir.latitude,
            longitude: souvenir.longitude,
          },
          souvenirs: [],
        };
      }
      grouped[key].souvenirs.push(souvenir);
    });

    return Object.values(grouped);
  };

  const handleMarkerPress = (groupedSouvenir: GroupedSouvenir, index: number) => {
    setSelectedSouvenir(groupedSouvenir.souvenirs[0]);
    setCurrentSouvenirIndex(index);
    setIsViewModalVisible(true);
    centerMapOnSouvenir(groupedSouvenir.souvenirs[0]);
  };

  const handlePreviousSouvenir = () => {
    const groupedSouvenirs = groupSouvenirsByLocation(filteredSouvenirs);
    const currentGroup = groupedSouvenirs[currentSouvenirIndex];
    
    if (currentGroup.souvenirs.length > 1) {
      const currentSouvenirIndex = currentGroup.souvenirs.findIndex(s => s.id === selectedSouvenir?.id);
      if (currentSouvenirIndex > 0) {
        setSelectedSouvenir(currentGroup.souvenirs[currentSouvenirIndex - 1]);
      }
    }
  };

  const handleNextSouvenir = () => {
    const groupedSouvenirs = groupSouvenirsByLocation(filteredSouvenirs);
    const currentGroup = groupedSouvenirs[currentSouvenirIndex];
    
    if (currentGroup.souvenirs.length > 1) {
      const currentSouvenirIndex = currentGroup.souvenirs.findIndex(s => s.id === selectedSouvenir?.id);
      if (currentSouvenirIndex < currentGroup.souvenirs.length - 1) {
        setSelectedSouvenir(currentGroup.souvenirs[currentSouvenirIndex + 1]);
      }
    }
  };

  const handlePreviousMarker = () => {
    if (currentSouvenirIndex > 0) {
      const groupedSouvenirs = groupSouvenirsByLocation(filteredSouvenirs);
      const previousGroup = groupedSouvenirs[currentSouvenirIndex - 1];
      setCurrentSouvenirIndex(currentSouvenirIndex - 1);
      setSelectedSouvenir(previousGroup.souvenirs[0]);
      centerMapOnSouvenir(previousGroup.souvenirs[0]);
    }
  };

  const handleNextMarker = () => {
    const groupedSouvenirs = groupSouvenirsByLocation(filteredSouvenirs);
    if (currentSouvenirIndex < groupedSouvenirs.length - 1) {
      const nextGroup = groupedSouvenirs[currentSouvenirIndex + 1];
      setCurrentSouvenirIndex(currentSouvenirIndex + 1);
      setSelectedSouvenir(nextGroup.souvenirs[0]);
      centerMapOnSouvenir(nextGroup.souvenirs[0]);
    }
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
    setTempMarker(null);
    setColor("red");
    setMemoryNote("");
  };

  const closeViewModal = () => {
    setIsViewModalVisible(false);
    setSelectedSouvenir(null);
  };

  const handleEditSouvenir = () => {
    setIsViewModalVisible(false);
    setIsCreateModalVisible(true);
    if (selectedSouvenir) {
      setColor(selectedSouvenir.color);
      setMemoryNote(selectedSouvenir.note);
      setClickedLocation({
        latitude: selectedSouvenir.latitude,
        longitude: selectedSouvenir.longitude,
      });
    }
  };

  const handleAddSouvenir = () => {
    if (selectedSouvenir) {
      setClickedLocation({
        latitude: selectedSouvenir.latitude,
        longitude: selectedSouvenir.longitude,
      });
      setTempMarker({
        latitude: selectedSouvenir.latitude,
        longitude: selectedSouvenir.longitude,
      });
      setIsViewModalVisible(false);
      setIsCreateModalVisible(true);
    }
  };

  const hasPreviousMarker = currentSouvenirIndex > 0;
  const hasNextMarker = currentSouvenirIndex < groupSouvenirsByLocation(filteredSouvenirs).length - 1;
  const currentGroup = selectedSouvenir ? groupSouvenirsByLocation(filteredSouvenirs)[currentSouvenirIndex] : null;
  const hasMultipleSouvenirs = currentGroup ? currentGroup.souvenirs.length > 1 : false;
  const currentSouvenirIndexInGroup = currentGroup ? currentGroup.souvenirs.findIndex(s => s.id === selectedSouvenir?.id) : 0;
  const totalSouvenirsInGroup = currentGroup ? currentGroup.souvenirs.length : 0;

  const handleMapReady = () => {
    setIsMapReady(true);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
      {location && initialRegion && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider="google"
            initialRegion={initialRegion}
            onPress={handleMapPress}
            onMapReady={handleMapReady}
          >
            <Marker
              coordinate={location}
              title="You are here"
              pinColor="blue"
            />
            {tempMarker && (
              <Marker
                coordinate={tempMarker}
                title="New souvenir location"
                pinColor={color}
              />
            )}
            {groupSouvenirsByLocation(filteredSouvenirs).map((groupedSouvenir, index) => (
              <Marker
                key={index}
                coordinate={groupedSouvenir.location}
                title={`${groupedSouvenir.souvenirs[0].title} (${groupedSouvenir.souvenirs.length})`}
                pinColor={groupedSouvenir.souvenirs[0].color}
                onPress={() => handleMarkerPress(groupedSouvenir, index)}
              />
            ))}
          </MapView>
        </View>
      )}

      <TouchableOpacity style={styles.locateButton} onPress={centerMapOnUser}>
        <Ionicons name="locate" size={24} color="white" style={styles.locateIcon} />
      </TouchableOpacity>

      <SouvenirModal
        isVisible={isCreateModalVisible}
        onClose={closeCreateModal}
        clickedLocation={clickedLocation}
        color={color}
        setColor={setColor}
        memoryNote={memoryNote}
        setMemoryNote={setMemoryNote}
        onSouvenirCreated={refreshSouvenirs}
      />

      <SouvenirViewModal
        isVisible={isViewModalVisible}
        onClose={closeViewModal}
        onEdit={handleEditSouvenir}
        onAddSouvenir={handleAddSouvenir}
        souvenir={selectedSouvenir}
        onPreviousMarker={handlePreviousMarker}
        onNextMarker={handleNextMarker}
        onPreviousSouvenir={handlePreviousSouvenir}
        onNextSouvenir={handleNextSouvenir}
        hasPreviousMarker={hasPreviousMarker}
        hasNextMarker={hasNextMarker}
        hasMultipleSouvenirs={hasMultipleSouvenirs}
        currentSouvenirIndex={currentSouvenirIndexInGroup}
        totalSouvenirs={totalSouvenirsInGroup}
      />
    </SafeAreaView>
  );
};

// Note: Disable JS Debugging in Expo Go to speed up loading in development.

export default Map;
