
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { getAllOrganizers } from '@/data/organizersHierarchyData';
import { FirestoreTournament, Sport } from '@/types';

export default function AddTournamentScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    sport: 'calcio' as Sport,
    organizerId: '',
    season: '',
    division: '',
    group: '',
    startDate: '',
    endDate: '',
    location: '',
    city: '',
    sourceUrl: '', // URL del sito ufficiale
  });

  const organizers = getAllOrganizers();
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>('');

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.organizerId || !formData.startDate) {
      Alert.alert('Errore', 'Compila tutti i campi obbligatori');
      return;
    }

    // Create tournament object
    const tournament: Partial<FirestoreTournament> = {
      name: formData.name,
      sport: formData.sport,
      organizerId: formData.organizerId,
      organizerName: organizers.find(o => o.id === formData.organizerId)?.name || '',
      isOfficial: true,
      championshipInfo: {
        season: formData.season,
        division: formData.division,
        group: formData.group,
      },
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      location: {
        name: formData.location,
        city: formData.city,
        address: '',
        coordinates: { lat: 0, lng: 0 },
      },
      status: 'upcoming',
      isPublic: true,
      createdAt: new Date(),
    };

    console.log('Creating official tournament:', tournament);
    
    // TODO: Save to Firestore
    // In a real implementation, you would save this to your database
    
    Alert.alert(
      'Successo',
      'Campionato ufficiale aggiunto con successo',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Aggiungi Campionato Ufficiale',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>📋 Informazioni Campionato</Text>
        
        <Text style={styles.label}>Nome Campionato *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="es: Serie D Girone H"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Sport *</Text>
        <View style={styles.sportSelector}>
          {(['calcio', 'basket', 'volley', 'padel'] as Sport[]).map((sport) => (
            <TouchableOpacity
              key={sport}
              style={[
                styles.sportButton,
                formData.sport === sport && styles.sportButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, sport })}
            >
              <Text style={styles.sportButtonText}>
                {sport === 'calcio' ? '⚽' : sport === 'basket' ? '🏀' : sport === 'volley' ? '🏐' : '🎾'}
              </Text>
              <Text style={[
                styles.sportButtonLabel,
                formData.sport === sport && styles.sportButtonLabelActive,
              ]}>
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Organizzatore *</Text>
        <View style={styles.organizerList}>
          {organizers
            .filter(org => org.sport === formData.sport && org.official)
            .map((org) => (
              <TouchableOpacity
                key={org.id}
                style={[
                  styles.organizerCard,
                  formData.organizerId === org.id && styles.organizerCardActive,
                ]}
                onPress={() => setFormData({ ...formData, organizerId: org.id })}
              >
                <Text style={styles.organizerName}>{org.name}</Text>
                <Text style={styles.organizerPath}>{org.hierarchyPath}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.sectionTitle}>🏆 Dettagli Campionato</Text>

        <Text style={styles.label}>Stagione</Text>
        <TextInput
          style={styles.input}
          value={formData.season}
          onChangeText={(text) => setFormData({ ...formData, season: text })}
          placeholder="es: 2024/2025"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Divisione</Text>
        <TextInput
          style={styles.input}
          value={formData.division}
          onChangeText={(text) => setFormData({ ...formData, division: text })}
          placeholder="es: Serie D"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Girone</Text>
        <TextInput
          style={styles.input}
          value={formData.group}
          onChangeText={(text) => setFormData({ ...formData, group: text })}
          placeholder="es: Girone H"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.sectionTitle}>📅 Date</Text>

        <Text style={styles.label}>Data Inizio *</Text>
        <TextInput
          style={styles.input}
          value={formData.startDate}
          onChangeText={(text) => setFormData({ ...formData, startDate: text })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Data Fine</Text>
        <TextInput
          style={styles.input}
          value={formData.endDate}
          onChangeText={(text) => setFormData({ ...formData, endDate: text })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.sectionTitle}>📍 Località</Text>

        <Text style={styles.label}>Sede</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholder="es: Stadio Comunale"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Città</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          placeholder="es: Napoli"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.sectionTitle}>🔗 Fonte</Text>

        <Text style={styles.label}>URL Sito Ufficiale</Text>
        <TextInput
          style={styles.input}
          value={formData.sourceUrl}
          onChangeText={(text) => setFormData({ ...formData, sourceUrl: text })}
          placeholder="https://..."
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>✅ Aggiungi Campionato</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            ℹ️ I campionati ufficiali devono essere verificati manualmente.
            Assicurati di inserire informazioni accurate provenienti dai siti ufficiali delle federazioni.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sportSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  sportButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  sportButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  sportButtonText: {
    fontSize: 32,
    marginBottom: 4,
  },
  sportButtonLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sportButtonLabelActive: {
    color: colors.primary,
  },
  organizerList: {
    gap: 8,
  },
  organizerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  organizerCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  organizerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  organizerPath: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: colors.primary + '20',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
