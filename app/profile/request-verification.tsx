
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/styles/commonStyles';
import { mockOrganizers } from '@/data/organizersMockData';
import { FirestoreOrganizer } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

type Step = 1 | 2 | 3 | 4 | 5;

export default function RequestVerification() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedOrganizer, setSelectedOrganizer] = useState<FirestoreOrganizer | null>(null);
  const [role, setRole] = useState('');
  const [idCardUri, setIdCardUri] = useState<string | null>(null);
  const [delegationLetterUri, setDelegationLetterUri] = useState<string | null>(null);
  const [motivation, setMotivation] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const suggestedRoles = [
    'Arbitro',
    'Dirigente',
    'Responsabile Comunicazione',
    'Delegato Provinciale',
    'Delegato Regionale',
    'Istruttore',
  ];

  const pickImage = async (type: 'idCard' | 'delegationLetter') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      if (type === 'idCard') {
        setIdCardUri(result.assets[0].uri);
      } else {
        setDelegationLetterUri(result.assets[0].uri);
      }
    }
  };

  const takePhoto = async (type: 'idCard' | 'delegationLetter') => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permesso Negato', 'È necessario il permesso per accedere alla fotocamera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      if (type === 'idCard') {
        setIdCardUri(result.assets[0].uri);
      } else {
        setDelegationLetterUri(result.assets[0].uri);
      }
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedOrganizer) {
      Alert.alert('Attenzione', 'Seleziona un organizzatore');
      return;
    }
    if (currentStep === 2 && !role.trim()) {
      Alert.alert('Attenzione', 'Inserisci il tuo ruolo');
      return;
    }
    if (currentStep === 3 && (!idCardUri || !delegationLetterUri)) {
      Alert.alert('Attenzione', 'Carica entrambi i documenti richiesti');
      return;
    }
    if (currentStep === 4 && motivation.trim().length < 50) {
      Alert.alert('Attenzione', 'La motivazione deve essere di almeno 50 caratteri');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      Alert.alert('Attenzione', 'Devi accettare la dichiarazione di veridicità');
      return;
    }

    console.log('Submitting verification request:', {
      organizer: selectedOrganizer?.id,
      role,
      idCard: idCardUri,
      delegationLetter: delegationLetterUri,
      motivation,
    });

    Alert.alert(
      '✅ Richiesta Inviata',
      'La tua richiesta di verifica è stata inviata con successo. Riceverai una notifica quando verrà esaminata.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        }
      ]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressBar}>
      {[1, 2, 3, 4, 5].map((step) => (
        <View
          key={step}
          style={[
            styles.progressDot,
            step <= currentStep && styles.progressDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Seleziona Organizzatore</Text>
      <Text style={styles.stepDescription}>
        Scegli l&apos;organizzatore per cui lavori o che rappresenti
      </Text>

      <ScrollView style={styles.organizerList} contentContainerStyle={styles.organizerListContent}>
        {mockOrganizers.map((organizer) => (
          <TouchableOpacity
            key={organizer.id}
            style={[
              styles.organizerCard,
              selectedOrganizer?.id === organizer.id && styles.organizerCardSelected,
            ]}
            onPress={() => setSelectedOrganizer(organizer)}
          >
            <Image source={{ uri: organizer.logo }} style={styles.organizerLogo} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{organizer.name}</Text>
              <Text style={styles.organizerFullName}>{organizer.fullName}</Text>
              <Text style={styles.organizerScope}>
                {organizer.scope.level === 'national' ? '🇮🇹 Nazionale' : `📍 ${organizer.scope.region}`}
              </Text>
            </View>
            {selectedOrganizer?.id === organizer.id && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Il Tuo Ruolo</Text>
      <Text style={styles.stepDescription}>
        Specifica il tuo ruolo all&apos;interno dell&apos;organizzazione
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Es: Delegato Provinciale Milano"
        placeholderTextColor={colors.textSecondary}
        value={role}
        onChangeText={setRole}
      />

      <Text style={styles.suggestionsTitle}>Esempi suggeriti:</Text>
      <View style={styles.suggestionsContainer}>
        {suggestedRoles.map((suggestedRole, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionChip}
            onPress={() => setRole(suggestedRole)}
          >
            <Text style={styles.suggestionText}>{suggestedRole}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Documenti</Text>
      <Text style={styles.stepDescription}>
        Carica i documenti richiesti per la verifica
      </Text>

      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>📄 Documento d&apos;Identità</Text>
        {idCardUri ? (
          <View style={styles.documentPreview}>
            <Image source={{ uri: idCardUri }} style={styles.documentImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setIdCardUri(null)}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadButtons}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => takePhoto('idCard')}
            >
              <IconSymbol ios_icon_name="camera.fill" android_material_icon_name="camera_alt" size={24} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Fotocamera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage('idCard')}
            >
              <IconSymbol ios_icon_name="photo.fill" android_material_icon_name="photo_library" size={24} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Galleria</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>📋 Lettera di Delega</Text>
        {delegationLetterUri ? (
          <View style={styles.documentPreview}>
            <Image source={{ uri: delegationLetterUri }} style={styles.documentImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setDelegationLetterUri(null)}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadButtons}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => takePhoto('delegationLetter')}
            >
              <IconSymbol ios_icon_name="camera.fill" android_material_icon_name="camera_alt" size={24} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Fotocamera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage('delegationLetter')}
            >
              <IconSymbol ios_icon_name="photo.fill" android_material_icon_name="photo_library" size={24} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Galleria</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Motivazione</Text>
      <Text style={styles.stepDescription}>
        Spiega perché hai bisogno di un account verificato
      </Text>

      <TextInput
        style={styles.textArea}
        placeholder="Gestisco i tornei CSI della provincia di..."
        placeholderTextColor={colors.textSecondary}
        value={motivation}
        onChangeText={setMotivation}
        multiline
        numberOfLines={6}
        maxLength={500}
      />
      <Text style={styles.characterCount}>
        {motivation.length}/500 caratteri
      </Text>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Conferma</Text>
      <Text style={styles.stepDescription}>
        Verifica le informazioni prima di inviare
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>📋 Riepilogo</Text>
        
        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Organizzatore:</Text>
          <View style={styles.summaryOrganizerRow}>
            <Image source={{ uri: selectedOrganizer?.logo }} style={styles.summaryLogo} />
            <Text style={styles.summaryValue}>{selectedOrganizer?.name}</Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Ruolo:</Text>
          <Text style={styles.summaryValue}>{role}</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Documenti:</Text>
          <Text style={styles.summaryValue}>✅ Documento d&apos;identità</Text>
          <Text style={styles.summaryValue}>✅ Lettera di delega</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Motivazione:</Text>
          <Text style={styles.summaryMotivation}>{motivation}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAgreedToTerms(!agreedToTerms)}
      >
        <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
          {agreedToTerms && <Text style={styles.checkboxCheck}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>
          Dichiaro che le informazioni fornite sono veritiere
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Richiesta Verifica</Text>
        <View style={styles.headerSpacer} />
      </View>

      {renderProgressBar()}

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep < 5 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Avanti</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>📨 Invia Richiesta</Text>
          </TouchableOpacity>
        )}
      </View>
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
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  stepContent: {
    gap: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  stepDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 24,
  },
  organizerList: {
    maxHeight: 500,
  },
  organizerListContent: {
    gap: 12,
  },
  organizerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  organizerCardSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  organizerLogo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  organizerFullName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  organizerScope: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 8,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  documentSection: {
    marginBottom: 24,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  documentPreview: {
    position: 'relative',
  },
  documentImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.live,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  textArea: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'right',
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  summarySection: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  summaryOrganizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  summaryMotivation: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxCheck: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: colors.calcio,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
