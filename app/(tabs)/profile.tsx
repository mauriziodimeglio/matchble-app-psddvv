
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { sportIcons } from '@/data/mockData';

export default function ProfileScreen() {
  const isGuest = true;

  if (isGuest) {
    return (
      <View style={commonStyles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.guestContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.guestEmoji}>🏆</Text>
          <Text style={styles.guestTitle}>Benvenuto su Matchble!</Text>
          <Text style={styles.guestSubtitle}>
            Registrati per pubblicare risultati e creare tornei
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Pubblica risultati delle partite</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Crea e gestisci tornei</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Traccia le tue statistiche</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check-circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Connettiti con altri atleti</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[buttonStyles.primary, styles.registerButton]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Registrati</Text>
          </TouchableOpacity>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <IconSymbol
                ios_icon_name="apple.logo"
                android_material_icon_name="apple"
                size={24}
                color={colors.card}
              />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <IconSymbol
                ios_icon_name="person.fill"
                android_material_icon_name="person"
                size={48}
                color={colors.card}
              />
            </View>
          </View>
          <Text style={styles.name}>Marco Rossi</Text>
          <Text style={styles.location}>Milano, Lombardia</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="gamecontroller.fill"
              android_material_icon_name="sports-esports"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Partite</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="trophy.fill"
              android_material_icon_name="emoji-events"
              size={32}
              color={colors.secondary}
            />
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Vittorie</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="chart.bar.fill"
              android_material_icon_name="bar-chart"
              size={32}
              color={colors.accent}
            />
            <Text style={styles.statValue}>67%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I Miei Sport</Text>
          <View style={styles.sportsContainer}>
            {(['calcio', 'basket'] as const).map((sport, index) => {
              const sportData = sportIcons[sport];
              return (
                <React.Fragment key={index}>
                  <View style={[
                    styles.sportBadge,
                    { backgroundColor: `${sportData.color}20` }
                  ]}>
                    <Text style={styles.sportBadgeEmoji}>{sportData.emoji}</Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
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
  guestContent: {
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 120,
  },
  guestEmoji: {
    fontSize: 96,
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  guestSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresList: {
    width: '100%',
    marginBottom: 40,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  registerButton: {
    width: '100%',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.text,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.card,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.card,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  sportsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sportBadge: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportBadgeEmoji: {
    fontSize: 40,
  },
});
