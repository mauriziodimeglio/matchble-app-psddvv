
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FirestoreUser } from '@/types';
import { getTrustScoreBadge } from '@/utils/firestoreHelpers';
import { colors } from '@/styles/commonStyles';

interface UserProfileCardProps {
  user: FirestoreUser;
}

const sportLabels: Record<string, string> = {
  calcio: 'Calcio',
  basket: 'Basket',
  volley: 'Volley',
  padel: 'Padel'
};

export function UserProfileCard({ user }: UserProfileCardProps) {
  const trustBadge = getTrustScoreBadge(user.trustScore);

  return (
    <View style={styles.container}>
      {/* Header with Avatar */}
      <View style={styles.header}>
        {user.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>
              {user.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
          
          {/* Trust Score Badge */}
          <View style={[styles.trustBadge, { backgroundColor: trustBadge.color + '20' }]}>
            <Text style={styles.trustEmoji}>{trustBadge.emoji}</Text>
            <Text style={[styles.trustText, { color: trustBadge.color }]}>
              {trustBadge.label} ({user.trustScore})
            </Text>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Città Preferita</Text>
        <Text style={styles.sectionValue}>{user.favoriteCity}</Text>
      </View>

      {/* Favorite Sports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚽ Sport Preferiti</Text>
        <View style={styles.sportsContainer}>
          {user.favoriteSports.map((sport, index) => (
            <View key={index} style={styles.sportChip}>
              <Text style={styles.sportText}>{sportLabels[sport] || sport}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.matchesSubmitted}</Text>
          <Text style={styles.statLabel}>Partite</Text>
          <Text style={styles.statLabel}>Inserite</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.tournamentsCreated}</Text>
          <Text style={styles.statLabel}>Tornei</Text>
          <Text style={styles.statLabel}>Creati</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.tournamentsJoined}</Text>
          <Text style={styles.statLabel}>Tornei</Text>
          <Text style={styles.statLabel}>Partecipati</Text>
        </View>
      </View>

      {/* Verification Stats */}
      <View style={styles.verificationSection}>
        <View style={styles.verificationRow}>
          <Text style={styles.verificationLabel}>✅ Verificate:</Text>
          <Text style={[styles.verificationValue, { color: colors.calcio }]}>
            {user.verifiedMatches}
          </Text>
        </View>
        <View style={styles.verificationRow}>
          <Text style={styles.verificationLabel}>❌ Rifiutate:</Text>
          <Text style={[styles.verificationValue, { color: colors.live }]}>
            {user.rejectedMatches}
          </Text>
        </View>
      </View>

      {/* Last Active */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ultimo accesso: {new Date(user.lastActive).toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  trustEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  trustText: {
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sportChip: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sportText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  verificationSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  verificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  verificationValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
