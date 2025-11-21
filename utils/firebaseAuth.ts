
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { FirestoreUser } from '@/types';

// Email/Password Registration
export const registerWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const userData: Partial<FirestoreUser> = {
      uid: user.uid,
      email: user.email || '',
      displayName: `${firstName} ${lastName}`,
      photoURL: null,
      favoriteSports: [],
      favoriteCity: '',
      favoriteTeams: [],
      matchesSubmitted: 0,
      tournamentsCreated: 0,
      tournamentsJoined: 0,
      notificationsEnabled: true,
      notificationToken: null,
      trustScore: 50,
      verifiedMatches: 0,
      rejectedMatches: 0,
      role: 'regular',
      affiliations: [],
      canCreateOfficialTournaments: false,
      createdAt: new Date(),
      lastActive: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    console.error('Email registration error:', error);
    throw error;
  }
};

// Email/Password Login
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Email login error:', error);
    throw error;
  }
};

// Google Sign-In
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // Create user document for new Google users
      const userData: Partial<FirestoreUser> = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL,
        favoriteSports: [],
        favoriteCity: '',
        favoriteTeams: [],
        matchesSubmitted: 0,
        tournamentsCreated: 0,
        tournamentsJoined: 0,
        notificationsEnabled: true,
        notificationToken: null,
        trustScore: 50,
        verifiedMatches: 0,
        rejectedMatches: 0,
        role: 'regular',
        affiliations: [],
        canCreateOfficialTournaments: false,
        createdAt: new Date(),
        lastActive: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
      });
    }

    return user;
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

// Apple Sign-In
export const signInWithApple = async (): Promise<User> => {
  try {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (!userDoc.exists()) {
      // Create user document for new Apple users
      const userData: Partial<FirestoreUser> = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Apple User',
        photoURL: user.photoURL,
        favoriteSports: [],
        favoriteCity: '',
        favoriteTeams: [],
        matchesSubmitted: 0,
        tournamentsCreated: 0,
        tournamentsJoined: 0,
        notificationsEnabled: true,
        notificationToken: null,
        trustScore: 50,
        verifiedMatches: 0,
        rejectedMatches: 0,
        role: 'regular',
        affiliations: [],
        canCreateOfficialTournaments: false,
        createdAt: new Date(),
        lastActive: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
      });
    }

    return user;
  } catch (error: any) {
    console.error('Apple sign-in error:', error);
    throw error;
  }
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Update user profile type
export const updateProfileType = async (
  userId: string,
  profileType: string
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'users', userId),
      {
        profileType,
        completedOnboarding: true,
        lastActive: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error: any) {
    console.error('Update profile type error:', error);
    throw error;
  }
};
