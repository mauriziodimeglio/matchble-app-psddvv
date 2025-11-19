
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockMatches } from '@/data/mockData';
import { sportIcons } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';
import AppHeader from '@/components/AppHeader';

export default function MatchDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const match = mockMatches.find(m => m.id === id);

  if (!match) {
    return (
      <View style={commonStyles.container}>
        <AppHeader />
        <Text style={commonStyles.text}>Match non trovato</Text>
      </View>
    );
  }

  const sportData = sportIcons[match.sport];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${match.homeTeam.name} ${match.homeTeam.score ?? 0} - ${match.awayTeam.score ?? 0} ${match.awayTeam.name}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

        <View style={styles.heroSection}>
          <View style={[
            styles.sportBadge,
            { backgroundColor: `${sportData.color}30` }
          ]}>
            <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
          </View>

          {match.status === 'live' && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}

          <View style={styles.scoreSection}>
            <View style={styles.teamSection}>
              <Text style={styles.teamName}>{match.homeTeam.name}</Text>
              <Text style={styles.scoreGiant}>{match.homeTeam.score ?? 0}</Text>
            </View>

            <Text style={styles.scoreSeparator}>-</Text>

            <View style={styles.teamSection}>
              <Text style={styles.teamName}>{match.awayTeam.name}</Text>
              <Text style={styles.scoreGiant}>{match.awayTeam.score ?? 0}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="location.fill"
              android_material_icon_name="location-on"
              size={28}
              color={colors.primary}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Luogo</Text>
              <Text style={styles.infoValue}>{match.location.venue}</Text>
              <Text style={styles.infoSubvalue}>{match.location.city}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <IconSymbol
              ios_icon_name="calendar"
              android_material_icon_name="event"
              size={28}
              color={colors.secondary}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Data e Ora</Text>
              <Text style={styles.infoValue}>
                {formatDateTime(match.datetime.scheduled)}
              </Text>
            </View>
          </View>

          {match.tournament && (
            <View style={styles.infoCard}>
              <IconSymbol
                ios_icon_name="trophy.fill"
                android_material_icon_name="emoji-events"
                size={28}
                color={colors.accent}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Torneo</Text>
                <Text style={styles.infoValue}>{match.tournament.name}</Text>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <IconSymbol
            ios_icon_name="square.and.arrow.up"
            android_material_icon_name="share"
            size={24}
            color={colors.card}
          />
          <Text style={styles.shareButtonText}>Condividi Risultato</Text>
        </TouchableOpacity>
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
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 24,
    marginBottom: 24,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
  sportBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sportEmoji: {
    fontSize: 48,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  liveText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  teamSection: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  scoreGiant: {
    fontSize: 96,
    fontWeight: '900',
    color: colors.primary,
    lineHeight: 96,
  },
  scoreSeparator: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  infoSection: {
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    gap: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  infoSubvalue: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    boxShadow: '0px 4px 12px rgba(255, 87, 34, 0.3)',
    elevation: 4,
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
});
