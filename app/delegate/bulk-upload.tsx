
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import {
  generateTeamsCSVTemplate,
  generateTournamentsCSVTemplate,
  generateMatchDaysCSVTemplate,
  parseTeamsCSV,
  parseTournamentsCSV,
  parseMatchDaysCSV,
  validateTeamsData,
  validateTournamentsData
} from '@/utils/bulkUploadHelpers';

export default function BulkUploadScreen() {
  const params = useLocalSearchParams();
  const type = params.type as string;
  const action = params.action as string;
  
  const [csvContent, setCsvContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'teams': return 'Caricamento Squadre';
      case 'tournaments': return 'Caricamento Tornei';
      case 'matchdays': return 'Caricamento Giornate';
      default: return 'Caricamento Massivo';
    }
  };

  const getTemplate = () => {
    switch (type) {
      case 'teams': return generateTeamsCSVTemplate();
      case 'tournaments': return generateTournamentsCSVTemplate();
      case 'matchdays': return generateMatchDaysCSVTemplate();
      default: return '';
    }
  };

  const handleDownloadTemplate = () => {
    const template = getTemplate();
    console.log('Template CSV:', template);
    Alert.alert(
      '📄 Template Generato',
      'Il template CSV è stato generato. In una vera app, questo verrebbe scaricato come file.',
      [
        {
          text: 'Copia Template',
          onPress: () => {
            setCsvContent(template);
            Alert.alert('✅ Copiato', 'Template copiato nell\'editor');
          }
        },
        { text: 'OK' }
      ]
    );
  };

  const handleUpload = async () => {
    if (!csvContent.trim()) {
      Alert.alert('Errore', 'Inserisci o incolla il contenuto CSV');
      return;
    }

    setIsProcessing(true);

    try {
      let errors: string[] = [];
      let itemCount = 0;

      if (type === 'teams') {
        const teams = parseTeamsCSV(csvContent);
        errors = validateTeamsData(teams);
        itemCount = teams.length;
      } else if (type === 'tournaments') {
        const tournaments = parseTournamentsCSV(csvContent);
        errors = validateTournamentsData(tournaments);
        itemCount = tournaments.length;
      } else if (type === 'matchdays') {
        const matchDays = parseMatchDaysCSV(csvContent);
        itemCount = matchDays.reduce((sum, md) => sum + md.matches.length, 0);
      }

      if (errors.length > 0) {
        Alert.alert(
          '❌ Errori di Validazione',
          errors.slice(0, 5).join('\n') + (errors.length > 5 ? `\n\n...e altri ${errors.length - 5} errori` : ''),
          [{ text: 'OK' }]
        );
        setIsProcessing(false);
        return;
      }

      console.log('Processing upload:', { type, itemCount });

      setTimeout(() => {
        setIsProcessing(false);
        Alert.alert(
          '✅ Caricamento Completato',
          `${itemCount} element${itemCount === 1 ? 'o' : 'i'} caricato con successo!`,
          [
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setIsProcessing(false);
      Alert.alert('Errore', 'Si è verificato un errore durante il caricamento');
    }
  };

  if (action === 'template') {
    const template = getTemplate();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Template CSV</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.templateBox}>
            <Text style={styles.templateTitle}>📄 Template {getTitle()}</Text>
            <Text style={styles.templateDescription}>
              Copia questo template e compilalo con i tuoi dati
            </Text>
            <View style={styles.templateContent}>
              <Text style={styles.templateText}>{template}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                Alert.alert('✅ Copiato', 'Template copiato negli appunti');
              }}
            >
              <IconSymbol
                ios_icon_name="doc.on.doc"
                android_material_icon_name="content_copy"
                size={20}
                color={colors.card}
              />
              <Text style={styles.copyButtonText}>Copia Template</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsEmoji}>📋</Text>
          <View style={styles.instructionsContent}>
            <Text style={styles.instructionsTitle}>Istruzioni</Text>
            <Text style={styles.instructionsText}>
              1. Scarica il template CSV{'\n'}
              2. Compila il file con i tuoi dati{'\n'}
              3. Incolla il contenuto qui sotto{'\n'}
              4. Clicca su &quot;Carica&quot; per completare
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadTemplate}
        >
          <IconSymbol
            ios_icon_name="arrow.down.doc"
            android_material_icon_name="download"
            size={20}
            color={colors.card}
          />
          <Text style={styles.downloadButtonText}>Scarica Template CSV</Text>
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Contenuto CSV</Text>
          <TextInput
            style={styles.csvInput}
            placeholder="Incolla qui il contenuto del file CSV..."
            placeholderTextColor={colors.textSecondary}
            value={csvContent}
            onChangeText={setCsvContent}
            multiline
            numberOfLines={15}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.uploadButton, isProcessing && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Text style={styles.uploadButtonText}>⏳ Caricamento...</Text>
          ) : (
            <>
              <IconSymbol
                ios_icon_name="arrow.up.circle.fill"
                android_material_icon_name="upload"
                size={20}
                color={colors.card}
              />
              <Text style={styles.uploadButtonText}>Carica Dati</Text>
            </>
          )}
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  instructionsBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.calcio,
  },
  instructionsEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  instructionsContent: {
    flex: 1,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  csvInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 13,
    fontWeight: '400',
    color: colors.text,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 300,
    fontFamily: 'monospace',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  templateBox: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  templateTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  templateContent: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  templateText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  copyButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
});
