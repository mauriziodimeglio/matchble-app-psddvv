
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '@/styles/commonStyles';
import { getOrganizerById } from '@/utils/organizerHelpers';
import { mockFirestoreTournaments } from '@/data/firestoreMockData';
import { sportIcons } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';
import VerificationBadge from '@/components/VerificationBadge';

type FilterType = 'all' | 'active' | 'past';

export default function OrganizerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [filter, setFilter] = useState<FilterType>('all');
  
  const organizer = getOrganizerById(id as string);

  if (!organizer) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>Organizzatore non trovato</Text>
      </View>
    );
  }

  // Get tournaments for this organizer
  const allTournaments = mockFirestoreTournaments.filter(
    t => t.organizerId === organizer.id
  );

  const activeTournaments = allTournaments.filter(t => 
    t.status === 'ongoing' || t.status === 'upcoming'
  );

  const pastTournaments = allTournaments.filter(t => 
    t.status === 'finished'
  );

  const filteredTournaments = 
    filter === 'active' ? activeTournaments :
    filter === 'past' ? pastTournaments :
    allTournaments;

  // Calculate stats
  const activeCount = activeTournaments.length;
  const completedCount = pastTournaments.length;
  const totalTeams = allTournaments.reduce((sum, t) => sum + t.currentTeams, 0);

  const sportData = sportIcons[organizer.sport];

  const handleWebsite = () => {
    Linking.openURL(organizer.website);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${organizer.email}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return colors.live;
      case 'upcoming': return colors.scheduled;
      case 'finished': return colors.finished;
      default: return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ongoing': return 'In Corso';
      case 'upcoming': return 'Prossimo';
      case 'finished': return 'Concluso';
      default: return status;
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={colors.card}
          />
        </TouchableOpacity>

        {/* Header with Cover Image */}
        <View style={styles.header}>
          <Image 
            source={{ uri: organizer.logo }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: organizer.logo }} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.organizerName}>{organizer.name}</Text>
            <Text style={styles.organizerAcronym}>{organizer.acronym}</Text>

            <View style={styles.badges}>
              {organizer.official && (
                <View style={styles.officialBadge}>
                  <Text style={styles.badgeEmoji}>🏆</Text>
                  <Text style={styles.badgeText}>Ufficiale</Text>
                </View>
              )}
              
              <View style={styles.sportBadge}>
                <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informazioni</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.description}>{organizer.description}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo:</Text>
              <Text style={styles.infoValue}>
                {organizer.type === 'national' ? 'Nazionale' : 
                 organizer.type === 'regional' ? 'Regionale' : 'Privato'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ambito:</Text>
              <Text style={styles.infoValue}>
                {organizer.scope.level === 'national' ? '🇮🇹 Nazionale' : 
                 `📍 ${organizer.scope.region}`}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.linkRow}
              onPress={handleWebsite}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="globe"
                android_material_icon_name="language"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.linkText}>{organizer.website}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkRow}
              onPress={handleEmail}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="envelope.fill"
                android_material_icon_name="email"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.linkText}>{organizer.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiche</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{activeCount}</Text>
              <Text style={styles.statLabel}>Tornei Attivi</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{completedCount}</Text>
              <Text style={styles.statLabel}>Tornei Completati</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalTeams}</Text>
              <Text style={styles.statLabel}>Team Registrati</Text>
            </View>
          </View>
        </View>

        {/* Tournaments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tornei</Text>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
              onPress={() => setFilter('all')}
            >
              <Text style={[
                styles.filterButtonText,
                filter === 'all' && styles.filterButtonTextActive
              ]}>
                Tutti ({allTournaments.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
              onPress={() => setFilter('active')}
            >
              <Text style={[
                styles.filterButtonText,
                filter === 'active' && styles.filterButtonTextActive
              ]}>
                Attivi ({activeCount})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, filter === 'past' && styles.filterButtonActive]}
              onPress={() => setFilter('past')}
            >
              <Text style={[
                styles.filterButtonText,
                filter === 'past' && styles.filterButtonTextActive
              ]}>
                Passati ({completedCount})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tournament List */}
          {filteredTournaments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nessun torneo trovato</Text>
            </View>
          ) : (
            <View style={styles.tournamentList}>
              {filteredTournaments.map((tournament, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={styles.tournamentCard}
                    onPress={() => router.push(`/tournament-detail?id=${tournament.id}`)}
                    activeOpacity={0.8}
                  >
                    <View style={[
                      styles.tournamentSportBackground,
                      { backgroundColor: `${sportData.color}20` }
                    ]}>
                      <Text style={styles.tournamentSportEmoji}>{sportData.emoji}</Text>
                    </View>

                    <View style={styles.tournamentContent}>
                      <Text style={styles.tournamentName} numberOfLines={2}>
                        {tournament.name}
                      </Text>

                      {tournament.isOfficial && tournament.championshipInfo && (
                        <View style={styles.championshipInfo}>
                          <Text style={styles.championshipText}>
                            {tournament.championshipInfo.season} • {tournament.championshipInfo.division}
                            {tournament.championshipInfo.group && ` • ${tournament.championshipInfo.group}`}
                          </Text>
                        </View>
                      )}

                      <View style={styles.tournamentInfo}>
                        <View style={styles.tournamentInfoRow}>
                          <IconSymbol
                            ios_icon_name="location.fill"
                            android_material_icon_name="location-on"
                            size={14}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.tournamentInfoText} numberOfLines={1}>
                            {tournament.location.city}
                          </Text>
                        </View>

                        <View style={styles.tournamentInfoRow}>
                          <IconSymbol
                            ios_icon_name="calendar"
                            android_material_icon_name="event"
                            size={14}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.tournamentInfoText}>
                            {formatDate(tournament.startDate)}
                          </Text>
                        </View>

                        <View style={styles.tournamentInfoRow}>
                          <IconSymbol
                            ios_icon_name="person.2.fill"
                            android_material_icon_name="groups"
                            size={14}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.tournamentInfoText}>
                            {tournament.currentTeams}/{tournament.maxTeams}
                          </Text>
                        </View>
                      </View>

                      <View style={[
                        styles.tournamentStatusBadge,
                        { backgroundColor: getStatusColor(tournament.status) }
                      ]}>
                        <Text style={styles.tournamentStatusText}>
                          {getStatusLabel(tournament.status)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        {/* Footer with Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleWebsite}
            activeOpacity={0.8}
          >
            <IconSymbol
              ios_icon_name="globe"
              android_material_icon_name="language"
              size={24}
              color={colors.card}
            />
            <Text style={styles.footerButtonText}>🌐 Visita Sito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerButton, styles.footerButtonSecondary]}
            onPress={handleEmail}
            activeOpacity={0.8}
          >
            <IconSymbol
              ios_icon_name="envelope.fill"
              android_material_icon_name="email"
              size={24}
              color={colors.card}
            />
            <Text style={styles.footerButtonText}>📧 Contatta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  header: {
    height: 400,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.3)',
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.card,
  },
  logo: {
    width: 100,
    height: 100,
  },
  organizerName: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  organizerAcronym: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  officialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeEmoji: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
  },
  sportBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmoji: {
    fontSize: 28,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.card,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tournamentList: {
    gap: 16,
  },
  tournamentCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tournamentSportBackground: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tournamentSportEmoji: {
    fontSize: 56,
  },
  tournamentContent: {
    padding: 16,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  championshipInfo: {
    marginBottom: 8,
  },
  championshipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  tournamentInfo: {
    gap: 6,
    marginBottom: 12,
  },
  tournamentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tournamentInfoText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  tournamentStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tournamentStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    boxShadow: '0px 4px 12px rgba(255, 87, 34, 0.3)',
    elevation: 4,
  },
  footerButtonSecondary: {
    backgroundColor: colors.secondary,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
  },
});
