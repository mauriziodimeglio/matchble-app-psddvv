
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import AppHeader from '@/components/AppHeader';

export default function ProfileScreen() {
  const { user, isAuthenticated, isGuest, logout } = useAuth();
  const { favoriteTournaments, favoriteGroups, favoriteTeams } = useFavorites();

  if (!isAuthenticated || isGuest) {
    return (
      <View style={styles.container}>
        <AppHeader />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.guestState}>
            <Text style={styles.guestEmoji}>👤</Text>
            <Text style={styles.guestTitle}>Modalità Ospite</Text>
            <Text style={styles.guestText}>
              Accedi o registrati per accedere al tuo profilo, salvare preferenze e ricevere notifiche
            </Text>

            <View style={styles.guestButtons}>
              <TouchableOpacity
                style={styles.guestButtonPrimary}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.guestButtonPrimaryText}>Accedi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.guestButtonSecondary}
                onPress={() => router.push('/auth/register')}
              >
                <Text style={styles.guestButtonSecondaryText}>Registrati</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Vantaggi della Registrazione</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>⭐</Text>
                  <Text style={styles.benefitText}>Salva tornei e squadre preferiti</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🔔</Text>
                  <Text style={styles.benefitText}>Ricevi notifiche sui risultati</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>📊</Text>
                  <Text style={styles.benefitText}>Traccia le tue statistiche</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🏆</Text>
                  <Text style={styles.benefitText}>Crea e gestisci tornei</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const getUserQualificationLabel = () => {
    // This would come from user profile in real app
    return 'Atleta'; // or 'Genitore', 'Spettatore'
  };

  const getUserQualificationEmoji = () => {
    return '⚽'; // or '👨‍👩‍👧', '👀'
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'regular': return 'Utente';
      case 'verified': return 'Delegato Verificato';
      case 'club_manager': return 'Manager Società';
      case 'superuser': return 'Amministratore';
      default: return 'Utente';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'verified': return colors.secondary;
      case 'club_manager': return colors.primary;
      case 'superuser': return colors.live;
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
            )}
            <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
              <Text style={styles.roleBadgeText}>{getRoleLabel(user.role)}</Text>
            </View>
          </View>

          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <View style={styles.qualificationBadge}>
            <Text style={styles.qualificationEmoji}>{getUserQualificationEmoji()}</Text>
            <Text style={styles.qualificationText}>{getUserQualificationLabel()}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.matchesSubmitted}</Text>
            <Text style={styles.statLabel}>Partite</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.tournamentsCreated}</Text>
            <Text style={styles.statLabel}>Tornei</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user.trustScore}</Text>
            <Text style={styles.statLabel}>Trust Score</Text>
          </View>
        </View>

        {/* Favorites Summary */}
        <View style={styles.favoritesSection}>
          <Text style={styles.sectionTitle}>I Tuoi Preferiti</Text>
          <View style={styles.favoritesGrid}>
            <TouchableOpacity
              style={styles.favoriteCard}
              onPress={() => router.push('/(tabs)/favorites')}
            >
              <Text style={styles.favoriteEmoji}>🏆</Text>
              <Text style={styles.favoriteValue}>{favoriteTournaments.length}</Text>
              <Text style={styles.favoriteLabel}>Tornei</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteCard}
              onPress={() => router.push('/(tabs)/favorites')}
            >
              <Text style={styles.favoriteEmoji}>📊</Text>
              <Text style={styles.favoriteValue}>{favoriteGroups.length}</Text>
              <Text style={styles.favoriteLabel}>Gironi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteCard}
              onPress={() => router.push('/(tabs)/favorites')}
            >
              <Text style={styles.favoriteEmoji}>⚽</Text>
              <Text style={styles.favoriteValue}>{favoriteTeams.length}</Text>
              <Text style={styles.favoriteLabel}>Squadre</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferred Sports */}
        {user.favoriteSports && user.favoriteSports.length > 0 && (
          <View style={styles.sportsSection}>
            <Text style={styles.sectionTitle}>Sport Preferiti</Text>
            <View style={styles.sportsGrid}>
              {user.favoriteSports.map((sport, index) => (
                <React.Fragment key={index}>
                  <View style={styles.sportChip}>
                    <Text style={styles.sportChipEmoji}>
                      {sport === 'calcio' ? '⚽' :
                       sport === 'basket' ? '🏀' :
                       sport === 'volley' ? '🏐' : '🎾'}
                    </Text>
                    <Text style={styles.sportChipText}>
                      {sport === 'calcio' ? 'Calcio' :
                       sport === 'basket' ? 'Basket' :
                       sport === 'volley' ? 'Volley' : 'Padel'}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/notifications')}
          >
            <View style={styles.menuIcon}>
              <IconSymbol
                ios_icon_name="bell.fill"
                android_material_icon_name="notifications"
                size={24}
                color={colors.primary}
              />
            </View>
            <Text style={styles.menuText}>Notifiche</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/favorites')}
          >
            <View style={styles.menuIcon}>
              <IconSymbol
                ios_icon_name="heart.fill"
                android_material_icon_name="favorite"
                size={24}
                color={colors.live}
              />
            </View>
            <Text style={styles.menuText}>Preferiti</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/language')}
          >
            <View style={styles.menuIcon}>
              <IconSymbol
                ios_icon_name="globe"
                android_material_icon_name="language"
                size={24}
                color={colors.secondary}
              />
            </View>
            <Text style={styles.menuText}>Lingua</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          {user.role === 'club_manager' && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/club/dashboard')}
            >
              <View style={styles.menuIcon}>
                <IconSymbol
                  ios_icon_name="building.2.fill"
                  android_material_icon_name="business"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.menuText}>Gestione Società</Text>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}

          {(user.role === 'verified' || user.role === 'superuser') && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/delegate/dashboard')}
            >
              <View style={styles.menuIcon}>
                <IconSymbol
                  ios_icon_name="checkmark.seal.fill"
                  android_material_icon_name="verified"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.menuText}>Dashboard Delegato</Text>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}

          {user.role === 'superuser' && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/admin/dashboard')}
            >
              <View style={styles.menuIcon}>
                <IconSymbol
                  ios_icon_name="shield.fill"
                  android_material_icon_name="admin_panel_settings"
                  size={24}
                  color={colors.live}
                />
              </View>
              <Text style={styles.menuText}>Admin Dashboard</Text>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <IconSymbol
            ios_icon_name="arrow.right.square.fill"
            android_material_icon_name="logout"
            size={20}
            color={colors.live}
          />
          <Text style={styles.logoutButtonText}>Esci</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 120,
    paddingBottom: 100,
    paddingHorizontal: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.card,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.card,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.card,
  },
  roleBadge: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    ...shadows.md,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.card,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  qualificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
    ...shadows.sm,
  },
  qualificationEmoji: {
    fontSize: 20,
  },
  qualificationText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  favoritesSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.md,
  },
  favoritesGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  favoriteCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  favoriteEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  favoriteValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  favoriteLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sportsSection: {
    marginBottom: spacing.xl,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
    ...shadows.sm,
  },
  sportChipEmoji: {
    fontSize: 18,
  },
  sportChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  menuSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.live,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.live,
  },
  guestState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  guestEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  guestText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  guestButtons: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  guestButtonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  guestButtonPrimaryText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.card,
  },
  guestButtonSecondary: {
    backgroundColor: colors.card,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  guestButtonSecondaryText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  benefitsSection: {
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  benefitsList: {
    gap: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.sm,
  },
  benefitEmoji: {
    fontSize: 28,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
