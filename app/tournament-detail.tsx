
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockTournaments } from '@/data/mockData';
import { sportIcons } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

type TabType = 'standings' | 'matches' | 'teams' | 'info';

export default function TournamentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('standings');
  
  const tournament = mockTournaments.find(t => t.id === id);

  if (!tournament) {
    return (
      <View style={commonStyles.container}>
        <AppHeader />
        <Text style={commonStyles.text}>Torneo non trovato</Text>
      </View>
    );
  }

  const sportData = sportIcons[tournament.sport];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const mockStandings = [
    { position: 1, teamName: 'Team Alpha', played: 10, wins: 8, losses: 2, points: 24 },
    { position: 2, teamName: 'Team Beta', played: 10, wins: 7, losses: 3, points: 21 },
    { position: 3, teamName: 'Team Gamma', played: 10, wins: 6, losses: 4, points: 18 },
    { position: 4, teamName: 'Team Delta', played: 10, wins: 4, losses: 6, points: 12 },
    { position: 5, teamName: 'Team Epsilon', played: 10, wins: 2, losses: 8, points: 6 },
  ];

  const getPositionColor = (position: number) => {
    if (position === 1) return colors.gold;
    if (position === 2) return colors.silver;
    if (position === 3) return colors.bronze;
    return 'transparent';
  };

  return (
    <View style={commonStyles.container}>
      <AppHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <View style={[
          styles.header,
          { backgroundColor: `${sportData.color}20` }
        ]}>
          <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
          <Text style={styles.tournamentName}>{tournament.name}</Text>
          <View style={styles.headerInfo}>
            <View style={styles.headerInfoItem}>
              <IconSymbol
                ios_icon_name="location.fill"
                android_material_icon_name="location-on"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.headerInfoText}>{tournament.location.city}</Text>
            </View>
            <View style={styles.headerInfoItem}>
              <IconSymbol
                ios_icon_name="calendar"
                android_material_icon_name="event"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.headerInfoText}>
                {formatDate(tournament.dates.start)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'standings' && styles.tabActive]}
            onPress={() => setActiveTab('standings')}
          >
            <IconSymbol
              ios_icon_name="chart.bar.fill"
              android_material_icon_name="bar-chart"
              size={20}
              color={activeTab === 'standings' ? colors.primary : colors.textSecondary}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'standings' && styles.tabTextActive
            ]}>
              Classifica
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'matches' && styles.tabActive]}
            onPress={() => setActiveTab('matches')}
          >
            <IconSymbol
              ios_icon_name="sportscourt.fill"
              android_material_icon_name="sports-soccer"
              size={20}
              color={activeTab === 'matches' ? colors.primary : colors.textSecondary}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'matches' && styles.tabTextActive
            ]}>
              Partite
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'teams' && styles.tabActive]}
            onPress={() => setActiveTab('teams')}
          >
            <IconSymbol
              ios_icon_name="person.2.fill"
              android_material_icon_name="groups"
              size={20}
              color={activeTab === 'teams' ? colors.primary : colors.textSecondary}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'teams' && styles.tabTextActive
            ]}>
              Squadre
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.tabActive]}
            onPress={() => setActiveTab('info')}
          >
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={20}
              color={activeTab === 'info' ? colors.primary : colors.textSecondary}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'info' && styles.tabTextActive
            ]}>
              Info
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'standings' && (
          <View style={styles.content}>
            <View style={styles.standingsTable}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>#</Text>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Squadra</Text>
                <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>G</Text>
                <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>V</Text>
                <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>P</Text>
                <Text style={[styles.tableHeaderText, { flex: 0.7 }]}>Pt</Text>
              </View>

              {mockStandings.map((standing, index) => (
                <React.Fragment key={index}>
                  <View style={[
                    styles.tableRow,
                    { backgroundColor: getPositionColor(standing.position) !== 'transparent' 
                      ? `${getPositionColor(standing.position)}20` 
                      : colors.card 
                    }
                  ]}>
                    <View style={[
                      styles.positionBadge,
                      { backgroundColor: getPositionColor(standing.position) }
                    ]}>
                      <Text style={[
                        styles.positionText,
                        getPositionColor(standing.position) !== 'transparent' && { color: colors.card }
                      ]}>
                        {standing.position}
                      </Text>
                    </View>
                    <Text style={[styles.tableCell, { flex: 2, fontWeight: '700' }]}>
                      {standing.teamName}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 0.7 }]}>{standing.played}</Text>
                    <Text style={[styles.tableCell, { flex: 0.7 }]}>{standing.wins}</Text>
                    <Text style={[styles.tableCell, { flex: 0.7 }]}>{standing.losses}</Text>
                    <Text style={[styles.tableCell, { flex: 0.7, fontWeight: '800' }]}>
                      {standing.points}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'matches' && (
          <View style={styles.content}>
            <Text style={styles.emptyText}>Partite in arrivo...</Text>
          </View>
        )}

        {activeTab === 'teams' && (
          <View style={styles.content}>
            <Text style={styles.emptyText}>Squadre in arrivo...</Text>
          </View>
        )}

        {activeTab === 'info' && (
          <View style={styles.content}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Luogo</Text>
              <Text style={styles.infoValue}>{tournament.location.venue}</Text>
              <Text style={styles.infoSubvalue}>{tournament.location.city}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                {formatDate(tournament.dates.start)} - {formatDate(tournament.dates.end)}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Squadre</Text>
              <Text style={styles.infoValue}>
                {tournament.registeredTeams} / {tournament.maxTeams} iscritte
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Tipo</Text>
              <Text style={styles.infoValue}>
                {tournament.isPublic ? 'Pubblico' : 'Privato'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginHorizontal: 16,
    borderRadius: 24,
    marginBottom: 16,
  },
  sportEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  tournamentName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  headerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerInfoText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    gap: 6,
  },
  tabActive: {
    backgroundColor: `${colors.primary}15`,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
  },
  standingsTable: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  positionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flex: 0.5,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  tableCell: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 40,
  },
  infoCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  infoSubvalue: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
