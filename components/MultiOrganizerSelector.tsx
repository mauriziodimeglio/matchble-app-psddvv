
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { FirestoreOrganizer, Sport, TerritorialLevel } from '@/types';
import { organizersHierarchy, getRootOrganizers } from '@/data/organizersHierarchyData';
import { IconSymbol } from '@/components/IconSymbol';
import { 
  getChildrenOrganizers, 
  isDescendantOf, 
  getAllDescendants,
  getTerritorialLevelName 
} from '@/utils/organizerHelpers';

interface MultiOrganizerSelectorProps {
  selectedOrganizers: string[]; // Array of organizer IDs
  onSelectionChange: (organizerIds: string[]) => void;
  sportFilter?: Sport;
  maxSelections?: number;
}

interface OrganizerNode {
  organizer: FirestoreOrganizer;
  isExpanded: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  children: FirestoreOrganizer[];
}

export default function MultiOrganizerSelector({
  selectedOrganizers,
  onSelectionChange,
  sportFilter,
  maxSelections,
}: MultiOrganizerSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Get all regions for filter
  const regions = useMemo(() => {
    const regionSet = new Set<string>();
    organizersHierarchy.forEach(org => {
      if (org.territory.region) {
        regionSet.add(org.territory.region);
      }
    });
    return Array.from(regionSet).sort();
  }, []);

  // Filter organizers based on search, sport, and region
  const filteredOrganizers = useMemo(() => {
    let filtered = organizersHierarchy;

    if (sportFilter) {
      filtered = filtered.filter(org => org.sport === sportFilter);
    }

    if (regionFilter) {
      filtered = filtered.filter(org => 
        org.territory.region === regionFilter || 
        org.level === 'nazionale'
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(org =>
        org.name.toLowerCase().includes(query) ||
        org.fullName.toLowerCase().includes(query) ||
        org.acronym.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [sportFilter, regionFilter, searchQuery]);

  // Get root organizers from filtered list
  const rootOrganizers = useMemo(() => {
    return filteredOrganizers.filter(org => org.level === 'nazionale' && !org.parentId);
  }, [filteredOrganizers]);

  // Check if organizer should be disabled
  const isOrganizerDisabled = (organizerId: string): boolean => {
    // Check if any parent is selected
    const hierarchy = getOrganizerHierarchyArray(organizerId);
    for (const ancestorId of hierarchy) {
      if (ancestorId !== organizerId && selectedOrganizers.includes(ancestorId)) {
        return true;
      }
    }

    // Check if any child is selected
    const descendants = getAllDescendants(organizerId);
    for (const descendant of descendants) {
      if (selectedOrganizers.includes(descendant.id)) {
        return true;
      }
    }

    return false;
  };

  const getOrganizerHierarchyArray = (organizerId: string): string[] => {
    const hierarchy: string[] = [];
    let currentOrg = organizersHierarchy.find(o => o.id === organizerId);
    
    while (currentOrg) {
      hierarchy.unshift(currentOrg.id);
      if (currentOrg.parentId) {
        currentOrg = organizersHierarchy.find(o => o.id === currentOrg!.parentId);
      } else {
        break;
      }
    }
    
    return hierarchy;
  };

  const toggleExpanded = (organizerId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(organizerId)) {
      newExpanded.delete(organizerId);
    } else {
      newExpanded.add(organizerId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleSelection = (organizerId: string) => {
    if (isOrganizerDisabled(organizerId)) {
      return;
    }

    const isSelected = selectedOrganizers.includes(organizerId);
    let newSelection: string[];

    if (isSelected) {
      // Remove from selection
      newSelection = selectedOrganizers.filter(id => id !== organizerId);
    } else {
      // Add to selection
      if (maxSelections && selectedOrganizers.length >= maxSelections) {
        return; // Max selections reached
      }
      newSelection = [...selectedOrganizers, organizerId];
    }

    onSelectionChange(newSelection);
  };

  const getLevelBadge = (level: TerritorialLevel) => {
    const badges: Record<TerritorialLevel, { emoji: string; color: string }> = {
      nazionale: { emoji: '🇮🇹', color: '#FFD700' },
      regionale: { emoji: '🏛️', color: '#4CAF50' },
      provinciale: { emoji: '🏢', color: '#2196F3' },
      comunale: { emoji: '🏘️', color: '#9C27B0' },
      locale: { emoji: '📍', color: '#FF9800' },
    };
    return badges[level];
  };

  const renderOrganizerNode = (organizer: FirestoreOrganizer, depth: number = 0) => {
    if (!filteredOrganizers.find(o => o.id === organizer.id)) {
      return null;
    }

    const isSelected = selectedOrganizers.includes(organizer.id);
    const isDisabled = isOrganizerDisabled(organizer.id);
    const isExpanded = expandedNodes.has(organizer.id);
    const children = getChildrenOrganizers(organizer.id).filter(child =>
      filteredOrganizers.find(o => o.id === child.id)
    );
    const hasChildren = children.length > 0;
    const levelBadge = getLevelBadge(organizer.level);

    return (
      <React.Fragment key={organizer.id}>
        <View style={[styles.organizerNode, { marginLeft: depth * 20 }]}>
          <View style={styles.nodeContent}>
            {hasChildren && (
              <TouchableOpacity
                style={styles.expandButton}
                onPress={() => toggleExpanded(organizer.id)}
              >
                <IconSymbol
                  ios_icon_name={isExpanded ? 'chevron.down' : 'chevron.right'}
                  android_material_icon_name={isExpanded ? 'expand_more' : 'chevron_right'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
            {!hasChildren && <View style={styles.expandButtonSpacer} />}

            <TouchableOpacity
              style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected,
                isDisabled && styles.checkboxDisabled,
              ]}
              onPress={() => toggleSelection(organizer.id)}
              disabled={isDisabled}
            >
              {isSelected && (
                <IconSymbol
                  ios_icon_name="checkmark"
                  android_material_icon_name="check"
                  size={16}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>

            <Image source={{ uri: organizer.logo }} style={styles.organizerLogo} />

            <View style={styles.organizerInfo}>
              <View style={styles.organizerNameRow}>
                <Text style={[styles.organizerName, isDisabled && styles.disabledText]}>
                  {organizer.name}
                </Text>
                <View style={[styles.levelBadge, { backgroundColor: levelBadge.color }]}>
                  <Text style={styles.levelBadgeText}>
                    {levelBadge.emoji} {getTerritorialLevelName(organizer.level)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.organizerPath, isDisabled && styles.disabledText]}>
                {organizer.hierarchyPath}
              </Text>
            </View>
          </View>
        </View>

        {isExpanded && children.map(child => renderOrganizerNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  const renderSelectedSummary = () => {
    if (selectedOrganizers.length === 0) {
      return null;
    }

    const selectedOrgs = selectedOrganizers
      .map(id => organizersHierarchy.find(o => o.id === id))
      .filter((org): org is FirestoreOrganizer => org !== undefined);

    return (
      <View style={styles.selectedSummary}>
        <Text style={styles.selectedSummaryTitle}>
          {selectedOrganizers.length} organizzator{selectedOrganizers.length === 1 ? 'e' : 'i'} selezionat{selectedOrganizers.length === 1 ? 'o' : 'i'}
        </Text>
        <View style={styles.selectedList}>
          {selectedOrgs.map(org => {
            const levelBadge = getLevelBadge(org.level);
            return (
              <View key={org.id} style={styles.selectedItem}>
                <Image source={{ uri: org.logo }} style={styles.selectedLogo} />
                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName}>{org.name}</Text>
                  <View style={[styles.selectedBadge, { backgroundColor: levelBadge.color }]}>
                    <Text style={styles.selectedBadgeText}>
                      {levelBadge.emoji} {getTerritorialLevelName(org.level)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => toggleSelection(org.id)}
                >
                  <IconSymbol
                    ios_icon_name="xmark"
                    android_material_icon_name="close"
                    size={16}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSelectedSummary()}

      <View style={styles.searchContainer}>
        <IconSymbol
          ios_icon_name="magnifyingglass"
          android_material_icon_name="search"
          size={20}
          color={colors.textSecondary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cerca organizzatore..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <IconSymbol
              ios_icon_name="xmark.circle.fill"
              android_material_icon_name="cancel"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <TouchableOpacity
          style={[styles.filterChip, regionFilter === null && styles.filterChipActive]}
          onPress={() => setRegionFilter(null)}
        >
          <Text style={[styles.filterChipText, regionFilter === null && styles.filterChipTextActive]}>
            Tutte le regioni
          </Text>
        </TouchableOpacity>
        {regions.map(region => (
          <TouchableOpacity
            key={region}
            style={[styles.filterChip, regionFilter === region && styles.filterChipActive]}
            onPress={() => setRegionFilter(region)}
          >
            <Text style={[styles.filterChipText, regionFilter === region && styles.filterChipTextActive]}>
              {region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.treeView} contentContainerStyle={styles.treeViewContent}>
        {rootOrganizers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nessun organizzatore trovato</Text>
          </View>
        ) : (
          rootOrganizers.map(org => renderOrganizerNode(org, 0))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedSummary: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  selectedSummaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  selectedList: {
    gap: 8,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 8,
  },
  selectedLogo: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 8,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  selectedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  selectedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.live,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  filterScroll: {
    marginBottom: 12,
  },
  filterChip: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  treeView: {
    flex: 1,
  },
  treeViewContent: {
    paddingBottom: 20,
  },
  organizerNode: {
    marginBottom: 8,
  },
  nodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 1,
  },
  expandButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButtonSpacer: {
    width: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
  },
  checkboxDisabled: {
    borderColor: '#CCCCCC',
    backgroundColor: '#F5F5F5',
  },
  organizerLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  organizerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  organizerPath: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  disabledText: {
    opacity: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
