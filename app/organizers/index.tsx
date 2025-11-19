
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { Sport } from '@/types';
import { colors } from '@/styles/commonStyles';
import SportFilter from '@/components/SportFilter';
import OrganizerCard from '@/components/OrganizerCard';
import { getOrganizersBySport, sortOrganizers } from '@/utils/organizerHelpers';
import { mockOrganizers } from '@/data/organizersMockData';

export default function OrganizersScreen() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  // Filter organizers by sport
  const filteredOrganizers = selectedSport 
    ? getOrganizersBySport(selectedSport)
    : mockOrganizers;

  // Sort: official first, then alphabetically
  const sortedOrganizers = sortOrganizers(filteredOrganizers);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Organizzatori',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Organizzatori Sportivi</Text>
          <Text style={styles.subtitle}>
            Federazioni e organizzatori ufficiali italiani
          </Text>
        </View>

        <SportFilter 
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        <View style={styles.grid}>
          {sortedOrganizers.map((organizer, index) => (
            <React.Fragment key={index}>
              <View style={styles.gridItem}>
                <OrganizerCard 
                  organizer={organizer}
                  onPress={() => {
                    console.log('Organizer pressed:', organizer.name);
                  }}
                />
              </View>
            </React.Fragment>
          ))}
        </View>

        {sortedOrganizers.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>
              Nessun organizzatore trovato
            </Text>
            <Text style={styles.emptySubtext}>
              Prova a selezionare un altro sport
            </Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
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
  scrollContent: {
    paddingBottom: Platform.OS === 'android' ? 100 : 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 48 : 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  gridItem: {
    width: '48%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});
