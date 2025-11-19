
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockVerificationRequests, getPendingVerificationRequests } from '@/data/verificationRequestsMockData';
import { mockOrganizers } from '@/data/organizersMockData';
import { mockFirestoreUsers } from '@/data/firestoreMockData';
import { FirestoreVerificationRequest, FirestoreUser } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

type TabType = 'requests' | 'organizers' | 'users';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingRequests = getPendingVerificationRequests();
  const verifiedUsers = mockFirestoreUsers.filter(u => u.role === 'verified');

  const renderRequestCard = (request: FirestoreVerificationRequest) => (
    <View key={request.id} style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.userInfo}>
          {request.userPhotoURL ? (
            <Image source={{ uri: request.userPhotoURL }} style={styles.userAvatar} />
          ) : (
            <View style={[styles.userAvatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>{request.userName.charAt(0)}</Text>
            </View>
          )}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{request.userName}</Text>
            <Text style={styles.userEmail}>{request.userEmail}</Text>
          </View>
        </View>
      </View>

      <View style={styles.organizerSection}>
        <Image source={{ uri: request.organizerLogo }} style={styles.organizerLogo} />
        <View style={styles.organizerInfo}>
          <Text style={styles.organizerName}>{request.organizerName}</Text>
          <Text style={styles.organizerRole}>{request.organizerRole}</Text>
        </View>
      </View>

      <View style={styles.requestDate}>
        <Text style={styles.dateText}>
          📅 {new Date(request.createdAt).toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </View>

      <View style={styles.requestActions}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => router.push(`/admin/review-request?id=${request.id}`)}
        >
          <Text style={styles.detailsButtonText}>👁️ Dettagli</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleQuickApprove(request)}
        >
          <Text style={styles.approveButtonText}>✅ Approva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleQuickReject(request)}
        >
          <Text style={styles.rejectButtonText}>❌ Rifiuta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleQuickApprove = (request: FirestoreVerificationRequest) => {
    Alert.alert(
      'Approva Richiesta',
      `Vuoi approvare la richiesta di ${request.userName}?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Approva',
          onPress: () => {
            console.log('Approved request:', request.id);
            Alert.alert('✅ Approvato', 'La richiesta è stata approvata con successo');
          }
        }
      ]
    );
  };

  const handleQuickReject = (request: FirestoreVerificationRequest) => {
    router.push(`/admin/review-request?id=${request.id}&action=reject`);
  };

  const renderOrganizerCard = (organizer: any) => (
    <TouchableOpacity key={organizer.id} style={styles.organizerCard}>
      <Image source={{ uri: organizer.logo }} style={styles.orgCardLogo} />
      <View style={styles.orgCardInfo}>
        <Text style={styles.orgCardName}>{organizer.name}</Text>
        <Text style={styles.orgCardSport}>{organizer.sport.toUpperCase()}</Text>
        <Text style={styles.orgCardStats}>{organizer.totalTournaments} tornei</Text>
      </View>
      {organizer.official && (
        <View style={styles.officialBadge}>
          <Text style={styles.officialText}>🏆 Ufficiale</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderUserCard = (user: FirestoreUser) => {
    const matchesSearch = searchQuery === '' || 
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return null;

    return (
      <View key={user.uid} style={styles.userCard}>
        <View style={styles.userCardHeader}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.userCardAvatar} />
          ) : (
            <View style={[styles.userCardAvatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>{user.displayName.charAt(0)}</Text>
            </View>
          )}
          <View style={styles.userCardInfo}>
            <Text style={styles.userCardName}>{user.displayName}</Text>
            <Text style={styles.userCardRole}>
              {user.role === 'verified' ? '✅ Verificato' : '👤 Normale'}
            </Text>
            {user.organizerRole && (
              <Text style={styles.userCardOrganizer}>{user.organizerRole}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.revokeButton}
          onPress={() => handleRevokeVerification(user)}
        >
          <Text style={styles.revokeButtonText}>🔓 Revoca Verifica</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleRevokeVerification = (user: FirestoreUser) => {
    Alert.alert(
      'Revoca Verifica',
      `Vuoi revocare la verifica di ${user.displayName}?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Revoca',
          style: 'destructive',
          onPress: () => {
            console.log('Revoked verification for:', user.uid);
            Alert.alert('🔓 Revocato', 'La verifica è stata revocata');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard Admin</Text>
        <View style={styles.superuserBadge}>
          <Text style={styles.superuserText}>👑 Superuser</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.tabActive]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.tabTextActive]}>
            Richieste {pendingRequests.length > 0 && `(${pendingRequests.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'organizers' && styles.tabActive]}
          onPress={() => setActiveTab('organizers')}
        >
          <Text style={[styles.tabText, activeTab === 'organizers' && styles.tabTextActive]}>
            Organizzatori
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.tabActive]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={[styles.tabText, activeTab === 'users' && styles.tabTextActive]}>
            Utenti
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'requests' && (
          <View style={styles.tabContent}>
            {pendingRequests.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateEmoji}>✅</Text>
                <Text style={styles.emptyStateText}>Nessuna richiesta pendente</Text>
              </View>
            ) : (
              pendingRequests.map(renderRequestCard)
            )}
          </View>
        )}

        {activeTab === 'organizers' && (
          <View style={styles.tabContent}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>➕ Nuovo Organizzatore</Text>
            </TouchableOpacity>
            {mockOrganizers.map(renderOrganizerCard)}
          </View>
        )}

        {activeTab === 'users' && (
          <View style={styles.tabContent}>
            <View style={styles.searchContainer}>
              <IconSymbol ios_icon_name="magnifyingglass" android_material_icon_name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Cerca utenti..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            {verifiedUsers.map(renderUserCard)}
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
  superuserBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  superuserText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
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
    fontSize: 14,
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
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  requestHeader: {
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  organizerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  organizerLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  organizerRole: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  requestDate: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.calcio,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: colors.live,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  organizerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  orgCardLogo: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  orgCardInfo: {
    flex: 1,
  },
  orgCardName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  orgCardSport: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  orgCardStats: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  officialBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  officialText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userCardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userCardInfo: {
    flex: 1,
  },
  userCardName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  userCardRole: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.calcio,
    marginBottom: 2,
  },
  userCardOrganizer: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  revokeButton: {
    backgroundColor: colors.live,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  revokeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
