
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationData {
  type: 'match_result' | 'tournament_start' | 'tournament_update' | 'team_invite' | 'training_reminder';
  referenceId: string;
  title: string;
  body: string;
}

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }

    // Get push token for remote notifications
    if (Platform.OS !== 'web') {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id', // Replace with your Expo project ID
      });
      console.log('Push token:', token.data);
      // In a real app, send this token to your backend
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

/**
 * Schedule a local notification
 */
export async function scheduleLocalNotification(
  title: string,
  body: string,
  data: NotificationData,
  triggerSeconds: number = 0
): Promise<string | null> {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: triggerSeconds > 0 ? { seconds: triggerSeconds } : null,
    });

    console.log('Notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

/**
 * Cancel a scheduled notification
 */
export async function cancelNotification(notificationId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Notification cancelled:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
}

/**
 * Get all scheduled notifications
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

/**
 * Schedule a notification for a match result
 */
export async function scheduleMatchResultNotification(
  tournamentName: string,
  matchId: string,
  homeTeam: string,
  awayTeam: string,
  triggerSeconds: number = 0
): Promise<string | null> {
  return scheduleLocalNotification(
    `Nuovo Risultato - ${tournamentName}`,
    `${homeTeam} vs ${awayTeam}`,
    {
      type: 'match_result',
      referenceId: matchId,
      title: `Nuovo Risultato - ${tournamentName}`,
      body: `${homeTeam} vs ${awayTeam}`,
    },
    triggerSeconds
  );
}

/**
 * Schedule a notification for tournament start
 */
export async function scheduleTournamentStartNotification(
  tournamentName: string,
  tournamentId: string,
  startDate: Date
): Promise<string | null> {
  const now = new Date();
  const triggerSeconds = Math.max(0, Math.floor((startDate.getTime() - now.getTime()) / 1000));

  return scheduleLocalNotification(
    `Torneo in Partenza!`,
    `${tournamentName} inizia oggi!`,
    {
      type: 'tournament_start',
      referenceId: tournamentId,
      title: 'Torneo in Partenza!',
      body: `${tournamentName} inizia oggi!`,
    },
    triggerSeconds
  );
}

/**
 * Schedule a notification for training reminder
 */
export async function scheduleTrainingReminderNotification(
  activityTitle: string,
  activityId: string,
  startTime: Date,
  reminderMinutesBefore: number = 60
): Promise<string | null> {
  const now = new Date();
  const reminderTime = new Date(startTime.getTime() - reminderMinutesBefore * 60 * 1000);
  const triggerSeconds = Math.max(0, Math.floor((reminderTime.getTime() - now.getTime()) / 1000));

  return scheduleLocalNotification(
    `Promemoria Allenamento`,
    `${activityTitle} tra ${reminderMinutesBefore} minuti`,
    {
      type: 'training_reminder',
      referenceId: activityId,
      title: 'Promemoria Allenamento',
      body: `${activityTitle} tra ${reminderMinutesBefore} minuti`,
    },
    triggerSeconds
  );
}

/**
 * Add notification response listener
 */
export function addNotificationResponseListener(
  callback: (response: Notifications.NotificationResponse) => void
): Notifications.Subscription {
  return Notifications.addNotificationResponseReceivedListener(callback);
}

/**
 * Add notification received listener (for foreground notifications)
 */
export function addNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
): Notifications.Subscription {
  return Notifications.addNotificationReceivedListener(callback);
}
