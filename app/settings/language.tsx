
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useLocalization } from '@/contexts/LocalizationContext';

export default function LanguageSettingsScreen() {
  const { language, setLanguage, formatDate, formatDateTime } = useLocalization();

  const languages = [
    {
      code: 'it' as const,
      name: 'Italiano',
      flag: '🇮🇹',
      dateFormat: 'gg/mm/aaaa',
      timeFormat: '24 ore',
    },
    {
      code: 'en' as const,
      name: 'English',
      flag: '🇬🇧',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: '12 hours',
    },
  ];

  const exampleDate = new Date('2024-03-15T14:30:00');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lingua e Formato</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>🌍 Seleziona Lingua</Text>
        <Text style={styles.sectionDescription}>
          La lingua selezionata influenzerà il formato delle date e degli orari
        </Text>

        <View style={styles.languagesContainer}>
          {languages.map((lang, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.languageCard,
                  language === lang.code && styles.languageCardActive
                ]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageFormat}>
                    Data: {lang.dateFormat} • Ora: {lang.timeFormat}
                  </Text>
                </View>
                {language === lang.code && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={28}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.exampleSection}>
          <Text style={styles.sectionTitle}>📅 Anteprima Formato</Text>
          <View style={styles.exampleCard}>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Data:</Text>
              <Text style={styles.exampleValue}>{formatDate(exampleDate)}</Text>
            </View>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Data e Ora:</Text>
              <Text style={styles.exampleValue}>{formatDateTime(exampleDate)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>ℹ️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Informazione</Text>
            <Text style={styles.infoText}>
              Il formato della data e dell&apos;ora verrà applicato in tutta l&apos;app, inclusi risultati delle partite, tornei e statistiche.
            </Text>
          </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  languagesContainer: {
    gap: 12,
    marginBottom: 32,
  },
  languageCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  languageCardActive: {
    borderColor: colors.primary,
    borderWidth: 3,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  languageFlag: {
    fontSize: 40,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  languageFormat: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  exampleSection: {
    marginBottom: 24,
  },
  exampleCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  exampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  exampleValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
