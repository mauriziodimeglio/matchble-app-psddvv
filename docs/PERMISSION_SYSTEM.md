
# Multi-Level Permission System Documentation

## Overview

The Matchble app implements a comprehensive multi-level permission system that allows superusers to grant granular permissions to verified delegates. Each delegate can have multiple affiliations with different organizers, and each affiliation can have its own set of permissions.

## Architecture

### 1. Permission Types

The system defines 19 granular permissions across 6 categories:

#### 🏆 Tournaments
- `tournaments_createOfficial` - Create official tournaments
- `tournaments_modifyOwn` - Modify own tournaments
- `tournaments_modifyAll` - Modify all tournaments
- `tournaments_delete` - Delete tournaments

#### 📊 Results
- `results_insert` - Insert match results
- `results_bulkImportCSV` - Bulk import results from CSV
- `results_modifyOwn` - Modify own results
- `results_modifyAll` - Modify all results
- `results_verifyOthers` - Verify/approve results from others

#### 🏢 Organizers
- `organizers_manageOwn` - Manage only affiliated organizers
- `organizers_manageAll` - Manage all organizers

#### 👥 Users
- `users_viewList` - View list of users
- `users_approveVerifications` - Approve verification requests (superuser only)
- `users_revokeVerifications` - Revoke verifications (superuser only)

#### 📈 Analytics
- `analytics_viewOwn` - View statistics for own organizers
- `analytics_viewAll` - View statistics for all organizers

#### ⚙️ System
- `system_adminPanel` - Access admin panel
- `system_manageReports` - Manage reports and complaints
- `system_createSuperuser` - Create other superusers (superuser only)

### 2. Permission Presets

Three predefined permission presets are available for quick configuration:

#### 📝 Base
**Description:** Create official tournaments, bulk import results, modify own results

**Permissions:**
- ✅ Create official tournaments
- ✅ Modify own tournaments
- ✅ Insert results
- ✅ Bulk import CSV
- ✅ Modify own results
- ✅ Manage own organizers
- ✅ View own analytics

**Use Case:** Entry-level delegates who need to create tournaments and manage results for their organizers.

#### 👔 Manager
**Description:** All Base permissions + Verify others' results + Analytics for own organizers

**Permissions:**
- ✅ All Base permissions
- ✅ Modify all tournaments
- ✅ Modify all results
- ✅ Verify others' results
- ✅ View user list
- ✅ Manage reports

**Use Case:** Senior delegates who need to oversee and verify work from other delegates.

#### ⚙️ Custom
**Description:** Manually select each individual permission

**Permissions:** Configured by superuser on a per-permission basis

**Use Case:** Special cases requiring specific permission combinations.

### 3. User Roles

#### Regular User
- Can view all results and standings
- Can create non-official tournaments
- Cannot create official tournaments
- No special permissions

#### Verified Delegate
- Has one or more affiliations with organizers
- Each affiliation has its own permission set
- Can create official tournaments for affiliated organizers
- Permissions are granular and configurable per affiliation

#### Superuser
- Full system access
- Can approve/reject verification requests
- Can configure permissions for each affiliation
- Can revoke affiliations
- Can create other superusers

## User Flows

### 1. Verification Request Flow

#### Step 1: Select Organizers
- User selects one or more organizers from hierarchical tree view
- Tree view shows national → regional → provincial → local structure
- User can filter by sport and region
- Validation prevents selecting both parent and child organizers

#### Step 2: Specify Roles
- For each selected organizer, user specifies their role
- Suggested roles based on territorial level:
  - **Nazionale:** Dirigente Nazionale, Responsabile Comunicazione, Coordinatore Tecnico
  - **Regionale:** Delegato Regionale, Dirigente Regionale, Responsabile Comunicazione Regionale
  - **Provinciale:** Delegato Provinciale, Arbitro, Istruttore
  - **Comunale/Locale:** Responsabile Locale, Istruttore, Arbitro

#### Step 3: Upload Documents
- **Documento d'Identità:** Photo or scan of ID card
- **Lettera di Delega:** Official delegation letter from organizer
- Documents can be uploaded via camera or gallery

#### Step 4: Motivation
- User provides text explanation (min 50 characters, max 500)
- Explains why they need verified account
- Example: "Gestisco i tornei per FIPAV Napoli e ho bisogno di creare tornei ufficiali"

#### Step 5: Review & Submit
- User reviews all information
- Must accept declaration of truthfulness
- Request is submitted with status "pending"
- All superusers receive notification

