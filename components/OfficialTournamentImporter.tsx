
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors } from '@/styles/commonStyles';

interface Props {
  onImport: (url: string) => Promise<void>;
}

export default function OfficialTournamentImporter({ onImport }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      Alert.alert('Errore', 'Inserisci un URL valido');
      return;
    }

    // Validate URL is from official source
    const officialDomains = [
      'figc.it',
      'fip.it',
      'federvolley.it',
      'federtennis.it',
      'csi-net.it',
      'uisp.it',
    ];

    const isOfficial = officialDomains.some(domain => url.includes(domain));

    if (!isOfficial) {
      Alert.alert(
        'Attenzione',
        'L\'URL non sembra provenire da un sito ufficiale. Continua comunque?',
        [
          { text: 'Annulla', style: 'cancel' },
          {
            text: 'Continua',
            onPress: async () => {
              setLoading(true);
              try {
                await onImport(url);
                setUrl('');
              } catch (error) {
                Alert.alert('Errore', 'Impossibile importare i dati');
              } finally {
                setLoading(false);
              }
            },
          },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      await onImport(url);
      setUrl('');
      Alert.alert('Successo', 'Dati importati con successo');
    } catch (error) {
      Alert.alert('Errore', 'Impossibile importare i dati dal link fornito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📥 Importa da Sito Ufficiale</Text>
      <Text style={styles.description}>
        Incolla il link alla pagina del campionato dal sito ufficiale della federazione
      </Text>

      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        placeholder="https://www.figc.it/campionati/..."
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleImport}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Importa Dati</Text>
        )}
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Fonti Ufficiali Supportate:</Text>
        <Text style={styles.infoItem}>• FIGC - figc.it</Text>
        <Text style={styles.infoItem}>• FIP - fip.it</Text>
        <Text style={styles.infoItem}>• FIPAV - federvolley.it</Text>
        <Text style={styles.infoItem}>• FIT - federtennis.it</Text>
        <Text style={styles.infoItem}>• CSI - csi-net.it</Text>
        <Text style={styles.infoItem}>• UISP - uisp.it</Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⚠️ Nota: L'importazione automatica potrebbe non funzionare per tutti i siti.
          In caso di errore, inserisci i dati manualmente.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoItem: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    marginVertical: 2,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  warningText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});
