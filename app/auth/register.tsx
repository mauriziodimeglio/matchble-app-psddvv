
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Sport } from '@/types';
import RegionSelector from '@/components/RegionSelector';

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    province: '',
    city: '',
    preferredSport: '' as Sport | '',
    userType: '' as 'athlete' | 'parent' | 'spectator' | '',
    privacyAccepted: false,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName || formData.displayName.length < 2) {
      newErrors.displayName = 'Il nome deve contenere almeno 2 caratteri';
    }

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Inserisci un&apos;email valida';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La password deve contenere almeno 6 caratteri';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Le password non corrispondono';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.region) {
      newErrors.region = 'Seleziona una regione';
    }

    if (!formData.city) {
      newErrors.city = 'Inserisci la tua città';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredSport) {
      newErrors.preferredSport = 'Seleziona uno sport preferito';
    }

    if (!formData.userType) {
      newErrors.userType = 'Seleziona la tua qualifica';
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'Devi accettare la Privacy Policy';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Devi accettare i Termini di Utilizzo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      handleRegister();
    }
  };

  const handleRegister = () => {
    console.log('Registering user:', formData);
    router.push('/auth/select-role');
  };

  const sports: Array<{ id: Sport; name: string; emoji: string }> = [
    { id: 'calcio', name: 'Calcio', emoji: '⚽' },
    { id: 'basket', name: 'Basket', emoji: '🏀' },
    { id: 'volley', name: 'Volley', emoji: '🏐' },
    { id: 'padel', name: 'Padel', emoji: '🎾' },
  ];

  const userTypes: Array<{ id: 'athlete' | 'parent' | 'spectator'; name: string; emoji: string; description: string }> = [
    { id: 'athlete', name: 'Atleta', emoji: '⚽', description: 'Gioco attivamente' },
    { id: 'parent', name: 'Genitore', emoji: '👨‍👩‍👧', description: 'Seguo mio figlio/a' },
    { id: 'spectator', name: 'Spettatore', emoji: '👀', description: 'Seguo lo sport' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrazione</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Passo {step} di 3</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {step === 1 && (
          <>
            <Text style={styles.emoji}>🏆</Text>
            <Text style={styles.title}>Crea il Tuo Account</Text>
            <Text style={styles.subtitle}>
              Inserisci i tuoi dati per iniziare
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                  style={[styles.input, errors.displayName && styles.inputError]}
                  placeholder="Mario Rossi"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.displayName}
                  onChangeText={(text) => setFormData({ ...formData, displayName: text })}
                  autoCapitalize="words"
                />
                {errors.displayName && <Text style={styles.errorText}>{errors.displayName}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="mario.rossi@email.com"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Minimo 6 caratteri"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Conferma Password</Text>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Ripeti la password"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              </View>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.emoji}>📍</Text>
            <Text style={styles.title}>Dove Ti Trovi?</Text>
            <Text style={styles.subtitle}>
              Seleziona la tua regione e città per personalizzare i contenuti
            </Text>

            <View style={styles.form}>
              <RegionSelector
                selectedRegion={formData.region}
                selectedProvince={formData.province}
                onRegionSelect={(region) => setFormData({ ...formData, region, province: '', city: '' })}
                onProvinceSelect={(province) => setFormData({ ...formData, province })}
                error={errors.region}
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Città</Text>
                <TextInput
                  style={[styles.input, errors.city && styles.inputError]}
                  placeholder="Milano"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.city}
                  onChangeText={(text) => setFormData({ ...formData, city: text })}
                  autoCapitalize="words"
                />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.emoji}>⚽</Text>
            <Text style={styles.title}>Preferenze e Consensi</Text>
            <Text style={styles.subtitle}>
              Personalizza la tua esperienza e accetta i termini
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Sport Preferito</Text>
                <Text style={styles.helperText}>
                  Vedrai principalmente eventi di questo sport
                </Text>
                <View style={styles.sportsGrid}>
                  {sports.map((sport, index) => (
                    <React.Fragment key={index}>
                      <TouchableOpacity
                        style={[
                          styles.sportCard,
                          formData.preferredSport === sport.id && styles.sportCardSelected
                        ]}
                        onPress={() => setFormData({ ...formData, preferredSport: sport.id })}
                      >
                        <Text style={styles.sportEmoji}>{sport.emoji}</Text>
                        <Text style={styles.sportName}>{sport.name}</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </View>
                {errors.preferredSport && <Text style={styles.errorText}>{errors.preferredSport}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Qualifica Utente</Text>
                <Text style={styles.helperText}>
                  Specifica il tuo ruolo per funzionalità personalizzate
                </Text>
                <View style={styles.userTypesGrid}>
                  {userTypes.map((type, index) => (
                    <React.Fragment key={index}>
                      <TouchableOpacity
                        style={[
                          styles.userTypeCard,
                          formData.userType === type.id && styles.userTypeCardSelected
                        ]}
                        onPress={() => setFormData({ ...formData, userType: type.id })}
                      >
                        <Text style={styles.userTypeEmoji}>{type.emoji}</Text>
                        <Text style={styles.userTypeName}>{type.name}</Text>
                        <Text style={styles.userTypeDescription}>{type.description}</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </View>
                {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}
              </View>

              <View style={styles.checkboxGroup}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setFormData({ ...formData, privacyAccepted: !formData.privacyAccepted })}
                >
                  <View style={[styles.checkboxBox, formData.privacyAccepted && styles.checkboxBoxChecked]}>
                    {formData.privacyAccepted && (
                      <IconSymbol
                        ios_icon_name="checkmark"
                        android_material_icon_name="check"
                        size={16}
                        color={colors.card}
                      />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Accetto la <Text style={styles.checkboxLink}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>
                {errors.privacyAccepted && <Text style={styles.errorText}>{errors.privacyAccepted}</Text>}

                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
                >
                  <View style={[styles.checkboxBox, formData.termsAccepted && styles.checkboxBoxChecked]}>
                    {formData.termsAccepted && (
                      <IconSymbol
                        ios_icon_name="checkmark"
                        android_material_icon_name="check"
                        size={16}
                        color={colors.card}
                      />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Accetto i <Text style={styles.checkboxLink}>Termini di Utilizzo</Text>
                  </Text>
                </TouchableOpacity>
                {errors.termsAccepted && <Text style={styles.errorText}>{errors.termsAccepted}</Text>}
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoEmoji}>💡</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Modalità d&apos;Uso</Text>
                  <Text style={styles.infoText}>
                    - Potrai seguire tornei e gironi preferiti{'\n'}
                    - Riceverai notifiche sui risultati{'\n'}
                    - Le tue preferenze saranno salvate su tutti i dispositivi{'\n'}
                    - Potrai modificare le impostazioni in qualsiasi momento
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {step === 3 ? 'Completa Registrazione' : 'Continua'}
          </Text>
          <IconSymbol
            ios_icon_name="arrow.right"
            android_material_icon_name="arrow_forward"
            size={20}
            color={colors.card}
          />
        </TouchableOpacity>

        {step === 1 && (
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginLinkText}>
              Hai già un account? <Text style={styles.loginLinkBold}>Accedi</Text>
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray300,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  form: {
    gap: spacing.xl,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  inputError: {
    borderColor: colors.live,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.live,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  sportCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  sportCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  sportEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  userTypesGrid: {
    gap: spacing.md,
  },
  userTypeCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray300,
    gap: spacing.md,
  },
  userTypeCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  userTypeEmoji: {
    fontSize: 32,
  },
  userTypeName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  userTypeDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  checkboxGroup: {
    gap: spacing.md,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  checkboxLink: {
    fontWeight: '800',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  loginLinkBold: {
    fontWeight: '800',
    color: colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
