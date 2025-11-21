
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const requirements: PasswordRequirement[] = [
    {
      label: 'Minimo 8 caratteri',
      met: password.length >= 8,
    },
    {
      label: 'Almeno una maiuscola',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'Almeno una minuscola',
      met: /[a-z]/.test(password),
    },
    {
      label: 'Almeno un numero',
      met: /[0-9]/.test(password),
    },
    {
      label: 'Almeno un carattere speciale',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const metCount = requirements.filter(r => r.met).length;
  const strength = metCount === 0 ? 'none' : metCount <= 2 ? 'weak' : metCount <= 4 ? 'medium' : 'strong';

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return '#DC2626';
      case 'medium':
        return '#F59E0B';
      case 'strong':
        return '#10B981';
      default:
        return colors.gray300;
    }
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 'weak':
        return 'Debole';
      case 'medium':
        return 'Media';
      case 'strong':
        return 'Forte';
      default:
        return '';
    }
  };

  if (!password) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Strength Bar */}
      <View style={styles.strengthContainer}>
        <View style={styles.strengthBar}>
          <View
            style={[
              styles.strengthFill,
              {
                width: `${(metCount / 5) * 100}%`,
                backgroundColor: getStrengthColor(),
              },
            ]}
          />
        </View>
        {strength !== 'none' && (
          <Text style={[styles.strengthLabel, { color: getStrengthColor() }]}>
            {getStrengthLabel()}
          </Text>
        )}
      </View>

      {/* Requirements List */}
      <View style={styles.requirementsList}>
        {requirements.map((req, index) => (
          <View key={index} style={styles.requirementItem}>
            <View
              style={[
                styles.checkmark,
                { backgroundColor: req.met ? '#10B981' : '#DC2626' },
              ]}
            >
              <IconSymbol
                ios_icon_name={req.met ? 'checkmark' : 'xmark'}
                android_material_icon_name={req.met ? 'check' : 'close'}
                size={12}
                color={colors.card}
              />
            </View>
            <Text
              style={[
                styles.requirementText,
                { color: req.met ? '#10B981' : '#DC2626' },
              ]}
            >
              {req.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  strengthBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray300,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: borderRadius.full,
    transition: 'width 0.3s ease',
  },
  strengthLabel: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 60,
  },
  requirementsList: {
    gap: spacing.sm,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requirementText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
