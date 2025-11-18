
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FirestoreStanding } from '@/types';
import { getFormEmoji } from '@/utils/firestoreHelpers';
import { colors } from '@/styles/commonStyles';

interface StandingsTableProps {
  standings: FirestoreStanding[];
  sport: string;
}

export function StandingsTable({ standings, sport }: StandingsTableProps) {
  const getRankColor = (position: number) => {
    if (position === 1) return colors.gold;
    if (position === 2) return colors.silver;
    if (position === 3) return colors.bronze;
    return 'transparent';
  };

  const getRankEmoji = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return '';
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={[styles.cell, styles.positionCell]}>
            <Text style={styles.headerText}>#</Text>
          </View>
          <View style={[styles.cell, styles.teamCell]}>
            <Text style={styles.headerText}>Squadra</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>G</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>V</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>P</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>S</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>GF</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>GS</Text>
          </View>
          <View style={[styles.cell, styles.statCell]}>
            <Text style={styles.headerText}>DR</Text>
          </View>
          <View style={[styles.cell, styles.pointsCell]}>
            <Text style={styles.headerText}>Pt</Text>
          </View>
          <View style={[styles.cell, styles.formCell]}>
            <Text style={styles.headerText}>Forma</Text>
          </View>
        </View>

        {/* Rows */}
        {standings.map((standing, index) => (
          <View
            key={standing.id}
            style={[
              styles.row,
              index % 2 === 0 && styles.evenRow,
              { borderLeftColor: getRankColor(standing.position), borderLeftWidth: 4 }
            ]}
          >
            <View style={[styles.cell, styles.positionCell]}>
              <Text style={styles.positionText}>
                {getRankEmoji(standing.position)} {standing.position}
              </Text>
            </View>
            <View style={[styles.cell, styles.teamCell]}>
              <Text style={styles.teamText} numberOfLines={1}>
                {standing.teamName}
              </Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.played}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.won}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.drawn}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.lost}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.goalsFor}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text style={styles.statText}>{standing.goalsAgainst}</Text>
            </View>
            <View style={[styles.cell, styles.statCell]}>
              <Text
                style={[
                  styles.statText,
                  standing.goalDifference > 0 && styles.positiveText,
                  standing.goalDifference < 0 && styles.negativeText
                ]}
              >
                {standing.goalDifference > 0 ? '+' : ''}
                {standing.goalDifference}
              </Text>
            </View>
            <View style={[styles.cell, styles.pointsCell]}>
              <Text style={styles.pointsText}>{standing.points}</Text>
            </View>
            <View style={[styles.cell, styles.formCell]}>
              <Text style={styles.formText}>{getFormEmoji(standing.form)}</Text>
            </View>
          </View>
        ))}

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendText}>
            G = Giocate | V = Vinte | P = Pareggiate | S = Sconfitte
          </Text>
          <Text style={styles.legendText}>
            GF = Gol Fatti | GS = Gol Subiti | DR = Differenza Reti | Pt = Punti
          </Text>
          <Text style={styles.legendText}>
            Forma: 🟢 Vittoria | 🟡 Pareggio | 🔴 Sconfitta
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 8,
    minWidth: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  evenRow: {
    backgroundColor: '#F9F9F9',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  positionCell: {
    width: 60,
  },
  teamCell: {
    width: 140,
    alignItems: 'flex-start',
    paddingLeft: 8,
  },
  statCell: {
    width: 40,
  },
  pointsCell: {
    width: 50,
  },
  formCell: {
    width: 120,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  positionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  teamText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  formText: {
    fontSize: 14,
  },
  positiveText: {
    color: colors.calcio,
  },
  negativeText: {
    color: colors.live,
  },
  legend: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  legendText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
});
