
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Gender } from '@/types';

type TabType = 'overview' | 'teams' | 'athletes' | 'planning' | 'venues';

interface ClubTeam {
  id: string;
  name: string;
  sport: string;
  gender: Gender;
  players: number;
  tournaments: number;
  wins: number;
  losses: number;
}

export default function ClubManagerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const clubInfo = {
    name: 'Polisportiva Milano',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200',
    city: 'Milano',
    foundedYear: 1985,
    motto: 'Insieme verso la vittoria!',
    totalTeams: 8,
    totalPlayers: 156,
    activeTournaments: 5,
    totalVenues: 3,
  };

  const teams: ClubTeam[] = [
    {
      id: 'team_001',
      name: 'Milano Calcio Maschile',
      sport: 'calcio',
      gender: 'male',
      players: 22,
      tournaments: 2,
      wins: 12,
      losses: 3
    },
    {
      id: 'team_002',
      name: 'Milano Calcio Femminile',
      sport: 'calcio',
      gender: 'female',
      players: 18,
      tournaments: 1,
      wins: 8,
      losses: 2
    },
    {
      id: 'team_003',
      name: 'Milano Basket Maschile',
      sport: 'basket',
      gender: 'male',
      players: 12,
      tournaments: 1,
      wins: 15,
      losses: 5
    },
    {
      id: 'team_004',
      name: 'Milano Volley Femminile',
      sport: 'volley',
      gender: 'female',
      players: 14,
      tournaments: 1,
      wins: 10,
      losses: 4
    }
  ];

  const getGenderBadge = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return { emoji: '♂️', label: 'Maschile', color: '#2196F3' };
      case 'female':
        return { emoji: '♀️', label: 'Femminile', color: '#E91E63' };
      case 'mixed':
        return { emoji: '⚧️', label: 'Misto', color: '#9C27B0' };
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.clubHeader}>
        <Image source={{ uri: clubInfo.logo }} style={styles.clubLogo} />
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{clubInfo.name}</Text>
          <Text style={styles.clubLocation}>📍 {clubInfo.city}</Text>
          <Text style={styles.clubFounded}>Fondato nel {clubInfo.foundedYear}</Text>
          {clubInfo.motto && (
            <Text style={styles.clubMotto}>"{clubInfo.motto}"</Text>
          )}
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={styles.statValue}>{clubInfo.totalTeams}</Text>
          <Text style={styles.statLabel}>Squadre</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⚽</Text>
          <Text style={styles.statValue}>{clubInfo.totalPlayers}</Text>
          <Text style={styles.statLabel}>Atleti</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statValue}>{clubInfo.activeTournaments}</Text>
          <Text style={styles.statLabel}>Tornei Attivi</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏟️</Text>
          <Text style={styles.statValue}>{clubInfo.totalVenues}</Text>
          <Text style={styles.statLabel}>Impianti</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>⚡ Azioni Rapide</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/club/athletes')}
        >
          <Text style={styles.actionEmoji}>👤</Text>
          <Text style={styles.actionText}>Gestisci Atleti</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/club/planning')}
        >
          <Text style={styles.actionEmoji}>📅</Text>
          <Text style={styles.actionText}>Planning Attività</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Aggiungi Squadra', 'Funzionalità in arrivo')}
        >
          <Text style={styles.actionEmoji}>➕</Text>
          <Text style={styles.actionText}>Aggiungi Squadra</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/venue/register')}
        >
          <Text style={styles.actionEmoji}>🏟️</Text>
          <Text style={styles.actionText}>Registra Campo</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Carica Partite', 'Funzionalità in arrivo')}
        >
          <Text style={styles.actionEmoji}>📤</Text>
          <Text style={styles.actionText}>Carica Partite Società</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTeams = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>👥 Le Tue Squadre</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Aggiungi Squadra', 'Funzionalità in arrivo')}
        >
          <IconSymbol
            ios_icon_name="plus.circle.fill"
            android_material_icon_name="add_circle"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {teams.map((team, index) => {
        const genderBadge = getGenderBadge(team.gender);
        return (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.teamCard}
              onPress={() => Alert.alert(team.name, 'Dettagli squadra in arrivo')}
            >
              <View style={styles.teamHeader}>
                <Text style={styles.teamName}>{team.name}</Text>
                <View style={[styles.genderBadge, { backgroundColor: genderBadge.color }]}>
                  <Text style={styles.genderBadgeText}>
                    {genderBadge.emoji} {genderBadge.label}
                  </Text>
                </View>
              </View>

              <View style={styles.teamStats}>
                <View style={styles.teamStat}>
                  <Text style={styles.teamStatLabel}>Sport</Text>
                  <Text style={styles.teamStatValue}>{team.sport.toUpperCase()}</Text>
                </View>
                <View style={styles.teamStat}>
                  <Text style={styles.teamStatLabel}>Atleti</Text>
                  <Text style={styles.teamStatValue}>{team.players}</Text>
                </View>
                <View style={styles.teamStat}>
                  <Text style={styles.teamStatLabel}>Tornei</Text>
                  <Text style={styles.teamStatValue}>{team.tournaments}</Text>
                </View>
                <View style={styles.teamStat}>
                  <Text style={styles.teamStatLabel}>V/S</Text>
                  <Text style={styles.teamStatValue}>{team.wins}/{team.losses}</Text>
                </View>
              </View>

              <View style={styles.teamActions}>
                <TouchableOpacity style={styles.teamActionButton}>
                  <Text style={styles.teamActionText}>👥 Gestisci</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.teamActionButton}>
                  <Text style={styles.teamActionText}>🏆 Tornei</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.teamActionButton}>
                  <Text style={styles.teamActionText}>📊 Statistiche</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestione Società</Text>
        <View style={styles.managerBadge}>
          <Text style={styles.managerText}>🏢</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            Panoramica
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'teams' && styles.tabActive]}
          onPress={() => setActiveTab('teams')}
        >
          <Text style={[styles.tabText, activeTab === 'teams' && styles.tabTextActive]}>
            Squadre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'athletes' && styles.tabActive]}
          onPress={() => {
            setActiveTab('athletes');
            router.push('/club/athletes');
          }}
        >
          <Text style={[styles.tabText, activeTab === 'athletes' && styles.tabTextActive]}>
            Atleti
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'planning' && styles.tabActive]}
          onPress={() => {
            setActiveTab('planning');
            router.push('/club/planning');
          }}
        >
          <Text style={[styles.tabText, activeTab === 'planning' && styles.tabTextActive]}>
            Planning
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'teams' && renderTeams()}
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
  managerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  managerText: {
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  tabContent: {
    gap: 20,
  },
  clubHeader: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  clubLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  clubLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  clubFounded: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  clubMotto: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.primary,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  actionButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  actionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    padding: 4,
  },
  teamCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  teamHeader: {
    marginBottom: 16,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  genderBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  genderBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  teamStats: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  teamStat: {
    flex: 1,
    alignItems: 'center',
  },
  teamStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  teamStatValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  teamActions: {
    flexDirection: 'row',
    gap: 8,
  },
  teamActionButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  teamActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
});
