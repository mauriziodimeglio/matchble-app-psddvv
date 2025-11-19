
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react';
import { colors } from '@/styles/commonStyles';
import { 
  PermissionsType, 
  PermissionPreset, 
  PERMISSION_PRESETS, 
  PERMISSION_CATEGORIES,
  getPermissionPreset 
} from '@/types/permissions';
import { IconSymbol } from '@/components/IconSymbol';

interface PermissionSelectorProps {
  selectedPreset: PermissionPreset;
  customPermissions: PermissionsType;
  onPresetChange: (preset: PermissionPreset) => void;
  onCustomPermissionsChange: (permissions: PermissionsType) => void;
}

export default function PermissionSelector({
  selectedPreset,
  customPermissions,
  onPresetChange,
  onCustomPermissionsChange,
}: PermissionSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['tournaments', 'results']));

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const togglePermission = (permissionKey: keyof PermissionsType) => {
    onCustomPermissionsChange({
      ...customPermissions,
      [permissionKey]: !customPermissions[permissionKey],
    });
  };

  const renderPresetCard = (preset: typeof PERMISSION_PRESETS[0]) => {
    const isSelected = selectedPreset === preset.id;
    
    return (
      <TouchableOpacity
        key={preset.id}
        style={[styles.presetCard, isSelected && styles.presetCardSelected]}
        onPress={() => onPresetChange(preset.id)}
      >
        <View style={styles.presetHeader}>
          <Text style={styles.presetEmoji}>{preset.emoji}</Text>
          <View style={styles.presetInfo}>
            <Text style={[styles.presetName, isSelected && styles.presetNameSelected]}>
              {preset.name}
            </Text>
            <Text style={[styles.presetDescription, isSelected && styles.presetDescriptionSelected]}>
              {preset.description}
            </Text>
          </View>
          {isSelected && (
            <View style={styles.checkmark}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={24}
                color={colors.calcio}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCustomPermissions = () => {
    if (selectedPreset !== 'custom') return null;

    return (
      <View style={styles.customPermissionsContainer}>
        <Text style={styles.customPermissionsTitle}>
          ⚙️ Configura Permessi Personalizzati
        </Text>
        <Text style={styles.customPermissionsDescription}>
          Seleziona i permessi specifici per questo delegato
        </Text>

        {PERMISSION_CATEGORIES.map(category => {
          const isExpanded = expandedCategories.has(category.id);
          const enabledCount = category.permissions.filter(
            p => customPermissions[p.key]
          ).length;

          return (
            <View key={category.id} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleCategory(category.id)}
              >
                <View style={styles.categoryTitleRow}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  {enabledCount > 0 && (
                    <View style={styles.enabledBadge}>
                      <Text style={styles.enabledBadgeText}>{enabledCount}</Text>
                    </View>
                  )}
                </View>
                <IconSymbol
                  ios_icon_name={isExpanded ? 'chevron.up' : 'chevron.down'}
                  android_material_icon_name={isExpanded ? 'expand_less' : 'expand_more'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.permissionsList}>
                  {category.permissions.map(permission => {
                    const isEnabled = customPermissions[permission.key];
                    
                    return (
                      <TouchableOpacity
                        key={permission.key}
                        style={styles.permissionItem}
                        onPress={() => togglePermission(permission.key)}
                      >
                        <View style={styles.permissionCheckbox}>
                          <View style={[
                            styles.checkbox,
                            isEnabled && styles.checkboxChecked
                          ]}>
                            {isEnabled && (
                              <IconSymbol
                                ios_icon_name="checkmark"
                                android_material_icon_name="check"
                                size={16}
                                color="#FFFFFF"
                              />
                            )}
                          </View>
                        </View>
                        <View style={styles.permissionInfo}>
                          <Text style={styles.permissionLabel}>
                            {permission.label}
                          </Text>
                          <Text style={styles.permissionDescription}>
                            {permission.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Seleziona Preset Permessi</Text>
      <Text style={styles.sectionDescription}>
        Scegli un preset predefinito o configura permessi personalizzati
      </Text>

      <View style={styles.presetsContainer}>
        {PERMISSION_PRESETS.map(renderPresetCard)}
      </View>

      {renderCustomPermissions()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  presetsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  presetCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  presetCardSelected: {
    borderColor: colors.calcio,
    backgroundColor: '#F0F9FF',
  },
  presetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  presetInfo: {
    flex: 1,
  },
  presetName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  presetNameSelected: {
    color: colors.calcio,
  },
  presetDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  presetDescriptionSelected: {
    color: colors.text,
  },
  checkmark: {
    marginLeft: 12,
  },
  customPermissionsContainer: {
    marginTop: 8,
  },
  customPermissionsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  customPermissionsDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  categoryContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  enabledBadge: {
    backgroundColor: colors.calcio,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  enabledBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  permissionsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  permissionCheckbox: {
    marginRight: 12,
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
