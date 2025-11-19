
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    region: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
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

    if (!formData.city) {
      newErrors.city = 'Inserisci la tua città';
    }

    if (!formData.region) {
      newErrors.region = 'Inserisci la tua regione';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Registering user:', formData);
    Alert.alert(
      '✅ Registrazione Completata',
      'Il tuo account è stato creato con successo!',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/(home)')
        }
      ]
    );
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Social login with:', provider);
    Alert.alert('Social Login', `Login con ${provider} in arrivo!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrazione</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeEmoji}>🏆</Text>
        <Text style={styles.title}>Benvenuto su Matchble!</Text>
        <Text style={styles.subtitle}>
          Crea il tuo account per iniziare a pubblicare risultati e creare tornei
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Regione</Text>
            <TextInput
              style={[styles.input, errors.region && styles.inputError]}
              placeholder="Lombardia"
              placeholderTextColor={colors.textSecondary}
              value={formData.region}
              onChangeText={(text) => setFormData({ ...formData, region: text })}
              autoCapitalize="words"
            />
            {errors.region && <Text style={styles.errorText}>{errors.region}</Text>}
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registrati</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oppure</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <IconSymbol
                ios_icon_name="apple.logo"
                android_material_icon_name="apple"
                size={20}
                color={colors.card}
              />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginLinkText}>
              Hai già un account? <Text style={styles.loginLinkBold}>Accedi</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  welcomeEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: colors.live,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.live,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
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
    fontWeight: '700',
    color: colors.card,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.card,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 8,
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
});
