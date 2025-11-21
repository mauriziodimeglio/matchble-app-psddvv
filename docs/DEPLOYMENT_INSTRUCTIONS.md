
# 🚀 Matchble - Deployment Instructions

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration
Create a `.env` file in the root directory:

```env
# Admin Credentials
ADMIN_EMAIL=admin@matchble.it
ADMIN_PASSWORD=your_secure_password_here

# Expo Configuration
EXPO_PROJECT_ID=your_expo_project_id

# Firebase Configuration (when ready)
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Update app.json
```json
{
  "expo": {
    "name": "Matchble",
    "slug": "matchble",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/final_quest_240x240.png",
    "scheme": "matchble",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#007AFF"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.matchble.app",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "Matchble usa la tua posizione per mostrarti tornei e campi nelle vicinanze.",
        "NSCameraUsageDescription": "Matchble ha bisogno di accedere alla fotocamera per caricare foto delle partite.",
        "NSPhotoLibraryUsageDescription": "Matchble ha bisogno di accedere alla galleria per caricare foto delle partite."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#007AFF"
      },
      "package": "com.matchble.app",
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-localization",
      [
        "expo-notifications",
        {
          "icon": "./assets/images/notification-icon.png",
          "color": "#007AFF",
          "sounds": [
            "./assets/sounds/notification.wav"
          ]
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "your_eas_project_id"
      }
    }
  }
}
```

---

## 🔧 Development Setup

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# All platforms with tunnel
npm run dev
```

---

## 📱 Building for Production

### iOS Build

#### 1. Configure EAS
```bash
npm install -g eas-cli
eas login
eas build:configure
```

#### 2. Update eas.json
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "ios": {
        "bundleIdentifier": "com.matchble.app"
      },
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your_apple_id@email.com",
        "ascAppId": "your_app_store_connect_app_id",
        "appleTeamId": "your_apple_team_id"
      },
      "android": {
        "serviceAccountKeyPath": "./path/to/api-key.json",
        "track": "internal"
      }
    }
  }
}
```

#### 3. Build iOS App
```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

#### 4. Submit to App Store
```bash
eas submit --platform ios
```

---

### Android Build

#### 1. Generate Keystore
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore matchble.keystore -alias matchble -keyalg RSA -keysize 2048 -validity 10000
```

#### 2. Update eas.json for Android
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
```

#### 3. Build Android App
```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

#### 4. Submit to Google Play
```bash
eas submit --platform android
```

---

### Web Build

#### 1. Build for Web
```bash
npm run build:web
```

#### 2. Deploy to Hosting
```bash
# Example: Deploy to Netlify
netlify deploy --prod --dir=dist

# Example: Deploy to Vercel
vercel --prod

# Example: Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication
4. Enable Firestore Database
5. Enable Storage
6. Enable Cloud Messaging

