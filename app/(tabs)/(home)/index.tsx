
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Sport } from '@/types';
import { mockMatches } from '@/data/mockData';
import SportFilter from '@/components/SportFilter';
import MatchCard from '@/components/MatchCard';

export default function HomeScreen() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredMatches = selectedSport
    ? mockMatches.filter(match => match.sport === selectedSport)
    : mockMatches;

  const liveMatches = filteredMatches.filter(match => match.status === 'live');
  const otherMatches = filteredMatches.filter(match => match.status !== 'live');

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <SportFilter 
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        {liveMatches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔴 LIVE ORA</Text>
            {liveMatches.map((match, index) => (
              <React.Fragment key={index}>
                <MatchCard match={match} isLarge={true} />
              </React.Fragment>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {liveMatches.length > 0 ? 'Altri Risultati' : 'Risultati'}
          </Text>
          <View style={styles.grid}>
            {otherMatches.map((match, index) => (
              <React.Fragment key={index}>
                <View style={styles.gridItem}>
                  <MatchCard match={match} />
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {filteredMatches.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyText}>
              Nessun risultato per questo sport
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 120,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
