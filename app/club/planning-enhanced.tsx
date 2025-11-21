
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { Sport, ActivityType, Activity } from '@/types';
import * as Haptics from 'expo-haptics';

type ViewMode = 'week' | 'month';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  activity?: Activity;
}

const daysOfWeek: Array<{ id: DayOfWeek; label: string; short: string }> = [
  { id: 'monday', label: 'Lunedì', short: 'Lun' },
  { id: 'tuesday', label: 'Martedì', short: 'Mar' },
  { id: 'wednesday', label: 'Mercoledì', short: 'Mer' },
  { id: 'thursday', label: 'Giovedì', short: 'Gio' },
  { id: 'friday', label: 'Venerdì', short: 'Ven' },
  { id: 'saturday', label: 'Sabato', short: 'Sab' },
  { id: 'sunday', label: 'Domenica', short: 'Dom' },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

export default function EnhancedPlanningScreen() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Mock data - in real app, fetch from database
  const venues = [
    { id: 'venue_1', name: 'Palestra Centrale', sport: 'basket' as Sport },
    { id: 'venue_2', name: 'Campo Calcio A', sport: 'calcio' as Sport },
    { id: 'venue_3', name: 'Campo Volley', sport: 'volley' as Sport },
    { id: 'venue_4', name: 'Campo Padel 1', sport: 'padel' as Sport },
  ];

  const teams = [
    { id: 'team_1', name: 'Under 15 Maschile', sport: 'basket' as Sport },
    { id: 'team_2', name: 'Prima Squadra', sport: 'calcio' as Sport },
    { id: 'team_3', name: 'Under 18 Femminile', sport: 'volley' as Sport },
    { id: 'team_4', name: 'Squadra A', sport: 'padel' as Sport },
  ];

  const mockActivities: Activity[] = [
    {
      id: 'act_1',
      type: 'training',
      title: 'Allenamento Under 15',
      description: 'Allenamento tecnico',
      clubId: 'club_1',
      teamId: 'team_1',
      sport: 'basket',
      venueId: 'venue_1',
      venueName: 'Palestra Centrale',
      startTime: new Date('2024-01-15T17:00:00'),
      endTime: new Date('2024-01-15T19:00:00'),
      participants: ['athlete_1', 'athlete_2'],
      maxParticipants: 15,
      status: 'scheduled',
      createdBy: 'user_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'act_2',
      type: 'match',
      title: 'Partita Campionato',
      clubId: 'club_1',
      teamId: 'team_2',
      sport: 'calcio',
      venueId: 'venue_2',
      venueName: 'Campo Calcio A',
      startTime: new Date('2024-01-16T15:00:00'),
      endTime: new Date('2024-01-16T17:00:00'),
      participants: ['athlete_3', 'athlete_4'],
      status: 'scheduled',
      createdBy: 'user_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const filteredVenues = selectedVenue === 'all' 
    ? venues 
    : venues.filter(v => v.id === selectedVenue);

  const getActivityColor = (type: ActivityType): string => {
    switch (type) {
      case 'training': return colors.secondary;
      case 'match': return colors.live;
      case 'meeting': return colors.scheduled;
      case 'event': return colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getActivityIcon = (type: ActivityType): { ios: string; android: string } => {
    switch (type) {
      case 'training': return { ios: 'figure.run', android: 'directions_run' };
      case 'match': return { ios: 'sportscourt.fill', android: 'sports_soccer' };
      case 'meeting': return { ios: 'person.3.fill', android: 'groups' };
      case 'event': return { ios: 'star.fill', android: 'star' };
      default: return { ios: 'calendar', android: 'event' };
    }
  };

  const handleAddActivity = (timeSlot: string, venueId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedTimeSlot(timeSlot);
    setShowAddModal(true);
  };

  const handleDeleteActivity = (activityId: string) => {
    Alert.alert(
      'Elimina Attività',
      'Sei sicuro di voler eliminare questa attività?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: () => {
            setActivities(activities.filter(a => a.id !== activityId));
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const renderWeekView = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.weekGrid}>
          {/* Time column */}
          <View style={styles.timeColumn}>
            <View style={styles.timeHeaderCell} />
            {timeSlots.map((time, index) => (
              <React.Fragment key={index}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Day columns */}
          {daysOfWeek.map((day, dayIndex) => (
            <React.Fragment key={dayIndex}>
              <View style={styles.dayColumn}>
                <View style={styles.dayHeaderCell}>
                  <Text style={styles.dayHeaderText}>{day.short}</Text>
                </View>
                {timeSlots.map((time, timeIndex) => {
                  const activity = activities.find(a => {
                    const activityDay = a.startTime.getDay();
                    const dayMap = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
                    const activityHour = a.startTime.getHours();
                    const slotHour = parseInt(time.split(':')[0]);
                    return dayMap[activityDay] === dayIndex && activityHour === slotHour;
                  });

                  return (
                    <React.Fragment key={timeIndex}>
                      <TouchableOpacity
                        style={[
                          styles.activityCell,
                          activity && { backgroundColor: `${getActivityColor(activity.type)}20` }
                        ]}
                        onPress={() => activity ? handleDeleteActivity(activity.id) : handleAddActivity(time, 'venue_1')}
                        onLongPress={() => activity && handleDeleteActivity(activity.id)}
                      >
                        {activity && (
                          <View style={styles.activityContent}>
                            <View style={[styles.activityIndicator, { backgroundColor: getActivityColor(activity.type) }]} />
                            <Text style={styles.activityTitle} numberOfLines={2}>
                              {activity.title}
                            </Text>
                            <Text style={styles.activityVenue} numberOfLines={1}>
                              {activity.venueName}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </React.Fragment>
                  );
                })}
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderVenueView = () => {
    return (
      <ScrollView style={styles.venueList}>
        {filteredVenues.map((venue, venueIndex) => (
          <React.Fragment key={venueIndex}>
            <View style={styles.venueCard}>
              <View style={styles.venueHeader}>
                <View style={styles.venueInfo}>
                  <Text style={styles.venueName}>{venue.name}</Text>
                  <Text style={styles.venueSport}>
                    {venue.sport === 'calcio' ? '⚽ Calcio' :
                     venue.sport === 'basket' ? '🏀 Basket' :
                     venue.sport === 'volley' ? '🏐 Volley' : '🎾 Padel'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddActivity('', venue.id)}
                >
                  <IconSymbol
                    ios_icon_name="plus.circle.fill"
                    android_material_icon_name="add_circle"
                    size={32}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.venueActivities}>
                {activities
                  .filter(a => a.venueId === venue.id)
                  .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                  .map((activity, actIndex) => {
                    const icon = getActivityIcon(activity.type);
                    return (
                      <React.Fragment key={actIndex}>
                        <TouchableOpacity
                          style={styles.activityItem}
                          onPress={() => handleDeleteActivity(activity.id)}
                        >
                          <View style={[styles.activityIconContainer, { backgroundColor: `${getActivityColor(activity.type)}20` }]}>
                            <IconSymbol
                              ios_icon_name={icon.ios}
                              android_material_icon_name={icon.android}
                              size={24}
                              color={getActivityColor(activity.type)}
                            />
                          </View>
                          <View style={styles.activityDetails}>
                            <Text style={styles.activityItemTitle}>{activity.title}</Text>
                            <Text style={styles.activityTime}>
                              {activity.startTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} - 
                              {activity.endTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <Text style={styles.activityParticipants}>
                              👥 {activity.participants.length}{activity.maxParticipants ? `/${activity.maxParticipants}` : ''}
                            </Text>
                          </View>
                          <IconSymbol
                            ios_icon_name="chevron.right"
                            android_material_icon_name="chevron_right"
                            size={20}
                            color={colors.textSecondary}
                          />
                        </TouchableOpacity>
                      </React.Fragment>
                    );
                  })}
                {activities.filter(a => a.venueId === venue.id).length === 0 && (
                  <Text style={styles.noActivitiesText}>Nessuna attività programmata</Text>
                )}
              </View>
            </View>
          </React.Fragment>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Planning Avanzato</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <IconSymbol ios_icon_name="gear" android_material_icon_name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'week' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('week')}
          >
            <Text style={[styles.viewModeText, viewMode === 'week' && styles.viewModeTextActive]}>
              📅 Settimana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'month' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('month')}
          >
            <Text style={[styles.viewModeText, viewMode === 'month' && styles.viewModeTextActive]}>
              🏢 Per Palestra
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'month' && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.venueFilter}>
            <TouchableOpacity
              style={[styles.venueFilterChip, selectedVenue === 'all' && styles.venueFilterChipActive]}
              onPress={() => setSelectedVenue('all')}
            >
              <Text style={[styles.venueFilterText, selectedVenue === 'all' && styles.venueFilterTextActive]}>
                Tutte
              </Text>
            </TouchableOpacity>
            {venues.map((venue, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={[styles.venueFilterChip, selectedVenue === venue.id && styles.venueFilterChipActive]}
                  onPress={() => setSelectedVenue(venue.id)}
                >
                  <Text style={[styles.venueFilterText, selectedVenue === venue.id && styles.venueFilterTextActive]}>
                    {venue.name}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activities.filter(a => a.type === 'training').length}</Text>
          <Text style={styles.statLabel}>Allenamenti</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activities.filter(a => a.type === 'match').length}</Text>
          <Text style={styles.statLabel}>Partite</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{venues.length}</Text>
          <Text style={styles.statLabel}>Palestre</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{teams.length}</Text>
          <Text style={styles.statLabel}>Squadre</Text>
        </View>
      </View>

      {/* Content */}
      {viewMode === 'week' ? renderWeekView() : renderVenueView()}

      {/* Add Activity FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <IconSymbol
          ios_icon_name="plus"
          android_material_icon_name="add"
          size={28}
          color={colors.card}
        />
      </TouchableOpacity>

      {/* Add Activity Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuova Attività</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <IconSymbol ios_icon_name="xmark" android_material_icon_name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.comingSoonText}>Funzionalità in sviluppo</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  viewModeContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.md,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  viewModeButtonActive: {
    backgroundColor: colors.primary,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  viewModeTextActive: {
    color: colors.card,
  },
  venueFilter: {
    flexDirection: 'row',
  },
  venueFilterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    marginRight: spacing.sm,
  },
  venueFilterChipActive: {
    backgroundColor: colors.primary,
  },
  venueFilterText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  venueFilterTextActive: {
    color: colors.card,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  weekGrid: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 60,
  },
  timeHeaderCell: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  timeCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayColumn: {
    width: 120,
    borderLeftWidth: 1,
    borderLeftColor: colors.gray300,
  },
  dayHeaderCell: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  dayHeaderText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
  },
  activityCell: {
    height: 60,
    padding: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  activityContent: {
    flex: 1,
  },
  activityIndicator: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: 0,
    borderRadius: borderRadius.full,
  },
  activityTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  activityVenue: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.textSecondary,
    paddingLeft: spacing.sm,
  },
  venueList: {
    flex: 1,
    padding: spacing.lg,
  },
  venueCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  venueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  venueSport: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  addButton: {
    padding: spacing.xs,
  },
  venueActivities: {
    gap: spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  activityParticipants: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  noActivitiesText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: spacing.lg,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  comingSoonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: spacing.xxl,
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
});
