
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { sportIcons } from '@/data/mockData';
import { mockFirestoreUsers } from '@/data/firestoreMockData';
import AppHeader from '@/components/AppHeader';

export default function ProfileScreen() {
  const isGuest = false;
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [showDemoSelector, setShowDemoSelector] = useState(false);
  const [selectedDemoUser, setSelectedDemoUser] = useState('user_001');
  
  // Get current demo user
  const currentUser = mockFirestoreUsers.find(u => u.uid === selectedDemoUser);
  const isSuperuser = currentUser?.role === 'superuser';
  const isVerified = currentUser?.role === 'verified';

  const demoUsers = [
    { id: 'user_001', name: 'Marco Rossi', role: 'Delegato Verificato', icon: '✅' },
    { id: 'user_002', name: 'Luca Bianchi', role: 'Delegato Verificato', icon: '✅' },
    { id: 'user_003', name: 'Giuseppe Verdi', role: 'Utente Regular', icon: '👤' },
    { id: 'user_superuser_001', name: 'Admin Matchble', role: 'Superuser', icon: '👑' },
  ];

  const RolesModal = () => (
    <Modal
      visible={showRolesModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowRolesModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowRolesModal(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ruoli Utente</Text>
          
          <View style={styles.roleCard}>
            <Text style={styles.roleEmoji}>👤</Text>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>Utente Regular</Text>
              <Text style={styles.roleDescription}>
                - Visualizza risultati e classifiche{'\n'}
                - Crea tornei non ufficiali{'\n'}
                - Pubblica risultati partite
              </Text>
            </View>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleEmoji}>✅</Text>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>Delegato Verificato</Text>
              <Text style={styles.roleDescription}>
                - Tutti i permessi di Utente Regular{'\n'}
                - Crea tornei ufficiali per organizzatori affiliati{'\n'}
                - Gestisce risultati e classifiche ufficiali{'\n'}
                - Può avere affiliazioni multiple
              </Text>
            </View>
          </View>

          <View style={styles.roleCard}>
            <Text style={styles.roleEmoji}>👑</Text>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>Superuser</Text>
              <Text style={styles.roleDescription}>
                - Controllo totale del sistema{'\n'}
                - Autorizza/revoca delegati verificati{'\n'}
                - Gestisce tutti gli organizzatori{'\n'}
                - Accesso dashboard amministrativa
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowRolesModal(false)}
          >
            <Text style={styles.modalCloseText}>Chiudi</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const DemoSelectorModal = () => (
    <Modal
      visible={showDemoSelector}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDemoSelector(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowDemoSelector(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleziona Profilo Demo</Text>
          <Text style={styles.modalSubtitle}>
            Cambia profilo per testare diverse funzionalità
          </Text>
          
          {demoUsers.map((user, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.demoUserCard,
                  selectedDemoUser === user.id && styles.demoUserCardActive
                ]}
                onPress={() => {
                  setSelectedDemoUser(user.id);
                  setShowDemoSelector(false);
                }}
              >
                <Text style={styles.demoUserEmoji}>{user.icon}</Text>
                <View style={styles.demoUserInfo}>
                  <Text style={styles.demoUserName}>{user.name}</Text>
                  <Text style={styles.demoUserRole}>{user.role}</Text>
                </View>
                {selectedDemoUser === user.id && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            </React.Fragment>
          ))}

          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowDemoSelector(false)}
          >
            <Text style={styles.modalCloseText}>Chiudi</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  if (isGuest) {
    return (
      <View style={commonStyles.container}>
        <AppHeader />
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
                android_material_icon_name="check_circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Pubblica risultati delle partite</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Crea e gestisci tornei</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Traccia le tue statistiche</Text>
            </View>
            <View style={styles.featureItem}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
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
      <AppHeader />
      <RolesModal />
      <DemoSelectorModal />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Demo Mode Banner */}
        <TouchableOpacity
          style={styles.demoBanner}
          onPress={() => setShowDemoSelector(true)}
        >
          <Text style={styles.demoBannerEmoji}>🎭</Text>
          <View style={styles.demoBannerContent}>
            <Text style={styles.demoBannerTitle}>Modalità Demo</Text>
            <Text style={styles.demoBannerSubtitle}>
              Profilo: {currentUser?.displayName} ({currentUser?.role === 'superuser' ? 'Superuser' : currentUser?.role === 'verified' ? 'Verificato' : 'Regular'})
            </Text>
          </View>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {currentUser?.photoURL ? (
              <Image source={{ uri: currentUser.photoURL }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <IconSymbol
                  ios_icon_name="person.fill"
                  android_material_icon_name="person"
                  size={48}
                  color={colors.card}
                />
              </View>
            )}
            {isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedEmoji}>✅</Text>
              </View>
            )}
            {isSuperuser && (
              <View style={styles.superuserBadge}>
                <Text style={styles.superuserEmoji}>👑</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{currentUser?.displayName || 'Marco Rossi'}</Text>
          <Text style={styles.location}>{currentUser?.favoriteCity || 'Milano'}, Lombardia</Text>
          
          {isVerified && currentUser?.organizerRole && (
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{currentUser.organizerRole}</Text>
            </View>
          )}
        </View>

        {/* Roles Info Button */}
        <View style={styles.infoSection}>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowRolesModal(true)}
          >
            <Text style={styles.infoButtonEmoji}>ℹ️</Text>
            <Text style={styles.infoButtonText}>Scopri i Ruoli Utente</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Superuser Dashboard Button */}
        {isSuperuser && (
          <View style={styles.adminSection}>
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => router.push('/admin/dashboard')}
            >
              <Text style={styles.adminButtonEmoji}>👑</Text>
              <Text style={styles.adminButtonText}>Dashboard Admin</Text>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Request Verification Button (for regular users) */}
        {!isVerified && !isSuperuser && (
          <View style={styles.verificationSection}>
            <TouchableOpacity
              style={styles.verificationButton}
              onPress={() => router.push('/profile/request-verification')}
            >
              <Text style={styles.verificationButtonEmoji}>✅</Text>
              <View style={styles.verificationButtonContent}>
                <Text style={styles.verificationButtonTitle}>Richiedi Account Verificato</Text>
                <Text style={styles.verificationButtonSubtitle}>
                  Crea tornei ufficiali e gestisci organizzazioni
                </Text>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron_right"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="gamecontroller.fill"
              android_material_icon_name="sports_esports"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.statValue}>{currentUser?.matchesSubmitted || 42}</Text>
            <Text style={styles.statLabel}>Partite</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="trophy.fill"
              android_material_icon_name="emoji_events"
              size={32}
              color={colors.secondary}
            />
            <Text style={styles.statValue}>{currentUser?.tournamentsCreated || 2}</Text>
            <Text style={styles.statLabel}>Tornei</Text>
          </View>

          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="chart.bar.fill"
              android_material_icon_name="bar_chart"
              size={32}
              color={colors.accent}
            />
            <Text style={styles.statValue}>{currentUser?.trustScore || 92}%</Text>
            <Text style={styles.statLabel}>Trust Score</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I Miei Sport</Text>
          <View style={styles.sportsContainer}>
            {(currentUser?.favoriteSports || ['calcio', 'basket']).map((sport, index) => {
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

        {/* Organizers Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => router.push('/organizers/')}
          >
            <View style={styles.menuButtonIcon}>
              <Text style={styles.menuButtonEmoji}>🏢</Text>
            </View>
            <Text style={styles.menuButtonText}>Organizzatori Sportivi</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
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
    paddingTop: 120,
    paddingBottom: 120,
  },
  guestContent: {
    paddingTop: 140,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 120,
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB74D',
  },
  demoBannerEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  demoBannerContent: {
    flex: 1,
  },
  demoBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  demoBannerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  infoButtonEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  infoButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  roleEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  demoUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  demoUserCardActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  demoUserEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  demoUserInfo: {
    flex: 1,
  },
  demoUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  demoUserRole: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.card,
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
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
    position: 'relative',
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
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.card,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.calcio,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  verifiedEmoji: {
    fontSize: 18,
  },
  superuserBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  superuserEmoji: {
    fontSize: 18,
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
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 8,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  adminSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  adminButton: {
    backgroundColor: '#FFD700',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(255, 215, 0, 0.3)',
    elevation: 4,
  },
  adminButtonEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  adminButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  verificationSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  verificationButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  verificationButtonEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  verificationButtonContent: {
    flex: 1,
  },
  verificationButtonTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  verificationButtonSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: 18,
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
  menuButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  menuButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuButtonEmoji: {
    fontSize: 24,
  },
  menuButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});
