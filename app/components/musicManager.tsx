import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { getAccessToken } from '../services/spotifyConfig';
import { styles } from '../styles';
import { Ionicons } from "@expo/vector-icons";

const SPOTIFY_API_URL = 'https://api.spotify.com/v1/search';

interface MusicManagerProps {
  onTrackSelected: (trackId: string) => void;
  style?: any;
  initialTrackId?: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}

interface SpotifyApiResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

const MusicManager: React.FC<MusicManagerProps> = ({ onTrackSelected, style, initialTrackId }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const token = await getAccessToken();
      setAccessToken(token);
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (!query || !accessToken) {
      setTracks([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchTracks(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, accessToken]);

  useEffect(() => {
    if (initialTrackId && tracks.length > 0) {
      const track = tracks.find(t => t.id === initialTrackId);
      if (track) {
        setSelectedTrack(track);
        setIsSearching(false);
      }
    }
  }, [initialTrackId, tracks]);

  const searchTracks = async (query: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`${SPOTIFY_API_URL}?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data: SpotifyApiResponse = await response.json();
      setTracks(data.tracks?.items || []);
    } catch (error) {
      console.error('Erreur lors de la recherche Spotify:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTrack = (track: SpotifyTrack) => {
    setSelectedTrack(track);
    setIsSearching(false);
    onTrackSelected(track.id);
  };

  const handleResetSelection = () => {
    setSelectedTrack(null);
    setQuery('');
    setIsSearching(true);
    onTrackSelected('');
  };

  const renderTrackItem = ({ item }: { item: SpotifyTrack }) => (
    <TouchableOpacity 
      onPress={() => handleSelectTrack(item)} 
      style={[
        styles.musicTrackItem,
        selectedTrack?.id === item.id && { backgroundColor: '#f0f0f0' }
      ]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.album.images[2]?.url }} 
        style={styles.musicTrackImage}
      />
      <View style={styles.musicTrackInfo}>
        <Text style={styles.musicTrackName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.musicTrackArtist} numberOfLines={1}>
          {item.artists.map((a) => a.name).join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.musicManagerContainer}>
      <View style={styles.musicSearchContainer}>
        <TextInput
          style={styles.musicSearchInput}
          placeholder="Rechercher une musique..."
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsSearching(true)}
        />
        {loading && (
          <ActivityIndicator style={styles.musicLoader} color="#000" />
        )}
      </View>

      {isSearching && (
        <View style={styles.musicTrackList}>
          <FlatList
            data={tracks}
            renderItem={renderTrackItem}
            keyExtractor={(item) => item.id}
            style={styles.musicTrackListContent}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>
      )}

      {selectedTrack && !isSearching && (
        <View style={styles.musicSelectedTrackContainer}>
          <Image
            source={{ uri: selectedTrack.album.images[0]?.url }}
            style={styles.musicSelectedTrackImage}
          />
          <View style={styles.musicSelectedTrackInfo}>
            <Text style={styles.musicSelectedTrackName}>{selectedTrack.name}</Text>
            <Text style={styles.musicSelectedTrackArtist}>{selectedTrack.artists[0].name}</Text>
          </View>
          <TouchableOpacity
            onPress={handleResetSelection}
            style={styles.musicResetButton}
          >
            <Ionicons name="close-circle" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MusicManager;
