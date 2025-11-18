
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Match } from '@/types';
import { sportIcons } from '@/data/mockData';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface MatchCardProps {
  match: Match;
  isLarge?: boolean;
}

export default function MatchCard({ match, isLarge = false }: MatchCardProps) {
  const router = useRouter();
  const sportData = sportIcons[match.sport];

  const handlePress = () => {
    router.push(`/match-detail?id=${match.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  if (isLarge && match.status === 'live') {
    return (
      <TouchableOpacity 
        style={styles.liveCard}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        
        <View style={styles.sportIconCorner}>
          <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
        </View>

        <View style={styles.liveScoreContainer}>
          <View style={styles.teamContainer}>
            <Text style={styles.teamNameLarge} numberOfLines={1}>
              {match.homeTeam.name}
            </Text>
            <Text style={styles.scoreLarge}>{match.homeTeam.score ?? 0}</Text>
          </View>
          
          <Text style={styles.scoreSeparator}>-</Text>
          
          <View style={styles.teamContainer}>
            <Text style={styles.teamNameLarge} numberOfLines={1}>
              {match.awayTeam.name}
            </Text>
            <Text style={styles.scoreLarge}>{match.awayTeam.score ?? 0}</Text>
          </View>
        </View>

        <View style={styles.liveInfo}>
          <IconSymbol 
            ios_icon_name="location.fill"
            android_material_icon_name="location-on"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={styles.infoText}>{match.location.city}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.sportEmojiSmall}>{sportData.emoji}</Text>
        {match.status === 'live' && (
          <View style={styles.liveBadgeSmall}>
            <View style={styles.liveDotSmall} />
            <Text style={styles.liveTextSmall}>LIVE</Text>
          </View>
        )}
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.team}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.homeTeam.name}
          </Text>
          <Text style={styles.score}>{match.homeTeam.score ?? '-'}</Text>
        </View>
        
        <Text style={styles.vs}>vs</Text>
        
        <View style={styles.team}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeam.name}
          </Text>
          <Text style={styles.score}>{match.awayTeam.score ?? '-'}</Text>
        </View>
      </View>

      <Text style={styles.date}>
        {formatDate(match.datetime.scheduled)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  liveCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 12,
    boxShadow: '0px 4px 16px rgba(244, 67, 54, 0.2)',
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.live,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
    marginRight: 6,
  },
  liveText: {
    color: colors.card,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sportIconCorner: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  sportEmoji: {
    fontSize: 32,
  },
  liveScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamNameLarge: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  scoreLarge: {
    fontSize: 72,
    fontWeight: '900',
    color: colors.primary,
  },
  scoreSeparator: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportEmojiSmall: {
    fontSize: 24,
  },
  liveBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.card,
    marginRight: 4,
  },
  liveTextSmall: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  score: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  vs: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
