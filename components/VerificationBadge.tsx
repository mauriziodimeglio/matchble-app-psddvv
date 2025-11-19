
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VerificationBadgeProps {
  verified: boolean;
  official?: boolean;
  size?: 'small' | 'medium';
}

export default function VerificationBadge({ 
  verified, 
  official = false, 
  size = 'medium' 
}: VerificationBadgeProps) {
  const isSmall = size === 'small';
  const badgeSize = isSmall ? 16 : 24;
  const fontSize = isSmall ? 10 : 14;

  if (official) {
    return (
      <View style={[styles.badge, styles.officialBadge, { width: badgeSize, height: badgeSize }]}>
        <Text style={[styles.emoji, { fontSize: badgeSize * 0.7 }]}>🏆</Text>
      </View>
    );
  }

  if (verified) {
    return (
      <View style={[styles.badge, styles.verifiedBadge, { width: badgeSize, height: badgeSize }]}>
        <Text style={[styles.emoji, { fontSize: badgeSize * 0.7 }]}>✅</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
  },
  officialBadge: {
    backgroundColor: '#FFF9E6',
  },
  emoji: {
    lineHeight: undefined,
  },
});
