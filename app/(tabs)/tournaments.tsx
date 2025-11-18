
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Sport } from '@/types';
import { mockTournaments } from '@/data/mockData';
import { sportIcons, sportLabels } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';

export default function TournamentsScreen() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const filteredTournaments = selectedSport
    ? mockTournaments.filter(t => t.sport === selectedSport)
    : mockTournaments;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
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
        <Text style={styles.title}>Tornei</Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedSport && styles.filterChipActive,
            ]}
            onPress={() => setSelectedSport(null)}
          >
            <Text style={[
              styles.filterChipText,
              !selectedSport && styles.filterChipTextActive,
            ]}>
              Tutti
            </Text>
          </TouchableOpacity>
          
          {(['calcio', 'basket', 'volley', 'padel'] as Sport[]).map((sport, index) => {
            const sportData = sportIcons[sport];
            const isSelected = selectedSport === sport;
            
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    isSelected && { 
                      backgroundColor: sportData.color,
                      borderColor: sportData.color,
                    },
                  ]}
                  onPress={() => setSelectedSport(sport)}
                >
                  <Text style={styles.filterEmoji}>{sportData.emoji}</Text>
                  <Text style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}>
                    {sportLabels[sport]}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </ScrollView>

        <View style={styles.grid}>
          {filteredTournaments.map((tournament, index) => {
            const sportData = sportIcons[tournament.sport];
            
            return (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.tournamentCard}
                  onPress={() => router.push(`/tournament-detail?id=${tournament.id}`)}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.sportBackground,
                    { backgroundColor: `${sportData.color}20` }
                  ]}>
                    <Text style={styles.sportEmojiLarge}>{sportData.emoji}</Text>
                  </View>

                  <View style={styles.tournamentContent}>
                    <Text style={styles.tournamentName} numberOfLines={2}>
                      {tournament.name}
                    </Text>

                    <View style={styles.tournamentInfo}>
                      <View style={styles.infoRow}>
                        <IconSymbol
                          ios_icon_name="location.fill"
                          android_material_icon_name="location-on"
                          size={14}
                          color={colors.textSecondary}
                        />
                        <Text style={styles.infoText} numberOfLines={1}>
                          {tournament.location.city}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <IconSymbol
                          ios_icon_name="calendar"
                          android_material_icon_name="event"
                          size={14}
                          color={colors.textSecondary}
                        />
                        <Text style={styles.infoText}>
                          {formatDate(tournament.dates.start)}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <IconSymbol
                          ios_icon_name="person.2.fill"
                          android_material_icon_name="groups"
                          size={14}
                          color={colors.textSecondary}
                        />
                        <Text style={styles.infoText}>
                          {tournament.registeredTeams}/{tournament.maxTeams}
                        </Text>
                      </View>
                    </View>

                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(tournament.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {getStatusLabel(tournament.status)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
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
    paddingTop: 48,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.background,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterChipTextActive: {
    color: colors.card,
  },
  grid: {
    paddingHorizontal: 16,
  },
  tournamentCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sportBackground: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmojiLarge: {
    fontSize: 64,
  },
  tournamentContent: {
    padding: 16,
  },
  tournamentName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  tournamentInfo: {
    gap: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
});
