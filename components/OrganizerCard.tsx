
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FirestoreOrganizer } from '@/types';
import { colors } from '@/styles/commonStyles';
import { sportIcons } from '@/data/mockData';
import VerificationBadge from './VerificationBadge';

interface OrganizerCardProps {
  organizer: FirestoreOrganizer;
  onPress?: () => void;
}

export default function OrganizerCard({ organizer, onPress }: OrganizerCardProps) {
  const sportData = sportIcons[organizer.sport];
  const backgroundColor = `${organizer.color}20`; // 20% opacity

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: organizer.logo }} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {organizer.official && (
          <View style={styles.officialBadge}>
            <Text style={styles.officialEmoji}>🏆</Text>
            <Text style={styles.officialText}>Ufficiale</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {organizer.name}
        </Text>
        <Text style={styles.acronym} numberOfLines={1}>
          {organizer.acronym}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.sportIcon}>
            <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
          </View>
          
          <View style={styles.scope}>
            <Text style={styles.scopeText}>
              {organizer.scope.level === 'national' ? '🇮🇹 Nazionale' : `📍 ${organizer.scope.region}`}
            </Text>
          </View>
        </View>

        {organizer.totalTournaments > 0 && (
          <View style={styles.stats}>
            <Text style={styles.statsText}>
              {organizer.totalTournaments} tornei
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  logo: {
    width: 64,
    height: 64,
  },
  officialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  officialEmoji: {
    fontSize: 12,
  },
  officialText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
  },
  content: {
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  acronym: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sportIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmoji: {
    fontSize: 20,
  },
  scope: {
    flex: 1,
    marginLeft: 8,
  },
  scopeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  stats: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  statsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
