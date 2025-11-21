
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Sport, AthleteProfile } from '@/types';

export default function AthleteShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState<Sport | 'all'>('all');

  const mockShowcaseAthletes: AthleteProfile[] = [
    {
      id: 'athlete_001',
      userId: 'user_001',
      sport: 'calcio',
      publicProfile: {
        displayName: 'Marco Rossi',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        jerseyNumber: 10,
        position: 'Centrocampista',
        motto: 'Mai mollare!',
        achievements: ['Capocannoniere 2024', 'MVP Torneo Regionale'],
      },
      privateProfile: {
        fullName: 'Marco Rossi',
        dateOfBirth: new Date('1995-05-15'),
      },
      stats: {
        matchesPlayed: 45,
        goals: 23,
        assists: 15,
        yellowCards: 3,
        redCards: 0,
        mvpAwards: 2,
      },
      clubAssociations: [],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2025-01-15'),
    },
    {
      id: 'athlete_002',
      userId: 'user_002',
      sport: 'basket',
      publicProfile: {
        displayName: 'Luca Bianchi',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        jerseyNumber: 23,
        position: 'Guardia',
        motto: 'Gioca duro, vinci facile',
        achievements: ['Top Scorer 2024'],
      },
      privateProfile: {
        fullName: 'Luca Bianchi',
        dateOfBirth: new Date('1998-03-20'),
      },
      stats: {
        matchesPlayed: 38,
        goals: 456,
        assists: 89,
        mvpAwards: 3,
      },
      clubAssociations: [],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2025-01-15'),
    },
    {
      id: 'athlete_003',
      userId: 'user_003',
      sport: 'volley',
      publicProfile: {
        displayName: 'Anna Ferrari',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        jerseyNumber: 7,
        position: 'Schiacciatrice',
        motto: 'Vola alto!',
        achievements: ['Miglior Schiacciatrice 2024', 'Campionessa Regionale'],
      },
      privateProfile: {
        fullName: 'Anna Ferrari',
        dateOfBirth: new Date('1997-07-10'),
      },
      stats: {
        matchesPlayed: 42,
        goals: 234,
        assists: 67,
        mvpAwards: 4,
      },
      clubAssociations: [],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false,
        saturday: true,
        sunday: true,
      },
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2025-01-15'),
    },
  ];

  const sports: (Sport | 'all')[] = ['all', 'calcio', 'basket', 'volley', 'padel'];
  const sportEmojis: Record<Sport | 'all', string> = {
    all: '🏆',
    calcio: '⚽',
    basket: '🏀',
    volley: '🏐',
    padel: '🎾',
  };

  const filteredAthletes = mockShowcaseAthletes.filter(athlete => {
    const matchesSearch = athlete.publicProfile.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          athlete.publicProfile.position?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = filterSport === 'all' || athlete.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vetrina Atleti</Text>
        <TouchableOpacity
          style={styles.messagesButton}
          onPress={() => router.push('/messages')}
        >
          <IconSymbol
            ios_icon_name="message.fill"
            android_material_icon_name="message"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <IconSymbol
            ios_icon_name="magnifyingglass"
            android_material_icon_name="search"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cerca atleta o ruolo..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {sports.map((sport, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[styles.filterChip, filterSport === sport && styles.filterChipActive]}
                onPress={() => setFilterSport(sport)}
              >
                <Text style={styles.filterEmoji}>{sportEmojis[sport]}</Text>
                <Text style={[styles.filterText, filterSport === sport && styles.filterTextActive]}>
                  {sport === 'all' ? 'Tutti' : sport.charAt(0).toUpperCase() + sport.slice(1)}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>🌟 Atleti in Evidenza</Text>
        <Text style={styles.sectionDescription}>
          Scopri atleti talentuosi e contattali per proposte di collaborazione
        </Text>

        {filteredAthletes.map((athlete, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.athleteCard}
              onPress={() => router.push(`/athlete/${athlete.id}`)}
            >
              <Image
                source={{ uri: athlete.publicProfile.photo }}
                style={styles.athletePhoto}
              />
              
              <View style={styles.athleteOverlay}>
                <View style={styles.athleteHeader}>
                  <View style={styles.athleteInfo}>
                    <Text style={styles.athleteName}>{athlete.publicProfile.displayName}</Text>
                    <Text style={styles.athletePosition}>{athlete.publicProfile.position}</Text>
                  </View>
                  {athlete.publicProfile.jerseyNumber && (
                    <View style={styles.jerseyBadge}>
                      <Text style={styles.jerseyNumber}>#{athlete.publicProfile.jerseyNumber}</Text>
                    </View>
                  )}
                </View>

                {athlete.publicProfile.motto && (
                  <Text style={styles.motto}>"{athlete.publicProfile.motto}"</Text>
                )}

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{athlete.stats.matchesPlayed}</Text>
                    <Text style={styles.statLabel}>Partite</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{athlete.stats.goals || 0}</Text>
                    <Text style={styles.statLabel}>Punti</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{athlete.stats.assists || 0}</Text>
                    <Text style={styles.statLabel}>Assist</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{athlete.stats.mvpAwards || 0}</Text>
                    <Text style={styles.statLabel}>MVP</Text>
                  </View>
                </View>

                {athlete.publicProfile.achievements && athlete.publicProfile.achievements.length > 0 && (
                  <View style={styles.achievementsSection}>
                    <Text style={styles.achievementsTitle}>🏆 Riconoscimenti</Text>
                    {athlete.publicProfile.achievements.slice(0, 2).map((achievement, achIndex) => (
                      <React.Fragment key={achIndex}>
                        <Text style={styles.achievementItem}>• {achievement}</Text>
                      </React.Fragment>
                    ))}
                  </View>
                )}

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => router.push(`/athlete/${athlete.id}`)}
                  >
                    <IconSymbol
                      ios_icon_name="person.circle"
                      android_material_icon_name="account_circle"
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.profileButtonText}>Profilo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.messageButton}
                    onPress={() => router.push(`/messages/${athlete.userId}`)}
                  >
                    <IconSymbol
                      ios_icon_name="message.fill"
                      android_material_icon_name="message"
                      size={20}
                      color={colors.card}
                    />
                    <Text style={styles.messageButtonText}>Messaggio</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        {filteredAthletes.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Nessun atleta trovato</Text>
            <Text style={styles.emptyDescription}>
              Prova a modificare i filtri di ricerca
            </Text>
          </View>
        )}
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
    flex: 1,
    textAlign: 'center',
  },
  messagesButton: {
    padding: 8,
  },
  searchSection: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.card,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  athleteCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  athletePhoto: {
    width: '100%',
    height: 300,
  },
  athleteOverlay: {
    padding: 20,
  },
  athleteHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  athleteInfo: {
    flex: 1,
  },
  athleteName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  athletePosition: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  jerseyBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  jerseyNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.card,
  },
  motto: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  achievementsSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  achievementItem: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  profileButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
