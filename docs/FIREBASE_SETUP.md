
# Firebase Firestore Database Setup for Matchble

This document provides a complete guide for setting up Firebase Firestore for the Matchble app.

## 📋 Table of Contents

1. [Collections Overview](#collections-overview)
2. [Firestore Indexes](#firestore-indexes)
3. [Security Rules](#security-rules)
4. [Data Models](#data-models)
5. [Implementation Guide](#implementation-guide)

---

## 🗂️ Collections Overview

The Matchble app uses 6 main Firestore collections:

### 1. **matches** - Match Results
Stores all match results (tournament and friendly matches)

**Document ID**: Auto-generated
**Key Fields**: sport, status, date, homeTeam, awayTeam, scores, location, tournament reference

### 2. **tournaments** - Tournament Information
Stores tournament details and configuration

**Document ID**: Auto-generated
**Key Fields**: name, sport, dates, location, teams, status, organizer

### 3. **teams** - Team Information
Stores team details and statistics

**Document ID**: Auto-generated
**Key Fields**: name, sport, captain, players, stats, city

### 4. **standings** - Tournament Standings
Stores current standings for each tournament

**Document ID**: `{tournamentId}_{teamId}` (composite)
**Key Fields**: position, points, played, won, drawn, lost, goals, form

### 5. **users** - User Profiles
Stores user information and preferences

**Document ID**: Firebase Auth UID
**Key Fields**: email, displayName, preferences, stats, trustScore

### 6. **notifications** - User Notifications
Stores notifications for users

**Document ID**: Auto-generated
**Key Fields**: userId, type, title, body, read status, references

---

## 🔍 Firestore Indexes

Create these composite indexes in Firebase Console for optimal query performance:

### matches Collection

```javascript
// Index 1: Query matches by sport, status, and date
{
  collectionGroup: "matches",
  queryScope: "COLLECTION",
  fields: [
    { fieldPath: "sport", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
    { fieldPath: "date", order: "DESCENDING" }
  ]
}

// Index 2: Query matches by tournament and date
{
  collectionGroup: "matches",
  queryScope: "COLLECTION",
  fields: [
    { fieldPath: "tournamentId", order: "ASCENDING" },
    { fieldPath: "date", order: "DESCENDING" }
  ]
}
```

### tournaments Collection

```javascript
// Index: Query tournaments by sport, status, and start date
{
  collectionGroup: "tournaments",
  queryScope: "COLLECTION",
  fields: [
    { fieldPath: "sport", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
    { fieldPath: "startDate", order: "DESCENDING" }
  ]
}
```

### standings Collection

```javascript
// Index: Query standings by tournament and points
{
  collectionGroup: "standings",
  queryScope: "COLLECTION",
  fields: [
    { fieldPath: "tournamentId", order: "ASCENDING" },
    { fieldPath: "points", order: "DESCENDING" }
  ]
}
```

### users Collection

```javascript
// Index: Query users by city and favorite sports
{
  collectionGroup: "users",
  queryScope: "COLLECTION",
  fields: [
    { fieldPath: "favoriteCity", order: "ASCENDING" },
    { fieldPath: "favoriteSports", order: "ASCENDING" }
  ]
}
```

---

## 🔒 Security Rules

Here are the recommended Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    
    function hasHighTrustScore() {
      return getUserData().trustScore >= 60;
    }
    
    // MATCHES COLLECTION
    match /matches/{matchId} {
      // Anyone can read matches
      allow read: if true;
      
      // Only authenticated users can create matches
      allow create: if isSignedIn() 
        && request.resource.data.submittedBy == request.auth.uid;
      
      // Only match submitter or high trust users can update
      allow update: if isSignedIn() 
        && (isOwner(resource.data.submittedBy) || hasHighTrustScore());
      
      // Only match submitter can delete
      allow delete: if isSignedIn() 
        && isOwner(resource.data.submittedBy);
    }
    
    // TOURNAMENTS COLLECTION
    match /tournaments/{tournamentId} {
      // Anyone can read tournaments
      allow read: if true;
      
      // Only authenticated users can create tournaments
      allow create: if isSignedIn() 
        && request.resource.data.organizerId == request.auth.uid;
      
      // Only tournament organizer can update
      allow update: if isSignedIn() 
        && isOwner(resource.data.organizerId);
      
      // Only tournament organizer can delete
      allow delete: if isSignedIn() 
        && isOwner(resource.data.organizerId);
    }
    
    // TEAMS COLLECTION
    match /teams/{teamId} {
      // Anyone can read teams
      allow read: if true;
      
      // Only authenticated users can create teams
      allow create: if isSignedIn() 
        && request.resource.data.captainId == request.auth.uid;
      
      // Only team captain can update
      allow update: if isSignedIn() 
        && isOwner(resource.data.captainId);
      
      // Only team captain can delete
      allow delete: if isSignedIn() 
        && isOwner(resource.data.captainId);
    }
    
    // STANDINGS COLLECTION
    match /standings/{standingId} {
      // Anyone can read standings
      allow read: if true;
      
      // Only system or tournament organizer can write standings
      // (In practice, use Cloud Functions to update standings)
      allow write: if false;
    }
    
    // USERS COLLECTION
    match /users/{userId} {
      // Users can read their own profile and public profiles
      allow read: if true;
      
      // Users can only create/update their own profile
      allow create: if isSignedIn() && isOwner(userId);
      allow update: if isSignedIn() && isOwner(userId);
      
      // Users cannot delete their profile (use Cloud Functions)
      allow delete: if false;
    }
    
    // NOTIFICATIONS COLLECTION
    match /notifications/{notificationId} {
      // Users can only read their own notifications
      allow read: if isSignedIn() 
        && isOwner(resource.data.userId);
      
      // Only system can create notifications (use Cloud Functions)
      allow create: if false;
      
      // Users can update their own notifications (mark as read)
      allow update: if isSignedIn() 
        && isOwner(resource.data.userId)
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['read', 'readAt']);
      
      // Users can delete their own notifications
      allow delete: if isSignedIn() 
        && isOwner(resource.data.userId);
    }
  }
}
```

---

## 📊 Data Models

### Match Document Example

```javascript
{
  id: "match_001",
  sport: "calcio",
  matchType: "tournament",
  date: Timestamp,
  status: "live",
  homeTeam: "FC Milano",
  awayTeam: "AS Roma",
  homeScore: 3,
  awayScore: 2,
  location: {
    name: "Stadio San Siro",
    address: "Via Piccolomini 5",
    city: "Milano",
    coordinates: { lat: 45.4780, lng: 9.1240 }
  },
  tournamentId: "tournament_001",
  tournamentName: "Coppa Italia Amatori",
  photos: ["url1", "url2"],
  submittedBy: "user_001",
  submittedByName: "Marco Rossi",
  verified: true,
  verificationStatus: "verified",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  mvp: "user_001",
  attendance: 150
}
```

### Standing Document Example

```javascript
{
  id: "tournament_001_team_001",
  tournamentId: "tournament_001",
  teamId: "team_001",
  teamName: "FC Milano",
  sport: "calcio",
  position: 1,
  played: 8,
  won: 6,
  drawn: 1,
  lost: 1,
  goalsFor: 22,
  goalsAgainst: 10,
  goalDifference: 12,
  points: 19,
  form: ["W", "W", "D", "W", "W"],
  lastUpdated: Timestamp
}
```

### User Document Example

```javascript
{
  uid: "user_001",
  email: "marco.rossi@email.com",
  displayName: "Marco Rossi",
  photoURL: "https://...",
  favoriteSports: ["calcio", "basket"],
  favoriteCity: "Milano",
  favoriteTeams: ["team_001", "team_003"],
  matchesSubmitted: 15,
  tournamentsCreated: 2,
  tournamentsJoined: 5,
  notificationsEnabled: true,
  notificationToken: "fcm_token_abc123",
  trustScore: 92,
  verifiedMatches: 14,
  rejectedMatches: 1,
  createdAt: Timestamp,
  lastActive: Timestamp
}
```

### Notification Document Example

```javascript
{
  id: "notif_001",
  userId: "user_001",
  type: "match_result",
  title: "Risultato Partita",
  body: "FC Milano ha vinto 3-2 contro AS Roma!",
  icon: "⚽",
  referenceId: "match_001",
  referenceType: "match",
  read: false,
  readAt: null,
  createdAt: Timestamp
}
```

---

## 🚀 Implementation Guide

### Step 1: Install Firebase SDK

Since this is an Expo app, you'll need to use the Firebase Web SDK:

```bash
npm install firebase
```

### Step 2: Initialize Firebase

Create a `config/firebase.ts` file:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "matchble-app.firebaseapp.com",
  projectId: "matchble-app",
  storageBucket: "matchble-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Step 3: Create Firestore Service Functions

Example for fetching standings:

```typescript
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { FirestoreStanding } from '@/types';

export async function getTournamentStandings(
  tournamentId: string
): Promise<FirestoreStanding[]> {
  const standingsRef = collection(db, 'standings');
  const q = query(
    standingsRef,
    where('tournamentId', '==', tournamentId),
    orderBy('points', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as FirestoreStanding[];
}
```

### Step 4: Use in Components

```typescript
import { useEffect, useState } from 'react';
import { getTournamentStandings } from '@/services/firestore';
import { FirestoreStanding } from '@/types';

export function StandingsScreen({ tournamentId }: { tournamentId: string }) {
  const [standings, setStandings] = useState<FirestoreStanding[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadStandings() {
      try {
        const data = await getTournamentStandings(tournamentId);
        setStandings(data);
      } catch (error) {
        console.error('Error loading standings:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadStandings();
  }, [tournamentId]);
  
  // Render standings...
}
```

---

## 📝 Notes

- **Timestamps**: Use Firebase `Timestamp` type for all date fields
- **Composite IDs**: Standings use format `{tournamentId}_{teamId}`
- **Denormalization**: Some data is duplicated (e.g., `tournamentName` in matches) for performance
- **Cloud Functions**: Use for automated tasks like updating standings, sending notifications
- **Real-time Updates**: Use `onSnapshot` for live data updates
- **Offline Support**: Firebase SDK includes offline persistence by default

---

## 🔗 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Expo + Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
