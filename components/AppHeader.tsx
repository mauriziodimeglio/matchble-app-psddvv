
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface AppHeaderProps {
  showNavigation?: boolean;
}

export default function AppHeader({ showNavigation = true }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.includes('/(home)');
    }
    return pathname.includes(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo - Always clickable to go home */}
        <TouchableOpacity 
          style={styles.logoContainer}
          onPress={() => router.push('/(tabs)/(home)/')}
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/1130396b-2aa5-4881-97af-7f098b638ae7.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Matchble</Text>
        </TouchableOpacity>

        {/* Navigation Links */}
        {showNavigation && (
          <View style={styles.navigation}>
            <TouchableOpacity
              style={[
                styles.navButton,
                isActive('/(tabs)/(home)/') && styles.navButtonActive
              ]}
              onPress={() => router.push('/(tabs)/(home)/')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="house.fill"
                android_material_icon_name="home"
                size={20}
                color={isActive('/(tabs)/(home)/') ? colors.primary : colors.text}
              />
              <Text style={[
                styles.navText,
                isActive('/(tabs)/(home)/') && styles.navTextActive
              ]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                isActive('/tournaments') && styles.navButtonActive
              ]}
              onPress={() => router.push('/(tabs)/tournaments')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="trophy.fill"
                android_material_icon_name="emoji_events"
                size={20}
                color={isActive('/tournaments') ? colors.primary : colors.text}
              />
              <Text style={[
                styles.navText,
                isActive('/tournaments') && styles.navTextActive
              ]}>
                Tornei
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                isActive('/profile') && styles.navButtonActive
              ]}
              onPress={() => router.push('/(tabs)/profile')}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="person.fill"
                android_material_icon_name="person"
                size={20}
                color={isActive('/profile') ? colors.primary : colors.text}
              />
              <Text style={[
                styles.navText,
                isActive('/profile') && styles.navTextActive
              ]}>
                Profilo
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
      android: {
        paddingTop: 48,
      },
      web: {
        paddingTop: 0,
      },
    }),
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 36,
    height: 36,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navButtonActive: {
    backgroundColor: `${colors.primary}15`,
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  navTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
