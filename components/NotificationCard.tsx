
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FirestoreNotification } from '@/types';
import { colors } from '@/styles/commonStyles';

interface NotificationCardProps {
  notification: FirestoreNotification;
  onPress?: () => void;
  onMarkAsRead?: () => void;
}

export function NotificationCard({ notification, onPress, onMarkAsRead }: NotificationCardProps) {
  const getTypeColor = () => {
    switch (notification.type) {
      case 'match_result':
        return colors.calcio;
      case 'tournament_start':
        return colors.basket;
      case 'tournament_update':
        return colors.volley;
      case 'team_invite':
        return colors.padel;
      default:
        return colors.accent;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Adesso';
    if (minutes < 60) return `${minutes}m fa`;
    if (hours < 24) return `${hours}h fa`;
    if (days < 7) return `${days}g fa`;
    
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read && styles.unreadContainer
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor() }]}>
          <Text style={styles.icon}>{notification.icon}</Text>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {notification.body}
          </Text>
          <Text style={styles.time}>
            {formatDate(notification.createdAt)}
          </Text>
        </View>

        {/* Unread Indicator */}
        {!notification.read && (
          <View style={styles.unreadDot} />
        )}
      </View>

      {/* Mark as Read Button */}
      {!notification.read && onMarkAsRead && (
        <TouchableOpacity
          style={styles.markReadButton}
          onPress={(e) => {
            e.stopPropagation();
            onMarkAsRead();
          }}
        >
          <Text style={styles.markReadText}>Segna come letto</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  unreadContainer: {
    backgroundColor: '#FFF9E6',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginLeft: 8,
    marginTop: 4,
  },
  markReadButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
