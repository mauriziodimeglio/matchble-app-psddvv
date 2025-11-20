
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { Sport, Match, MatchStatus } from '@/types';
import { mockMatches } from '@/data/mockData';
import { SportFilter } from '@/components/SportFilter';
import { MatchCard } from '@/components/MatchCard';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { isGuest, user } = useAuth();
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showUserTypes, setShowUserTypes] = useState(isGuest);

  const filteredMatches = mockMatches.filter(
    (match) => selectedSport === 'all' || match.sport === selectedSport
  );

  const liveMatches = filteredMatches.filter((m) => m.status === 'live');
  const recentMatches = filteredMatches.filter((m) => m.status === 'finished');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const userTypes = [
    {
      id: 'guest',
      emoji: '👀',
      title: 'Utente Ospite',
      description: 'Visualizza risultati, inserisci partite, aggiungi foto e commenti',
      color: '#9E9E9E',
      features: ['Visualizza risultati', 'Inserisci partite', 'Aggiungi foto', 'Commenti'],
    },
    {
      id: 'regular',
      emoji: '⚽',
      title: 'Utente Registrato',
      description: 'Crea profilo atleta, video live, messaggistica, tornei non ufficiali',
      color: colors.primary,
      features: ['Profilo atleta', 'Video live', 'Messaggi', 'Tornei'],
    },
    {
      id: 'delegate',
      emoji: '✅',
      title: 'Delegato Verificato',
      description: 'Tornei ufficiali, caricamento massivo, gestione risultati',
      color: colors.calcio,
      features: ['Tornei ufficiali', 'Upload massivo', 'Verifica risultati', 'Analytics'],
    },
    {
      id: 'club_manager',
      emoji: '🏢',
      title: 'Manager Società',
      description: 'Gestione completa società, atleti, squadre, planning attività',
      color: colors.basket,
      features: ['Gestione società', 'Atleti', 'Planning', 'Impianti'],
    },
    {
      id: 'superuser',
      emoji: '👑',
      title: 'Superuser',
      description: 'Controllo totale sistema, approvazioni, permessi, admin panel',
      color: '#FFD700',
      features: ['Admin panel', 'Approvazioni', 'Permessi', 'Sistema'],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/assets/images/final_quest_240x240.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.logoText}>Matchble</Text>
            <Text style={styles.logoSubtext}>Per chi gioca</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/showcase')}
          >
            <IconSymbol
              ios_icon_name="person.3.fill"
              android_material_icon_name="groups"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
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
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {showUserTypes && (
          <View style={styles.userTypesSection}>
            <View style={styles.userTypesHeader}>
              <Text style={styles.userTypesTitle}>🎯 Scegli il Tuo Ruolo</Text>
              <TouchableOpacity onPress={() => setShowUserTypes(false)}>
                <IconSymbol
                  ios_icon_name="xmark.circle.fill"
                  android_material_icon_name="cancel"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.userTypesDescription}>
              Registrati per accedere a funzionalità avanzate. Ogni ruolo ha capacità specifiche:
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.userTypesScroll}>
              {userTypes.map((type, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[styles.userTypeCard, { borderColor: type.color }]}
                    onPress={() => router.push('/auth/register')}
                  >
                    <Text style={styles.userTypeEmoji}>{type.emoji}</Text>
                    <Text style={styles.userTypeTitle}>{type.title}</Text>
                    <Text style={styles.userTypeDescription}>{type.description}</Text>
                    
                    <View style={styles.userTypeFeatures}>
                      {type.features.map((feature, fIndex) => (
                        <React.Fragment key={fIndex}>
                          <View style={styles.featureItem}>
                            <Text style={styles.featureBullet}>•</Text>
                            <Text style={styles.featureText}>{feature}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>

                    <View style={[styles.userTypeButton, { backgroundColor: type.color }]}>
                      <Text style={styles.userTypeButtonText}>Scopri di più</Text>
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.registerButtonText}>Registrati Ora</Text>
              <IconSymbol
                ios_icon_name="arrow.right.circle.fill"
                android_material_icon_name="arrow_circle_right"
                size={24}
                color={colors.card}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.sportFilterSection}>
          <SportFilter selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        </View>

        {liveMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.sectionTitle}>In Corso</Text>
            </View>

            {liveMatches.map((match, index) => (
              <React.Fragment key={index}>
                <MatchCard match={match} />
              </React.Fragment>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Risultati Recenti</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/tournaments')}>
              <Text style={styles.seeAllText}>Vedi tutti</Text>
            </TouchableOpacity>
          </View>

          {recentMatches.slice(0, 5).map((match, index) => (
            <React.Fragment key={index}>
              <MatchCard match={match} />
            </React.Fragment>
          ))}
        </View>

        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>⚡ Accesso Rapido</Text>
          
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/venue/register')}
            >
              <Text style={styles.quickLinkEmoji}>🏟️</Text>
              <Text style={styles.quickLinkText}>Registra Campo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/showcase')}
            >
              <Text style={styles.quickLinkEmoji}>🌟</Text>
              <Text style={styles.quickLinkText}>Vetrina Atleti</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/club/dashboard')}
            >
              <Text style={styles.quickLinkEmoji}>🏢</Text>
              <Text style={styles.quickLinkText}>Gestione Società</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/delegate/dashboard')}
            >
              <Text style={styles.quickLinkEmoji}>✅</Text>
              <Text style={styles.quickLinkText}>Dashboard Delegato</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isGuest && (
          <View style={styles.guestPrompt}>
            <Text style={styles.guestPromptEmoji}>🎉</Text>
            <Text style={styles.guestPromptTitle}>Unisciti a Matchble!</Text>
            <Text style={styles.guestPromptText}>
              Registrati per accedere a tutte le funzionalità: profilo atleta, video live, messaggistica e molto altro!
            </Text>
            <TouchableOpacity
              style={styles.guestPromptButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.guestPromptButtonText}>Registrati Gratis</Text>
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
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  logoSubtext: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  userTypesSection: {
    backgroundColor: colors.card,
    padding: 20,
    marginBottom: 8,
  },
  userTypesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userTypesTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },
  userTypesDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  userTypesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userTypeCard: {
    width: 280,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    borderWidth: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  userTypeEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  userTypeTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  userTypeDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  userTypeFeatures: {
    gap: 8,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureBullet: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  userTypeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  userTypeButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.card,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.card,
  },
  sportFilterSection: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.card,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  quickLinksSection: {
    padding: 16,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  quickLinkCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  quickLinkEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  guestPrompt: {
    margin: 16,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  guestPromptEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  guestPromptTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.card,
    marginBottom: 12,
    textAlign: 'center',
  },
  guestPromptText: {
    fontSize: 16,
    color: colors.card,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  guestPromptButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  guestPromptButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
});
