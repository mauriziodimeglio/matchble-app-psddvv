
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react';
import * as Location from 'expo-location';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface VenueLocationPickerProps {
  onLocationSelected: (location: { latitude: number; longitude: number; address: string }) => void;
  initialLocation?: { latitude: number; longitude: number; address: string };
}

export default function VenueLocationPicker({ onLocationSelected, initialLocation }: VenueLocationPickerProps) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(
    initialLocation || null
  );
  const [loading, setLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState(initialLocation?.address || '');

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permesso Negato',
          'Per utilizzare la localizzazione automatica, abilita i permessi di posizione nelle impostazioni.'
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      let address = 'Posizione corrente';
      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        address = `${place.street || ''} ${place.streetNumber || ''}, ${place.city || ''}, ${place.region || ''}`.trim();
      }

      const newLocation = { latitude, longitude, address };
      setLocation(newLocation);
      setManualAddress(address);
      onLocationSelected(newLocation);

      Alert.alert('✅ Posizione Acquisita', `Coordinate: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Errore', 'Impossibile ottenere la posizione corrente. Inserisci l&apos;indirizzo manualmente.');
    } finally {
      setLoading(false);
    }
  };

  const geocodeAddress = async () => {
    if (!manualAddress.trim()) {
      Alert.alert('Errore', 'Inserisci un indirizzo valido');
      return;
    }

    setLoading(true);
    try {
      const geocoded = await Location.geocodeAsync(manualAddress);
      
      if (geocoded.length === 0) {
        Alert.alert('Errore', 'Indirizzo non trovato. Verifica e riprova.');
        setLoading(false);
        return;
      }

      const { latitude, longitude } = geocoded[0];
      const newLocation = { latitude, longitude, address: manualAddress };
      setLocation(newLocation);
      onLocationSelected(newLocation);

      Alert.alert('✅ Indirizzo Trovato', `Coordinate: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    } catch (error) {
      console.error('Error geocoding address:', error);
      Alert.alert('Errore', 'Impossibile trovare l&apos;indirizzo. Verifica e riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Localizzazione Impianto</Text>
      <Text style={styles.description}>
        Seleziona la posizione dell&apos;impianto sportivo per visualizzarla sulla mappa
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <>
              <IconSymbol
                ios_icon_name="location.fill"
                android_material_icon_name="my_location"
                size={20}
                color={colors.card}
              />
              <Text style={styles.gpsButtonText}>Usa Posizione Corrente</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>oppure</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.manualInputContainer}>
        <Text style={styles.label}>Indirizzo Manuale</Text>
        <TextInput
          style={styles.input}
          placeholder="Via Roma 123, Milano, MI"
          placeholderTextColor={colors.textSecondary}
          value={manualAddress}
          onChangeText={setManualAddress}
          multiline
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={geocodeAddress}
          disabled={loading || !manualAddress.trim()}
        >
          {loading ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <>
              <IconSymbol
                ios_icon_name="magnifyingglass"
                android_material_icon_name="search"
                size={20}
                color={colors.card}
              />
              <Text style={styles.searchButtonText}>Cerca Indirizzo</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {location && (
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={24}
              color={colors.calcio}
            />
            <Text style={styles.locationTitle}>Posizione Selezionata</Text>
          </View>
          <Text style={styles.locationAddress}>{location.address}</Text>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesLabel}>Coordinate:</Text>
            <Text style={styles.coordinatesValue}>
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </Text>
          </View>
          <View style={styles.mapPlaceholder}>
            <IconSymbol
              ios_icon_name="map.fill"
              android_material_icon_name="map"
              size={48}
              color={colors.textSecondary}
            />
            <Text style={styles.mapPlaceholderText}>
              ⚠️ Nota: Le mappe interattive (react-native-maps) non sono supportate in Natively.
              {'\n'}Le coordinate sono state salvate e possono essere utilizzate con servizi esterni.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoEmoji}>💡</Text>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Suggerimento</Text>
          <Text style={styles.infoText}>
            Le coordinate GPS verranno salvate e potranno essere utilizzate per mostrare la posizione su mappe esterne o per calcolare distanze.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  gpsButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gpsButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  manualInputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 60,
  },
  searchButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  locationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.calcio,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  locationAddress: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  coordinatesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  coordinatesValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    fontFamily: 'SpaceMono',
  },
  mapPlaceholder: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  mapPlaceholderText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
