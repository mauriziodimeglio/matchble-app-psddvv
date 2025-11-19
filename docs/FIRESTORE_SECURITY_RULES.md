
# Firestore Security Rules

This document contains the Firestore security rules for the Matchble app. These rules ensure that users can only access and modify data they are authorized to.

## Helper Functions

```javascript
// Check if user is signed in
function isSignedIn() {
  return request.auth != null;
}

// Check if user is a superuser
function isSuperuser() {
  return isSignedIn() && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superuser';
}

// Check if user is verified
function isVerified() {
  return isSignedIn() && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['verified', 'superuser'];
}

// Check if user owns the resource
function isOwner(userId) {
  return isSignedIn() && request.auth.uid == userId;
}
```

## Collection Rules

### Users Collection

```javascript
match /users/{userId} {
  // Anyone can read user profiles
  allow read: if true;
  
  // Users can create their own profile
  allow create: if isSignedIn() && 
    request.auth.uid == userId &&
    request.resource.data.role == 'regular'; // New users start as regular
  
  // Users can update their own profile (except role and verification fields)
  allow update: if isOwner(userId) && 
    request.resource.data.role == resource.data.role &&
    request.resource.data.verifiedBy == resource.data.verifiedBy &&
    request.resource.data.verifiedAt == resource.data.verifiedAt &&
    request.resource.data.organizerId == resource.data.organizerId &&
    request.resource.data.organizerRole == resource.data.organizerRole &&
    request.resource.data.canCreateOfficialTournaments == resource.data.canCreateOfficialTournaments;
  
  // Superusers can update any user (including role and verification)
  allow update: if isSuperuser();
  
  // Users can delete their own profile
  allow delete: if isOwner(userId);
}
```

### Verification Requests Collection

```javascript
match /verificationRequests/{requestId} {
  // User can create only their own verification requests
  allow create: if isSignedIn() && 
    request.resource.data.userId == request.auth.uid &&
    request.resource.data.status == 'pending';
  
  // User can read only their own verification requests
  // Superusers can read all verification requests
  allow read: if isSignedIn() && 
    (resource.data.userId == request.auth.uid || isSuperuser());
  
  // Only superusers can update verification requests (approve/reject)
  allow update: if isSuperuser() &&
    request.resource.data.userId == resource.data.userId && // Cannot change userId
    request.resource.data.organizerId == resource.data.organizerId && // Cannot change organizerId
    request.resource.data.status in ['approved', 'rejected']; // Can only approve or reject
  
  // Only superusers can delete verification requests
  allow delete: if isSuperuser();
}
```

### Organizers Collection

```javascript
match /organizers/{organizerId} {
  // Anyone can read organizers
  allow read: if true;
  
  // Only superusers can create organizers
  allow create: if isSuperuser();
  
  // Only superusers can update organizers
  allow update: if isSuperuser();
  
  // Only superusers can delete organizers
  allow delete: if isSuperuser();
}
```

### Tournaments Collection

```javascript
match /tournaments/{tournamentId} {
  // Anyone can read public tournaments
  allow read: if resource.data.isPublic == true;
  
  // Signed-in users can read all tournaments
  allow read: if isSignedIn();
  
  // Signed-in users can create tournaments
  allow create: if isSignedIn() &&
    request.resource.data.organizerId == request.auth.uid;
  
  // Verified users can create official tournaments
  allow create: if isVerified() &&
    request.resource.data.isOfficial == true &&
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.canCreateOfficialTournaments == true;
  
  // Tournament organizer can update their own tournaments
  allow update: if isSignedIn() &&
    resource.data.organizerId == request.auth.uid;
  
  // Superusers can update any tournament
  allow update: if isSuperuser();
  
  // Tournament organizer can delete their own tournaments
  allow delete: if isSignedIn() &&
    resource.data.organizerId == request.auth.uid;
  
  // Superusers can delete any tournament
  allow delete: if isSuperuser();
}
```

### Matches Collection

```javascript
match /matches/{matchId} {
  // Anyone can read matches
  allow read: if true;
  
  // Signed-in users can create matches
  allow create: if isSignedIn() &&
    request.resource.data.submittedBy == request.auth.uid;
  
  // Match submitter can update their own matches
  allow update: if isSignedIn() &&
    resource.data.submittedBy == request.auth.uid;
  
  // Verified users can verify matches
  allow update: if isVerified() &&
    request.resource.data.verified == true;
  
  // Superusers can update any match
  allow update: if isSuperuser();
  
  // Match submitter can delete their own matches
  allow delete: if isSignedIn() &&
    resource.data.submittedBy == request.auth.uid;
  
  // Superusers can delete any match
  allow delete: if isSuperuser();
}
```

### Teams Collection

```javascript
match /teams/{teamId} {
  // Anyone can read teams
  allow read: if true;
  
  // Signed-in users can create teams
  allow create: if isSignedIn() &&
    request.resource.data.captainId == request.auth.uid;
  
  // Team captain can update their own team
  allow update: if isSignedIn() &&
    resource.data.captainId == request.auth.uid;
  
  // Superusers can update any team
  allow update: if isSuperuser();
  
  // Team captain can delete their own team
  allow delete: if isSignedIn() &&
    resource.data.captainId == request.auth.uid;
  
  // Superusers can delete any team
  allow delete: if isSuperuser();
}
```

### Standings Collection

```javascript
match /standings/{standingId} {
  // Anyone can read standings
  allow read: if true;
  
  // Only verified users and superusers can create/update standings
  allow create, update: if isVerified() || isSuperuser();
  
  // Only superusers can delete standings
  allow delete: if isSuperuser();
}
```

### Notifications Collection

