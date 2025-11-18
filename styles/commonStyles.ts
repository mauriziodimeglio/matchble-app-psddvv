
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#FF5722',
  secondary: '#1976D2',
  accent: '#607D8B',
  card: '#FFFFFF',
  highlight: '#FFCC80',
  
  // Sport-specific colors
  calcio: '#4CAF50',
  basket: '#FF9800',
  volley: '#2196F3',
  padel: '#9C27B0',
  
  // Status colors
  live: '#F44336',
  scheduled: '#FFC107',
  finished: '#9E9E9E',
  
  // Ranking colors
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(255, 87, 34, 0.4)',
    elevation: 8,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardLarge: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
  icon: {
    width: 80,
    height: 80,
  },
  iconSmall: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
