
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { AthleteProfile, Sport } from '@/types';

export default function ClubAthletes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState<Sport | 'all'>('all');

  const mockAthletes: AthleteProfile[] = [
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
        phone: '+39 123 456 7890',
        email: 'marco.rossi@email.com',
      },
      stats: {
        matchesPlayed: 45,
        goals: 23,
        assists: 15,
        yellowCards: 3,
        redCards: 0,
        mvpAwards: 2,
      },
      clubAssociations: [{
        clubId: 'club_001',
        clubName: 'Polisportiva Milano',
        teamId: 'team_001',
        teamName: 'Milano Calcio Maschile',
        role: 'captain',
        status: 'accepted',
        requestedAt: new Date('2024-01-01'),
        acceptedAt: new Date('2024-01-02'),
      }],
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
  ];

  const sports: (Sport | 'all')[] = ['all', 'calcio', 'basket', 'volley', 'padel'];
  const sportEmojis: Record<Sport | 'all', string> = {
    all: '🏆',
    calcio: '⚽',
    basket: '🏀',
    volley: '🏐',
    padel: '🎾',
  };

  const filteredAthletes = mockAthletes.filter(athlete => {
    const matchesSearch = athlete.publicProfile.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = filterSport === 'all' || athlete.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'captain':
        return { emoji: '👑', label: 'Capitano', color: '#FFD700' };
      case 'vice_captain':
        return { emoji: '⭐', label: 'Vice Capitano', color: '#C0C0C0' };
      default:
        return { emoji: '👤', label: 'Giocatore', color: colors.textSecondary };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atleti</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Invita Atleta', 'Funzionalità in arrivo')}
        >
          <IconSymbol
            ios_icon_name="person.badge.plus"
            android_material_icon_name="person_add"
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
            placeholder="Cerca atleta..."
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
        {filteredAthletes.map((athlete, index) => {
          const association = athlete.clubAssociations[0];
          const roleBadge = getRoleBadge(association.role);

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.athleteCard}
                onPress={() => router.push(`/athlete/${athlete.id}`)}
              >
                <Image
                  source={{ uri: athlete.publicProfile.photo }}
                  style={styles.athletePhoto}
                />
                
                <View style={styles.athleteInfo}>
                  <View style={styles.athleteHeader}>
                    <Text style={styles.athleteName}>{athlete.publicProfile.displayName}</Text>
                    {athlete.publicProfile.jerseyNumber && (
                      <View style={styles.jerseyBadge}>
                        <Text style={styles.jerseyNumber}>#{athlete.publicProfile.jerseyNumber}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.athleteMeta}>
                    <View style={[styles.roleBadge, { backgroundColor: roleBadge.color + '20' }]}>
                      <Text style={styles.roleText}>{roleBadge.emoji} {roleBadge.label}</Text>
                    </View>
                    <Text style={styles.position}>{athlete.publicProfile.position}</Text>
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
                      <Text style={styles.statLabel}>Goal</Text>
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

                  <View style={styles.availabilityRow}>
                    <Text style={styles.availabilityLabel}>Disponibilità:</Text>
                    <View style={styles.availabilityDays}>
                      {Object.entries(athlete.availability).map(([day, available], dayIndex) => (
                        <React.Fragment key={dayIndex}>
                          <View style={[styles.dayBadge, available && styles.dayBadgeAvailable]}>
                            <Text style={[styles.dayText, available && styles.dayTextAvailable]}>
                              {day.substring(0, 3).toUpperCase()}
                            </Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}

        {filteredAthletes.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👤</Text>
            <Text style={styles.emptyText}>Nessun atleta trovato</Text>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => Alert.alert('Invita Atleta', 'Funzionalità in arrivo')}
            >
              <Text style={styles.inviteButtonText}>Invita Atleti</Text>
            </TouchableOpacity>
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
  addButton: {
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
  athleteCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  athletePhoto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  athleteInfo: {
    gap: 12,
  },
  athleteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  athleteName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  jerseyBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  jerseyNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.card,
  },
  athleteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  position: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  motto: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  availabilityRow: {
    gap: 8,
  },
  availabilityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  availabilityDays: {
    flexDirection: 'row',
    gap: 6,
  },
  dayBadge: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  dayBadgeAvailable: {
    backgroundColor: colors.primary + '20',
  },
  dayText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dayTextAvailable: {
    color: colors.primary,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 24,
  },
  inviteButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
});