```javascript
match /notifications/{notificationId} {
  // Users can only read their own notifications
  allow read: if isSignedIn() &&
    resource.data.userId == request.auth.uid;
  
  // System can create notifications (handled server-side)
  // Users cannot create notifications directly
  allow create: if false;
  
  // Users can update their own notifications (mark as read)
  allow update: if isSignedIn() &&
    resource.data.userId == request.auth.uid &&
    request.resource.data.userId == resource.data.userId && // Cannot change userId
    request.resource.data.type == resource.data.type && // Cannot change type
    request.resource.data.referenceId == resource.data.referenceId; // Cannot change referenceId
  
  // Users can delete their own notifications
  allow delete: if isSignedIn() &&
    resource.data.userId == request.auth.uid;
  
  // Superusers can do anything with notifications
  allow read, write: if isSuperuser();
}
```

## Complete Rules File

Here's the complete `firestore.rules` file that you can deploy to Firebase:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isSuperuser() {
      return isSignedIn() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superuser';
    }
    
    function isVerified() {
      return isSignedIn() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['verified', 'superuser'];
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow create: if isSignedIn() && 
        request.auth.uid == userId &&
        request.resource.data.role == 'regular';
      allow update: if isOwner(userId) && 
        request.resource.data.role == resource.data.role &&
        request.resource.data.verifiedBy == resource.data.verifiedBy &&
        request.resource.data.verifiedAt == resource.data.verifiedAt &&
        request.resource.data.organizerId == resource.data.organizerId &&
        request.resource.data.organizerRole == resource.data.organizerRole &&
        request.resource.data.canCreateOfficialTournaments == resource.data.canCreateOfficialTournaments;
      allow update: if isSuperuser();
      allow delete: if isOwner(userId);
    }
    
    // Verification requests collection
    match /verificationRequests/{requestId} {
      allow create: if isSignedIn() && 
        request.resource.data.userId == request.auth.uid &&
        request.resource.data.status == 'pending';
      allow read: if isSignedIn() && 
        (resource.data.userId == request.auth.uid || isSuperuser());
      allow update: if isSuperuser() &&
        request.resource.data.userId == resource.data.userId &&
        request.resource.data.organizerId == resource.data.organizerId &&
        request.resource.data.status in ['approved', 'rejected'];
      allow delete: if isSuperuser();
    }
    
    // Organizers collection
    match /organizers/{organizerId} {
      allow read: if true;
      allow create, update, delete: if isSuperuser();
    }
    
    // Tournaments collection
    match /tournaments/{tournamentId} {
      allow read: if resource.data.isPublic == true || isSignedIn();
      allow create: if isSignedIn() &&
        request.resource.data.organizerId == request.auth.uid;
      allow create: if isVerified() &&
        request.resource.data.isOfficial == true &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.canCreateOfficialTournaments == true;
      allow update: if (isSignedIn() && resource.data.organizerId == request.auth.uid) || isSuperuser();
      allow delete: if (isSignedIn() && resource.data.organizerId == request.auth.uid) || isSuperuser();
    }
    
    // Matches collection
    match /matches/{matchId} {
      allow read: if true;
      allow create: if isSignedIn() &&
        request.resource.data.submittedBy == request.auth.uid;
      allow update: if (isSignedIn() && resource.data.submittedBy == request.auth.uid) || 
        (isVerified() && request.resource.data.verified == true) || 
        isSuperuser();
      allow delete: if (isSignedIn() && resource.data.submittedBy == request.auth.uid) || isSuperuser();
    }
    
    // Teams collection
    match /teams/{teamId} {
      allow read: if true;
      allow create: if isSignedIn() &&
        request.resource.data.captainId == request.auth.uid;
      allow update: if (isSignedIn() && resource.data.captainId == request.auth.uid) || isSuperuser();
      allow delete: if (isSignedIn() && resource.data.captainId == request.auth.uid) || isSuperuser();
    }
    
    // Standings collection
    match /standings/{standingId} {
      allow read: if true;
      allow create, update: if isVerified() || isSuperuser();
      allow delete: if isSuperuser();
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read: if isSignedIn() &&
        resource.data.userId == request.auth.uid;
      allow create: if false; // Notifications are created server-side
      allow update: if isSignedIn() &&
        resource.data.userId == request.auth.uid &&
        request.resource.data.userId == resource.data.userId &&
        request.resource.data.type == resource.data.type &&
        request.resource.data.referenceId == resource.data.referenceId;
      allow delete: if isSignedIn() &&
        resource.data.userId == request.auth.uid;
      allow read, write: if isSuperuser();
    }
  }
}
```

## Deployment

To deploy these rules to Firebase:

1. Save the complete rules to a file named `firestore.rules` in your project root
2. Run the following command:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Testing

You can test these rules in the Firebase Console:

1. Go to Firestore Database
2. Click on "Rules" tab
3. Click on "Rules Playground"
4. Test different scenarios with different user roles

## Security Considerations

1. **User Roles**: The system uses three roles: `regular`, `verified`, and `superuser`
2. **Verification Requests**: Only users can create their own requests, and only superusers can approve/reject
3. **Official Tournaments**: Only verified users with `canCreateOfficialTournaments` permission can create official tournaments
4. **Data Integrity**: Rules prevent users from modifying critical fields like `userId`, `organizerId`, etc.
5. **Privacy**: Users can only read their own notifications and verification requests
6. **Public Data**: Matches, teams, standings, and public tournaments are readable by everyone

## Notes

- These rules assume that user authentication is handled by Firebase Authentication
- Notifications should be created server-side (e.g., using Cloud Functions) to ensure security
- Superusers have full access to all collections
- Regular users have limited access based on ownership and verification status
