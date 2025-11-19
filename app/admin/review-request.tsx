
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, TextInput, Modal } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { getVerificationRequestById } from '@/data/verificationRequestsMockData';
import { IconSymbol } from '@/components/IconSymbol';
import PermissionSelector from '@/components/PermissionSelector';
import { PermissionPreset, PermissionsType, getPermissionPreset, countEnabledPermissions } from '@/types/permissions';

export default function ReviewRequest() {
  const { id, action } = useLocalSearchParams<{ id: string; action?: string }>();
  const [showRejectModal, setShowRejectModal] = useState(action === 'reject');
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<PermissionPreset>('base');
  const [customPermissions, setCustomPermissions] = useState<PermissionsType>(
    getPermissionPreset('custom')!.permissions
  );

  const request = getVerificationRequestById(id);

  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Richiesta non trovata</Text>
      </View>
    );
  }

  const handleApprove = () => {
    const permissions = selectedPreset === 'custom' 
      ? customPermissions 
      : getPermissionPreset(selectedPreset)!.permissions;
    
    const permissionsCount = countEnabledPermissions(permissions);
    const presetName = getPermissionPreset(selectedPreset)!.name;

    Alert.alert(
      'Approva Richiesta',
      `Vuoi approvare la richiesta di ${request.userName}?\n\nL'utente riceverà:\n• Account verificato\n• Ruolo: ${request.organizerRole}\n• Preset: ${presetName}\n• ${permissionsCount} permessi attivi`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Approva',
          style: 'default',
          onPress: () => {
            console.log('Approved request:', request.id);
            console.log('User will be updated:', {
              role: 'verified',
              organizerId: request.organizerId,
              organizerRole: request.organizerRole,
              permissionsPreset: selectedPreset,
              permissions: permissions,
              canCreateOfficialTournaments: true,
            });
            
            Alert.alert(
              '✅ Approvato',
              'La richiesta è stata approvata. L\'utente ha ricevuto una notifica con i dettagli dei permessi.',
              [
                {
                  text: 'OK',
                  onPress: () => router.back(),
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleReject = () => {
    if (rejectionReason.trim().length < 20) {
      Alert.alert('Attenzione', 'Il motivo del rifiuto deve essere di almeno 20 caratteri');
      return;
    }

    console.log('Rejected request:', request.id);
    console.log('Rejection reason:', rejectionReason);

    Alert.alert(
      '❌ Rifiutato',
      'La richiesta è stata rifiutata. L\'utente ha ricevuto una notifica con il motivo.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowRejectModal(false);
            router.back();
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
        <Text style={styles.headerTitle}>Revisione Richiesta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* User Profile Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Richiedente</Text>
          <View style={styles.userCard}>
            {request.userPhotoURL ? (
              <Image source={{ uri: request.userPhotoURL }} style={styles.userAvatar} />
            ) : (
              <View style={[styles.userAvatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{request.userName.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{request.userName}</Text>
              <Text style={styles.userEmail}>{request.userEmail}</Text>
            </View>
          </View>
        </View>

        {/* Organizer Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏢 Organizzatore</Text>
          <View style={styles.organizerCard}>
            <Image source={{ uri: request.organizerLogo }} style={styles.organizerLogo} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{request.organizerName}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{request.organizerRole}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Documenti</Text>
          
          <View style={styles.documentCard}>
            <Text style={styles.documentLabel}>Documento d&apos;Identità</Text>
            <Image source={{ uri: request.documents.idCard }} style={styles.documentImage} />
          </View>

          <View style={styles.documentCard}>
            <Text style={styles.documentLabel}>Lettera di Delega</Text>
            <Image source={{ uri: request.documents.delegationLetter }} style={styles.documentImage} />
          </View>
        </View>

        {/* Motivation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Motivazione</Text>
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>{request.motivation}</Text>
          </View>
        </View>

        {/* Timestamp */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Data Richiesta</Text>
          <Text style={styles.timestampText}>
            {new Date(request.createdAt).toLocaleDateString('it-IT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        {/* Permission Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Configurazione Permessi</Text>
          <Text style={styles.sectionDescription}>
            Seleziona i permessi da assegnare a questo delegato
          </Text>
          <PermissionSelector
            selectedPreset={selectedPreset}
            customPermissions={customPermissions}
            onPresetChange={setSelectedPreset}
            onCustomPermissionsChange={setCustomPermissions}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.approveButton}
          onPress={handleApprove}
        >
          <Text style={styles.approveButtonText}>✅ Approva</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => setShowRejectModal(true)}
        >
          <Text style={styles.rejectButtonText}>❌ Rifiuta</Text>
        </TouchableOpacity>
      </View>

      {/* Reject Modal */}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRejectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Motivo del Rifiuto</Text>
              <TouchableOpacity onPress={() => setShowRejectModal(false)}>
                <IconSymbol ios_icon_name="xmark" android_material_icon_name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Spiega all&apos;utente perché la richiesta è stata rifiutata. Questo messaggio verrà inviato come notifica.
            </Text>

            <TextInput
              style={styles.modalTextArea}
              placeholder="Es: La documentazione fornita non è sufficiente..."
              placeholderTextColor={colors.textSecondary}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
              numberOfLines={6}
              maxLength={500}
            />

            <Text style={styles.characterCount}>
              {rejectionReason.length}/500 caratteri (minimo 20)
            </Text>

            <TouchableOpacity
              style={[
                styles.modalSubmitButton,
                rejectionReason.trim().length < 20 && styles.modalSubmitButtonDisabled
              ]}
              onPress={handleReject}
              disabled={rejectionReason.trim().length < 20}
            >
              <Text style={styles.modalSubmitButtonText}>Conferma Rifiuto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  userAvatar: {
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  organizerCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  organizerLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  documentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  documentLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  documentImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  motivationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  timestampText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.calcio,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  approveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: colors.live,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  modalDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalTextArea: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: 16,
  },
  modalSubmitButton: {
    backgroundColor: colors.live,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  modalSubmitButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
