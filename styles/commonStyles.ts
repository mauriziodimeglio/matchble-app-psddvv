
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Sport } from '@/types';

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
  
  // UI Enhancement colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Neutral shades
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
};

export const sportLabels: Record<Sport, string> = {
  calcio: 'Calcio',
  basket: 'Basket',
  volley: 'Volley',
  padel: 'Padel',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 1,
  },
  md: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  lg: {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
    elevation: 4,
  },
  xl: {
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  outline: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  fab: {
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  text: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '900',
    textAlign: 'center',
    color: colors.text,
    marginBottom: spacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
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
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    width: '100%',
    ...shadows.md,
  },
  cardLarge: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginVertical: spacing.md,
    width: '100%',
    ...shadows.lg,
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
  divider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
});
