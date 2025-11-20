
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Sport, Venue } from '@/types';
import * as Location from 'expo-location';

export default function RegisterVenue() {
  const params = useLocalSearchParams();
  const returnTo = params.returnTo as string;
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [region, setRegion] = useState('');
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [capacity, setCapacity] = useState('');
  const [indoor, setIndoor] = useState(true);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const sports: Sport[] = ['calcio', 'basket', 'volley', 'padel'];

  const sportEmojis: Record<Sport, string> = {
    calcio: '⚽',
    basket: '🏀',
    volley: '🏐',
    padel: '🎾'
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permesso Negato', 'Abilita i permessi di localizzazione nelle impostazioni');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      // Reverse geocoding to get address
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        const place = geocode[0];
        if (place.street && place.streetNumber) {
          setAddress(`${place.street} ${place.streetNumber}`);
        }
        if (place.city) setCity(place.city);
        if (place.region) setProvince(place.region);
        if (place.region) setRegion(place.region);
      }

      Alert.alert('Successo', 'Posizione rilevata con successo!');
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Errore', 'Impossibile rilevare la posizione');
    } finally {
      setLoadingLocation(false);
    }
  };

  const searchAddress = async () => {
    if (!address || !city) {
      Alert.alert('Attenzione', 'Inserisci almeno indirizzo e città');
      return;
    }

    setLoadingLocation(true);
    try {
      const fullAddress = `${address}, ${city}, ${province}, ${region}, Italia`;
      const geocode = await Location.geocodeAsync(fullAddress);

      if (geocode.length > 0) {
        setCoordinates({
          lat: geocode[0].latitude,
          lng: geocode[0].longitude,
        });
        Alert.alert('Successo', 'Indirizzo localizzato sulla mappa!');
      } else {
        Alert.alert('Errore', 'Indirizzo non trovato');
      }
    } catch (error) {
      console.error('Error geocoding:', error);
      Alert.alert('Errore', 'Impossibile localizzare l\'indirizzo');
    } finally {
      setLoadingLocation(false);
    }
  };

  const toggleSport = (sport: Sport) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleSubmit = () => {
    if (!name || !address || !city || !province || !region) {
      Alert.alert('Campi Obbligatori', 'Compila tutti i campi obbligatori');
      return;
    }

    if (selectedSports.length === 0) {
      Alert.alert('Sport Richiesto', 'Seleziona almeno uno sport');
      return;
    }

    if (!coordinates) {
      Alert.alert('Posizione Richiesta', 'Localizza il campo sulla mappa');
      return;
    }

    const newVenue: Venue = {
      id: `venue_${Date.now()}`,
      name,
      address,
      city,
      province,
      region,
      sport: selectedSports,
      coordinates,
      capacity: capacity ? parseInt(capacity) : undefined,
      indoor,
      facilities: [],
      photos: [],
      contactPhone: phone,
      contactEmail: email,
      verified: false,
      createdBy: 'current_user_id',
      createdAt: new Date(),
    };

    console.log('New venue:', newVenue);
    Alert.alert('Successo', 'Campo registrato con successo!', [
      {
        text: 'OK',
        onPress: () => {
          if (returnTo) {
            router.back();
          } else {
            router.push('/(tabs)/(home)');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registra Campo</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Informazioni Base</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Campo *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Es: Campo Sportivo Comunale"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Indirizzo *</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Via, Numero Civico"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Città *</Text>
              <TextInput
                style={styles.input}
                value={city}
                onChangeText={setCity}
                placeholder="Milano"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Provincia *</Text>
              <TextInput
                style={styles.input}
                value={province}
                onChangeText={setProvince}
                placeholder="MI"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Regione *</Text>
            <TextInput
              style={styles.input}
              value={region}
              onChangeText={setRegion}
              placeholder="Lombardia"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Localizzazione</Text>
          <Text style={styles.sectionDescription}>
            Localizza il campo sulla mappa per permettere agli utenti di trovarlo facilmente
          </Text>

          <View style={styles.locationButtons}>
            <TouchableOpacity
              style={[styles.locationButton, styles.primaryButton]}
              onPress={getCurrentLocation}
              disabled={loadingLocation}
            >
              <IconSymbol
                ios_icon_name="location.fill"
                android_material_icon_name="my_location"
                size={20}
                color={colors.card}
              />
              <Text style={styles.locationButtonText}>
                {loadingLocation ? 'Rilevamento...' : 'Usa Posizione Attuale'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.locationButton, styles.secondaryButton]}
              onPress={searchAddress}
              disabled={loadingLocation}
            >
              <IconSymbol
                ios_icon_name="magnifyingglass"
                android_material_icon_name="search"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.locationButtonTextSecondary}>
                Cerca Indirizzo
              </Text>
            </TouchableOpacity>
          </View>

          {coordinates && (
            <View style={styles.coordinatesBox}>
              <Text style={styles.coordinatesLabel}>✅ Posizione Rilevata</Text>
              <Text style={styles.coordinatesText}>
                Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚽ Sport Disponibili *</Text>
          <View style={styles.sportsGrid}>
            {sports.map((sport, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.sportCard,
                    selectedSports.includes(sport) && styles.sportCardSelected
                  ]}
                  onPress={() => toggleSport(sport)}
                >
                  <Text style={styles.sportEmoji}>{sportEmojis[sport]}</Text>
                  <Text style={[
                    styles.sportName,
                    selectedSports.includes(sport) && styles.sportNameSelected
                  ]}>
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </Text>
                  {selectedSports.includes(sport) && (
                    <View style={styles.checkmark}>
                      <IconSymbol
                        ios_icon_name="checkmark"
                        android_material_icon_name="check"
                        size={16}
                        color={colors.card}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏟️ Dettagli Campo</Text>

          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>Campo Coperto</Text>
              <Text style={styles.switchDescription}>
                Il campo è al coperto o all'aperto?
              </Text>
            </View>
            <Switch
              value={indoor}
              onValueChange={setIndoor}
              trackColor={{ false: '#E0E0E0', true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Capienza (opzionale)</Text>
            <TextInput
              style={styles.input}
              value={capacity}
              onChangeText={setCapacity}
              placeholder="Numero spettatori"
              keyboardType="numeric"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contatti (opzionale)</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+39 123 456 7890"
              keyboardType="phone-pad"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="campo@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Registra Campo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  locationButtons: {
    gap: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
  locationButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  coordinatesBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  coordinatesLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sportCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  sportCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  sportEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  sportNameSelected: {
    color: colors.primary,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  switchLabel: {
    flex: 1,
    marginRight: 16,
  },
  switchDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
});