### 2. Superuser Review Flow

#### View Request
- Superuser sees all pending requests in admin dashboard
- Can view full request details including:
  - User information
  - Organizer and role
  - Uploaded documents (with preview)
  - Motivation text
  - Request timestamp

#### Configure Permissions
- For each organizer in the request, superuser selects:
  - **Preset:** Base, Manager, or Custom
  - **Custom Permissions:** If Custom selected, configure each permission individually

#### Approve or Reject
- **Approve:**
  - Creates affiliation with selected permissions
  - User role becomes "verified"
  - User receives notification with permission details
  - User can immediately start using granted permissions

- **Reject:**
  - Superuser must provide rejection reason (min 20 characters)
  - User receives notification with reason
  - User can submit new request after addressing issues

### 3. Multiple Affiliations

#### Adding New Affiliations
- Verified users can request additional affiliations
- Each affiliation is independent
- Example: User can be "Delegato FIPAV Napoli" + "Arbitro FIPAV Campania" + "Dirigente CSI Napoli"

#### Managing Affiliations
- Superuser can view all user affiliations in admin dashboard
- Can revoke individual affiliations without affecting others
- Can suspend affiliation (set active = false) temporarily

#### Permission Inheritance
- Permissions are per-affiliation, not per-user
- User's effective permissions = union of all active affiliation permissions
- Example: If user has "results_insert" in one affiliation and "results_verifyOthers" in another, they have both

## Technical Implementation

### Type Definitions

```typescript
// Permission types
export interface PermissionsType {
  tournaments_createOfficial: boolean;
  tournaments_modifyOwn: boolean;
  // ... 17 more permissions
}

export type PermissionPreset = 'base' | 'manager' | 'custom';

// User affiliation with permissions
export interface UserAffiliation {
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  role: string;
  verifiedBy: string;
  verifiedAt: Date;
  active: boolean;
  permissions?: PermissionsType;
  permissionsPreset?: PermissionPreset;
}

// User with multiple affiliations
export interface FirestoreUser {
  uid: string;
  role: UserRole;
  affiliations: UserAffiliation[];
  // ... other fields
}
```

### Components

#### PermissionSelector
- Displays permission presets as cards
- Shows custom permission configuration UI
- Organized by category with expand/collapse
- Shows count of enabled permissions per category

#### MultiOrganizerSelector
- Hierarchical tree view of organizers
- Checkbox selection with validation
- Prevents selecting parent + child
- Shows territorial level badges
- Filter by sport and region

### Helper Functions

```typescript
// Check if user has specific permission
hasPermission(permissions: PermissionsType, permission: keyof PermissionsType): boolean

// Get all enabled permissions
getEnabledPermissions(permissions: PermissionsType): Array<keyof PermissionsType>

// Count enabled permissions
countEnabledPermissions(permissions: PermissionsType): number

// Get permission preset configuration
getPermissionPreset(presetId: PermissionPreset): PermissionPresetConfig

// Check if user can manage organizer
canUserManageOrganizer(user: FirestoreUser, organizerId: string): boolean

// Get active affiliations
getActiveAffiliations(user: FirestoreUser): UserAffiliation[]
```

## Security Considerations

### 1. Authorization Checks
- All permission checks must be performed server-side
- Client-side checks are for UI only
- Firestore security rules enforce permissions

### 2. Superuser Actions
- Only superusers can approve/reject verification requests
- Only superusers can configure permissions
- Only superusers can revoke affiliations
- Superuser creation requires existing superuser permission

### 3. Affiliation Validation
- Documents must be verified before approval
- Delegation letters must be from official organizers
- Superuser must verify user identity

