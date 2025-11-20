
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Match } from '@/types';
import { sportIcons } from '@/data/mockData';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface MatchCardProps {
  match: Match;
  isLarge?: boolean;
}

export function MatchCard({ match, isLarge = false }: MatchCardProps) {
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
        style={[styles.liveCard, { borderColor: sportData.color }]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.liveHeader}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          
          <View style={[styles.sportBadge, { backgroundColor: `${sportData.color}20` }]}>
            <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
          </View>
        </View>

        <View style={styles.liveScoreContainer}>
          <View style={styles.teamContainer}>
            <Text style={styles.teamNameLarge} numberOfLines={1}>
              {match.homeTeam.name}
            </Text>
            <Text style={[styles.scoreLarge, { color: sportData.color }]}>
              {match.homeTeam.score ?? 0}
            </Text>
          </View>
          
          <Text style={styles.scoreSeparator}>-</Text>
          
          <View style={styles.teamContainer}>
            <Text style={styles.teamNameLarge} numberOfLines={1}>
              {match.awayTeam.name}
            </Text>
            <Text style={[styles.scoreLarge, { color: sportData.color }]}>
              {match.awayTeam.score ?? 0}
            </Text>
          </View>
        </View>

        <View style={styles.liveInfo}>
          <IconSymbol 
            ios_icon_name="location.fill"
            android_material_icon_name="location_on"
            size={14}
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
        <View style={[styles.sportBadgeSmall, { backgroundColor: `${sportData.color}20` }]}>
          <Text style={styles.sportEmojiSmall}>{sportData.emoji}</Text>
        </View>
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
          <Text style={[styles.score, { color: sportData.color }]}>
            {match.homeTeam.score ?? '-'}
          </Text>
        </View>
        
        <Text style={styles.vs}>vs</Text>
        
        <View style={styles.team}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeam.name}
          </Text>
          <Text style={[styles.score, { color: sportData.color }]}>
            {match.awayTeam.score ?? '-'}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <IconSymbol 
          ios_icon_name="calendar"
          android_material_icon_name="event"
          size={12}
          color={colors.textSecondary}
        />
        <Text style={styles.date}>
          {formatDate(match.datetime.scheduled)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  liveCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    ...shadows.lg,
    borderWidth: 2,
  },
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.card,
    marginRight: spacing.xs,
  },
  liveText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  sportBadge: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmoji: {
    fontSize: 24,
  },
  liveScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamNameLarge: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  scoreLarge: {
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 56,
  },
  scoreSeparator: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sportBadgeSmall: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmojiSmall: {
    fontSize: 18,
  },
  liveBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  liveDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.card,
    marginRight: spacing.xs,
  },
  liveTextSmall: {
    color: colors.card,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 28,
  },
  vs: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  date: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
