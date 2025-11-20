
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sport } from '@/types';
import { sportIcons, sportLabels } from '@/data/mockData';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';

interface SportFilterProps {
  selectedSport: Sport | 'all';
  onSelectSport: (sport: Sport | 'all') => void;
}

export function SportFilter({ selectedSport, onSelectSport }: SportFilterProps) {
  const sports: Sport[] = ['calcio', 'basket', 'volley', 'padel'];

  return (
    <View style={styles.container}>
      {sports.map((sport, index) => {
        const isSelected = selectedSport === sport;
        const sportData = sportIcons[sport];
        
        return (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={[
                styles.sportButton,
                isSelected && { 
                  borderColor: sportData.color,
                  borderWidth: 3,
                  backgroundColor: `${sportData.color}15`,
                },
              ]}
              onPress={() => onSelectSport(isSelected ? 'all' : sport)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{sportData.emoji}</Text>
              <Text style={[
                styles.label,
                isSelected && { color: sportData.color, fontWeight: '800' }
              ]}>
                {sportLabels[sport]}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  sportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  emoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
});
