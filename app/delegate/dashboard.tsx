
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mockFirestoreUsers } from '@/data/firestoreMockData';

type TabType = 'overview' | 'tournaments' | 'teams' | 'matches' | 'bulk';

export default function DelegateDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  const currentUser = mockFirestoreUsers.find(u => u.role === 'verified');

  const stats = {
    tournaments: 12,
    teams: 45,
    matches: 234,
    pending: 3
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>📊 Panoramica</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statValue}>{stats.tournaments}</Text>
          <Text style={styles.statLabel}>Tornei Attivi</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={styles.statValue}>{stats.teams}</Text>
          <Text style={styles.statLabel}>Squadre</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⚽</Text>
          <Text style={styles.statValue}>{stats.matches}</Text>
          <Text style={styles.statLabel}>Partite</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>⏳</Text>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>In Attesa</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>⚡ Azioni Rapide</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/admin/add-tournament')}
        >
          <Text style={styles.actionEmoji}>🏆</Text>
          <Text style={styles.actionText}>Crea Torneo</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setActiveTab('bulk')}
        >
          <Text style={styles.actionEmoji}>📤</Text>
          <Text style={styles.actionText}>Caricamento Massivo</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Inserisci Risultato', 'Funzionalità in arrivo')}
        >
          <Text style={styles.actionEmoji}>📝</Text>
          <Text style={styles.actionText}>Inserisci Risultato</Text>
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBulkUpload = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>📤 Caricamento Massivo</Text>
      <Text style={styles.sectionDescription}>
        Carica squadre, tornei e giornate di gara in blocco tramite file CSV
      </Text>

      <View style={styles.bulkSection}>
        <Text style={styles.bulkTitle}>👥 Squadre</Text>
        <Text style={styles.bulkDescription}>
          Carica multiple squadre con informazioni complete
        </Text>
        <View style={styles.bulkButtons}>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => router.push('/delegate/bulk-upload?type=teams&action=template')}
          >
            <IconSymbol
              ios_icon_name="doc.text"
              android_material_icon_name="description"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.templateButtonText}>Scarica Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => router.push('/delegate/bulk-upload?type=teams')}
          >
            <IconSymbol
              ios_icon_name="arrow.up.doc"
              android_material_icon_name="upload_file"
              size={20}
              color={colors.card}
            />
            <Text style={styles.uploadButtonText}>Carica CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bulkSection}>
        <Text style={styles.bulkTitle}>🏆 Tornei</Text>
        <Text style={styles.bulkDescription}>
          Crea multipli tornei con configurazione completa
        </Text>
        <View style={styles.bulkButtons}>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => router.push('/delegate/bulk-upload?type=tournaments&action=template')}
          >
            <IconSymbol
              ios_icon_name="doc.text"
              android_material_icon_name="description"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.templateButtonText}>Scarica Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => router.push('/delegate/bulk-upload?type=tournaments')}
          >
            <IconSymbol
              ios_icon_name="arrow.up.doc"
              android_material_icon_name="upload_file"
              size={20}
              color={colors.card}
            />
            <Text style={styles.uploadButtonText}>Carica CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bulkSection}>
        <Text style={styles.bulkTitle}>📅 Giornate di Gara</Text>
        <Text style={styles.bulkDescription}>
          Programma multiple giornate con tutti gli incontri
        </Text>
        <View style={styles.bulkButtons}>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => router.push('/delegate/bulk-upload?type=matchdays&action=template')}
          >
            <IconSymbol
              ios_icon_name="doc.text"
              android_material_icon_name="description"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.templateButtonText}>Scarica Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => router.push('/delegate/bulk-upload?type=matchdays')}
          >
            <IconSymbol
              ios_icon_name="arrow.up.doc"
              android_material_icon_name="upload_file"
              size={20}
              color={colors.card}
            />
            <Text style={styles.uploadButtonText}>Carica CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoEmoji}>ℹ️</Text>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Formato CSV</Text>
          <Text style={styles.infoText}>
            I file devono essere in formato CSV con separatore virgola. Scarica i template per vedere il formato corretto.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard Delegato</Text>
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>✅</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            Panoramica
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bulk' && styles.tabActive]}
          onPress={() => setActiveTab('bulk')}
        >
          <Text style={[styles.tabText, activeTab === 'bulk' && styles.tabTextActive]}>
            Caricamento
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'bulk' && renderBulkUpload()}
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
  verifiedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.calcio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 16,
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
    gap: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: -16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  actionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  bulkSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  bulkTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  bulkDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  bulkButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  templateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  templateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
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
