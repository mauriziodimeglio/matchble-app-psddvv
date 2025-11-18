
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Sport } from '@/types';
import { sportIcons, sportLabels } from '@/data/mockData';
import { colors } from '@/styles/commonStyles';

interface SportFilterProps {
  selectedSport: Sport | null;
  onSelectSport: (sport: Sport | null) => void;
}

export default function SportFilter({ selectedSport, onSelectSport }: SportFilterProps) {
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
                  borderWidth: 4,
                  backgroundColor: `${sportData.color}15`,
                },
              ]}
              onPress={() => onSelectSport(isSelected ? null : sport)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{sportData.emoji}</Text>
              <Text style={[
                styles.label,
                isSelected && { color: sportData.color, fontWeight: '700' }
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  sportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emoji: {
    fontSize: 36,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
});
