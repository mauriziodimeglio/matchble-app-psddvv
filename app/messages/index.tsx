
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { Conversation } from '@/types';

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockConversations: Conversation[] = [
    {
      id: 'conv_001',
      participants: ['user_001', 'user_002'],
      lastMessage: {
        id: 'msg_001',
        senderId: 'user_002',
        senderName: 'Luca Bianchi',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        receiverId: 'user_001',
        content: 'Ciao! Sei interessato a giocare nel nostro torneo?',
        read: false,
        createdAt: new Date('2025-01-15T18:30:00'),
      },
      unreadCount: 2,
      updatedAt: new Date('2025-01-15T18:30:00'),
    },
    {
      id: 'conv_002',
      participants: ['user_001', 'user_003'],
      lastMessage: {
        id: 'msg_002',
        senderId: 'user_001',
        senderName: 'Marco Rossi',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        receiverId: 'user_003',
        content: 'Perfetto, ci vediamo domani!',
        read: true,
        createdAt: new Date('2025-01-15T16:20:00'),
      },
      unreadCount: 0,
      updatedAt: new Date('2025-01-15T16:20:00'),
    },
  ];

  const filteredConversations = mockConversations.filter(conv =>
    conv.lastMessage.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m fa`;
    } else if (hours < 24) {
      return `${hours}h fa`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}g fa`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messaggi</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <IconSymbol
            ios_icon_name="magnifyingglass"
            android_material_icon_name="search"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cerca conversazione..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredConversations.map((conversation, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={styles.conversationCard}
              onPress={() => router.push(`/messages/${conversation.id}`)}
            >
              <Image
                source={{ uri: conversation.lastMessage.senderAvatar }}
                style={styles.avatar}
              />
              
              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.senderName}>{conversation.lastMessage.senderName}</Text>
                  <Text style={styles.timestamp}>{formatTime(conversation.lastMessage.createdAt)}</Text>
                </View>
                
                <View style={styles.messagePreview}>
                  <Text
                    style={[styles.messageText, !conversation.lastMessage.read && styles.messageTextUnread]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage.content}
                  </Text>
                  {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        {filteredConversations.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyText}>Nessun messaggio</Text>
            <Text style={styles.emptyDescription}>
              Inizia una conversazione dalla vetrina atleti
            </Text>
            <TouchableOpacity
              style={styles.showcaseButton}
              onPress={() => router.push('/showcase')}
            >
              <Text style={styles.showcaseButtonText}>Vai alla Vetrina</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  searchSection: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  conversationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  conversationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  messageTextUnread: {
    fontWeight: '700',
    color: colors.text,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.card,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  showcaseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  showcaseButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
});