### 2. Configure Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Tournaments collection
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.organizerId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['verified', 'superuser']);
    }
    
    // Matches collection
    match /matches/{matchId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && 
        (resource.data.submittedBy == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['verified', 'superuser']);
    }
    
    // Favorites collection
    match /favorites/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Configure Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /match_photos/{matchId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB max
        request.resource.contentType.matches('image/.*');
    }
    
    match /user_avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth.uid == userId && 
        request.resource.size < 2 * 1024 * 1024 && // 2MB max
        request.resource.contentType.matches('image/.*');
    }
    
    match /club_logos/{clubId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.resource.size < 2 * 1024 * 1024 && // 2MB max
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 4. Initialize Firebase in App
Update `firebase.json` or create a new Firebase configuration file:

```typescript
// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 🔔 Push Notifications Setup

### 1. Configure Expo Push Notifications
```bash
# Get your Expo push token
expo push:android:upload --api-key YOUR_FCM_SERVER_KEY
```

### 2. Update Notification Helpers
Update `utils/notificationHelpers.ts` with your Expo project ID:

```typescript
const token = await Notifications.getExpoPushTokenAsync({
  projectId: 'your-expo-project-id', // Replace with your actual project ID
});
```

### 3. Test Notifications
Use the Expo push notification tool:
https://expo.dev/notifications

---

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Install Detox
npm install -g detox-cli

# Build for testing
detox build --configuration ios.sim.debug

# Run tests
detox test --configuration ios.sim.debug
```

---

## 📊 Analytics Setup

### Google Analytics
```bash
expo install @react-native-firebase/analytics
```

### Mixpanel
```bash
expo install mixpanel-react-native
```

---

## 🔐 Security Checklist

- [ ] Environment variables are not committed to git
- [ ] API keys are stored securely
- [ ] Firebase security rules are configured
- [ ] Admin credentials are strong and secure
- [ ] HTTPS is enforced for all API calls
- [ ] User input is validated and sanitized
- [ ] Rate limiting is implemented
- [ ] Error messages don't expose sensitive information

---

## 📈 Performance Optimization

### Before Deployment
- [ ] Enable Hermes engine (Android)
- [ ] Optimize images (compress, use WebP)
- [ ] Remove console.log statements in production
- [ ] Enable ProGuard (Android)
- [ ] Implement code splitting
- [ ] Add caching strategies
- [ ] Optimize bundle size

### Monitoring
- [ ] Set up Sentry for error tracking
- [ ] Configure Firebase Performance Monitoring
- [ ] Set up analytics tracking
- [ ] Monitor app crashes
- [ ] Track user engagement metrics

---

## 🚀 Deployment Workflow

### 1. Pre-Release
```bash
# Update version in app.json
# Update CHANGELOG.md
# Run tests
npm test

# Build for all platforms
eas build --platform all --profile production
```

### 2. Release
```bash
# Submit to stores
eas submit --platform ios
eas submit --platform android

# Deploy web version
npm run build:web
# Deploy to your hosting provider
```

### 3. Post-Release
- Monitor crash reports
- Check analytics
- Respond to user feedback
- Plan next iteration

---

## 📝 Store Listings

### App Store (iOS)

**Name:** Matchble - Per chi gioca

**Subtitle:** Gestione tornei e risultati sportivi

**Description:**
```
Matchble è la piattaforma completa per gestire tornei, risultati e società sportive amatoriali in Italia.

FUNZIONALITÀ PRINCIPALI:
• Visualizza risultati in tempo reale
• Segui i tuoi tornei preferiti
• Ricevi notifiche personalizzate
• Gestisci la tua società sportiva
• Planning allenamenti e partite
• Caricamento massivo per delegati

SPORT SUPPORTATI:
⚽ Calcio
🏀 Basket
🏐 Volley
🎾 Padel

TIPI DI UTENTE:
• Ospite: Accesso immediato senza registrazione
• Atleta: Profilo personale e preferiti
• Delegato: Gestione tornei ufficiali
• Manager: Gestione completa società

Scarica ora e inizia a seguire i tuoi tornei preferiti!
```

**Keywords:** sport, tornei, calcio, basket, volley, padel, risultati, classifiche

**Category:** Sports

**Screenshots:** Prepare 6.5" and 5.5" screenshots

---

### Google Play (Android)

**Title:** Matchble - Per chi gioca

**Short Description:**
```
Gestione tornei e risultati sportivi per calcio, basket, volley e padel
```

**Full Description:**
```
Matchble è la piattaforma completa per gestire tornei, risultati e società sportive amatoriali in Italia.

🏆 FUNZIONALITÀ PRINCIPALI
• Visualizza risultati in tempo reale
• Segui i tuoi tornei preferiti
• Ricevi notifiche personalizzate
• Gestisci la tua società sportiva
• Planning allenamenti e partite
• Caricamento massivo per delegati

⚽ SPORT SUPPORTATI
• Calcio
• Basket
• Volley
• Padel

👥 TIPI DI UTENTE
• Ospite: Accesso immediato senza registrazione
• Atleta: Profilo personale e preferiti
• Delegato: Gestione tornei ufficiali
• Manager: Gestione completa società

📱 CARATTERISTICHE
• Design moderno e intuitivo
• Notifiche push personalizzabili
• Sincronizzazione multi-dispositivo
• Supporto offline
• Aggiornamenti in tempo reale

Scarica ora e inizia a seguire i tuoi tornei preferiti!
```

**Category:** Sports

**Content Rating:** Everyone

**Screenshots:** Prepare phone and tablet screenshots

---

## 🎉 Launch Checklist

### Pre-Launch
- [ ] All features tested
- [ ] App store listings prepared
- [ ] Screenshots and videos ready
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Support email configured
- [ ] Social media accounts created
- [ ] Landing page live

### Launch Day
- [ ] Submit to App Store
- [ ] Submit to Google Play
- [ ] Deploy web version
- [ ] Announce on social media
- [ ] Send press release
- [ ] Monitor for issues

### Post-Launch
- [ ] Respond to reviews
- [ ] Monitor analytics
- [ ] Fix critical bugs
- [ ] Plan updates
- [ ] Gather user feedback

---

## 📞 Support

### Technical Issues
- Email: tech@matchble.it
- Documentation: https://docs.matchble.it

### Business Inquiries
- Email: info@matchble.it
- Website: https://matchble.it

---

**Good luck with your launch! 🚀**

*Last Updated: January 2024*
*Version: 1.0.0*