### 4. Permission Scope
- Permissions are scoped to affiliated organizers
- User cannot perform actions outside their affiliations
- Hierarchical permissions: affiliation with parent grants access to children

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isSuperuser() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superuser';
    }
    
    function isVerified() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['verified', 'superuser'];
    }
    
    function hasPermission(permission) {
      let user = get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
      return user.affiliations.hasAny([permission]);
    }
    
    function hasAffiliationWith(organizerId) {
      let user = get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
      return user.affiliations.hasAny([organizerId]);
    }
    
    // Verification requests
    match /verificationRequests/{requestId} {
      allow read: if isSuperuser() || resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
      allow update: if isSuperuser();
      allow delete: if isSuperuser();
    }
    
    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId || isSuperuser();
      allow delete: if isSuperuser();
    }
    
    // Tournaments
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow create: if isVerified() && hasPermission('tournaments_createOfficial');
      allow update: if isSuperuser() || 
                      (hasPermission('tournaments_modifyOwn') && resource.data.createdBy == request.auth.uid) ||
                      (hasPermission('tournaments_modifyAll') && hasAffiliationWith(resource.data.organizerId));
      allow delete: if isSuperuser() || hasPermission('tournaments_delete');
    }
    
    // Matches/Results
    match /matches/{matchId} {
      allow read: if true;
      allow create: if isAuthenticated() && hasPermission('results_insert');
      allow update: if isSuperuser() ||
                      (hasPermission('results_modifyOwn') && resource.data.submittedBy == request.auth.uid) ||
                      (hasPermission('results_modifyAll')) ||
                      (hasPermission('results_verifyOthers'));
      allow delete: if isSuperuser();
    }
  }
}
```

## UI/UX Guidelines

### Visual Hierarchy
1. **Permission Presets:** Large cards with emoji, name, and description
2. **Custom Permissions:** Collapsible categories with checkboxes
3. **Affiliation Display:** Logo + name + level badge + role

### Color Coding
- **Nazionale:** 🇮🇹 Gold (#FFD700)
- **Regionale:** 🏛️ Green (#4CAF50)
- **Provinciale:** 🏢 Blue (#2196F3)
- **Comunale:** 🏘️ Purple (#9C27B0)
- **Locale:** 📍 Orange (#FF9800)

### Feedback
- ✅ Success: Green with checkmark
- ❌ Error: Red with X
- ⏳ Pending: Yellow with clock
- 🔓 Revoked: Gray with lock

## Future Enhancements

### 1. Permission Templates
- Save custom permission configurations as templates
- Reuse templates for similar roles
- Share templates across organizers

### 2. Time-Limited Permissions
- Set expiration dates for affiliations
- Automatic revocation after expiration
- Renewal workflow

### 3. Permission Audit Log
- Track all permission changes
- Show who granted/revoked permissions
- Show when permissions were used

### 4. Delegation
- Allow managers to delegate permissions to sub-delegates
- Hierarchical delegation with limits
- Temporary delegation for specific events

### 5. Bulk Operations
- Approve multiple requests at once
- Assign same permissions to multiple users
- Bulk revocation

## Testing Checklist

### Verification Request
- [ ] Can select multiple organizers
- [ ] Cannot select parent + child
- [ ] Role suggestions work correctly
- [ ] Document upload works (camera + gallery)
- [ ] Motivation validation (min 50 chars)
- [ ] Declaration checkbox required
- [ ] Request appears in admin dashboard

### Permission Configuration
- [ ] Base preset has correct permissions
- [ ] Manager preset has correct permissions
- [ ] Custom preset allows individual selection
- [ ] Permission count updates correctly
- [ ] Categories expand/collapse
- [ ] Checkboxes toggle correctly

### Approval Flow
- [ ] Superuser can view all requests
- [ ] Document preview works
- [ ] Permission selector appears
- [ ] Approval creates affiliation
- [ ] User receives notification
- [ ] User role becomes "verified"

### Rejection Flow
- [ ] Rejection reason required (min 20 chars)
- [ ] User receives notification with reason
- [ ] Request status becomes "rejected"

### Multiple Affiliations
- [ ] User can have multiple affiliations
- [ ] Each affiliation has independent permissions
- [ ] Affiliations display correctly in dashboard
- [ ] Can revoke individual affiliation
- [ ] Revocation doesn't affect other affiliations

### Permission Checks
- [ ] User can only perform actions they have permission for
- [ ] Permissions are scoped to affiliated organizers
- [ ] Superuser has all permissions
- [ ] Regular user has no special permissions

## Support & Troubleshooting

### Common Issues

**Issue:** User cannot create official tournaments after approval
- **Solution:** Check that affiliation is active and has `tournaments_createOfficial` permission

**Issue:** Permission changes not reflected immediately
- **Solution:** User may need to log out and log back in to refresh permissions

**Issue:** Cannot select organizer in tree view
- **Solution:** Check if parent or child is already selected (validation prevents this)

**Issue:** Verification request stuck in pending
- **Solution:** Ensure superuser has reviewed and taken action (approve/reject)

### Contact
For technical support or questions about the permission system, contact the development team.
