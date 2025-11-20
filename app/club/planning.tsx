
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Activity, ActivityType } from '@/types';

type ViewMode = 'week' | 'month';

export default function ClubPlanning() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockActivities: Activity[] = [
    {
      id: 'activity_001',
      type: 'training',
      title: 'Allenamento Squadra A',
      description: 'Allenamento tecnico-tattico',
      clubId: 'club_001',
      teamId: 'team_001',
      sport: 'calcio',
      venueId: 'venue_001',
      venueName: 'Campo Comunale',
      startTime: new Date('2025-01-20T18:00:00'),
      endTime: new Date('2025-01-20T20:00:00'),
      participants: ['athlete_001', 'athlete_002'],
      maxParticipants: 22,
      status: 'scheduled',
      createdBy: 'user_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'activity_002',
      type: 'match',
      title: 'Partita Campionato',
      description: 'Milano vs Roma',
      clubId: 'club_001',
      teamId: 'team_001',
      sport: 'calcio',
      venueId: 'venue_002',
      venueName: 'Stadio San Siro',
      startTime: new Date('2025-01-22T15:00:00'),
      endTime: new Date('2025-01-22T17:00:00'),
      participants: ['athlete_001', 'athlete_002'],
      status: 'scheduled',
      createdBy: 'user_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'activity_003',
      type: 'training',
      title: 'Allenamento Portieri',
      description: 'Sessione specifica portieri',
      clubId: 'club_001',
      sport: 'calcio',
      venueId: 'venue_001',
      venueName: 'Campo Comunale',
      startTime: new Date('2025-01-21T17:00:00'),
      endTime: new Date('2025-01-21T18:30:00'),
      participants: ['athlete_003'],
      maxParticipants: 5,
      status: 'scheduled',
      createdBy: 'user_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'activity_004',
      type: 'meeting',
      title: 'Riunione Tecnica',
      description: 'Analisi video partite',
      clubId: 'club_001',
      sport: 'calcio',
      venueId: 'venue_003',
      venueName: 'Sede Società',
      startTime: new Date('2025-01-23T19:00:00'),
      endTime: new Date('2025-01-23T20:30:00'),
      participants: ['athlete_001', 'athlete_002'],
      status: 'scheduled',
      createdBy: 'user_001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'match':
        return '⚽';
      case 'training':
        return '🏃';
      case 'meeting':
        return '📋';
      case 'event':
        return '🎉';
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case 'match':
        return '#FF5722';
      case 'training':
        return '#4CAF50';
      case 'meeting':
        return '#2196F3';
      case 'event':
        return '#9C27B0';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const getWeekDays = () => {
    const days = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getActivitiesForDay = (day: Date) => {
    return mockActivities.filter(activity => {
      const activityDate = new Date(activity.startTime);
      return activityDate.toDateString() === day.toDateString();
    });
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
        {weekDays.map((day, dayIndex) => {
          const activities = getActivitiesForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <React.Fragment key={dayIndex}>
              <View style={styles.dayColumn}>
                <View style={[styles.dayHeader, isToday && styles.dayHeaderToday]}>
                  <Text style={[styles.dayName, isToday && styles.dayNameToday]}>
                    {day.toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase()}
                  </Text>
                  <Text style={[styles.dayNumber, isToday && styles.dayNumberToday]}>
                    {day.getDate()}
                  </Text>
                </View>

                <ScrollView style={styles.dayActivities} showsVerticalScrollIndicator={false}>
                  {activities.length === 0 ? (
                    <View style={styles.emptyDay}>
                      <Text style={styles.emptyDayText}>Nessuna attività</Text>
                    </View>
                  ) : (
                    activities.map((activity, actIndex) => (
                      <React.Fragment key={actIndex}>
                        <TouchableOpacity
                          style={[styles.activityCard, { borderLeftColor: getActivityColor(activity.type) }]}
                          onPress={() => Alert.alert(activity.title, activity.description || '')}
                        >
                          <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
                          <View style={styles.activityInfo}>
                            <Text style={styles.activityTime}>{formatTime(activity.startTime)}</Text>
                            <Text style={styles.activityTitle} numberOfLines={2}>{activity.title}</Text>
                            <Text style={styles.activityVenue} numberOfLines={1}>📍 {activity.venueName}</Text>
                          </View>
                        </TouchableOpacity>
                      </React.Fragment>
                    ))
                  )}
                </ScrollView>
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
    );
  };

  const renderMonthView = () => {
    const groupedActivities = mockActivities.reduce((acc, activity) => {
      const date = formatDate(activity.startTime);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, Activity[]>);

    return (
      <ScrollView style={styles.monthScroll} contentContainerStyle={styles.monthContent}>
        {Object.entries(groupedActivities).map(([date, activities], dateIndex) => (
          <React.Fragment key={dateIndex}>
            <View style={styles.dateSection}>
              <Text style={styles.dateHeader}>{date}</Text>
              {activities.map((activity, actIndex) => (
                <React.Fragment key={actIndex}>
                  <TouchableOpacity
                    style={[styles.monthActivityCard, { borderLeftColor: getActivityColor(activity.type) }]}
                    onPress={() => Alert.alert(activity.title, activity.description || '')}
                  >
                    <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityMeta}>
                        {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                      </Text>
                      <Text style={styles.activityVenue}>📍 {activity.venueName}</Text>
                      {activity.participants && (
                        <Text style={styles.activityParticipants}>
                          👥 {activity.participants.length} partecipanti
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
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
        <Text style={styles.headerTitle}>Planning</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Aggiungi Attività', 'Funzionalità in arrivo')}
        >
          <IconSymbol
            ios_icon_name="plus.circle.fill"
            android_material_icon_name="add_circle"
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'week' && styles.toggleButtonActive]}
            onPress={() => setViewMode('week')}
          >
            <Text style={[styles.toggleText, viewMode === 'week' && styles.toggleTextActive]}>
              Settimana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'month' && styles.toggleButtonActive]}
            onPress={() => setViewMode('month')}
          >
            <Text style={[styles.toggleText, viewMode === 'month' && styles.toggleTextActive]}>
              Mese
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getActivityColor('match') }]} />
            <Text style={styles.legendText}>Partite</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getActivityColor('training') }]} />
            <Text style={styles.legendText}>Allenamenti</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getActivityColor('meeting') }]} />
            <Text style={styles.legendText}>Riunioni</Text>
          </View>
        </View>
      </View>

      {viewMode === 'week' ? renderWeekView() : renderMonthView()}
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
  addButton: {
    padding: 4,
  },
  controls: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.card,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  weekScroll: {
    flex: 1,
  },
  dayColumn: {
    width: 180,
    marginRight: 12,
    paddingHorizontal: 8,
  },
  dayHeader: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  dayHeaderToday: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dayNameToday: {
    color: colors.card,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  dayNumberToday: {
    color: colors.card,
  },
  dayActivities: {
    flex: 1,
  },
  emptyDay: {
    padding: 20,
    alignItems: 'center',
  },
  emptyDayText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  activityIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  activityInfo: {
    gap: 4,
  },
  activityTime: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  activityVenue: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  monthScroll: {
    flex: 1,
  },
  monthContent: {
    padding: 16,
    paddingBottom: 100,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  monthActivityCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  activityMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activityParticipants: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
