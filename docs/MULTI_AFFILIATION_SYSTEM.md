
# Multi-Affiliation System Implementation

## Overview

This document describes the implementation of the multi-affiliation system for Matchble, which allows users to be verified for multiple sports organizers simultaneously, with support for hierarchical territorial structures.

## Key Features

### 1. Hierarchical Organizer Structure

Organizers are structured in a territorial hierarchy:
- **Nazionale** (National): Top-level federations (e.g., FIGC, FIP, FIPAV, FIT)
- **Regionale** (Regional): Regional committees (e.g., FIGC Campania, FIP Lombardia)
- **Provinciale** (Provincial): Provincial delegations (e.g., FIGC Napoli, FIPAV Milano)
- **Comunale** (Municipal): Municipal committees
- **Locale** (Local): Local organizations

Each organizer has:
- `parentId`: Reference to parent organizer
- `rootId`: Reference to national federation
- `level`: Territorial level
- `territory`: Geographic information (region, province, city, code)
- `children`: Array of child organizer IDs
- `hierarchyPath`: Human-readable path (e.g., "FIGC > Campania > Napoli")

### 2. Multiple Affiliations

Users can have multiple active affiliations simultaneously:

```typescript
interface UserAffiliation {
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  role: string; // e.g., "Delegato Provinciale"
  verifiedBy: string; // superuser userId
  verifiedAt: Date;
  active: boolean;
}
```

Each affiliation represents a verified relationship between a user and an organizer, with a specific role.

### 3. Multi-Organizer Selector Component

The `MultiOrganizerSelector` component provides:

- **Tree View**: Hierarchical display of organizers with expand/collapse
- **Multi-Selection**: Select multiple organizers with checkboxes
- **Smart Validation**: Prevents selecting both parent and child organizers
- **Search**: Filter organizers by name, acronym, or full name
- **Region Filter**: Filter by geographic region
- **Visual Badges**: Color-coded badges for territorial levels
- **Selected Summary**: Shows all selected organizers with ability to remove

#### Usage Example

```typescript
<MultiOrganizerSelector
  selectedOrganizers={selectedOrganizerIds}
  onSelectionChange={setSelectedOrganizerIds}
  sportFilter="calcio"
  maxSelections={5}
/>
```

### 4. Enhanced Verification Request Flow

The verification request process now supports multiple affiliations:

#### Step 1: Select Organizers
- Use MultiOrganizerSelector to choose one or more organizers
- Visual feedback shows hierarchy and territorial level
- Validation prevents conflicting selections

#### Step 2: Specify Roles
- For each selected organizer, specify the user's role
- Suggested roles based on territorial level
- Quick-select chips for common roles

#### Step 3: Upload Documents
- ID card/document
- Delegation letter from organizer
- Camera or gallery upload options

#### Step 4: Motivation
- Explain why verification is needed
- Minimum 50 characters
- Character counter

#### Step 5: Review & Submit
- Summary of all selections
- Review all organizers and roles
- Checkbox to confirm information accuracy

### 5. Admin Dashboard Enhancements

The admin dashboard now displays:

#### Requests Tab
- Pending verification requests
- Quick approve/reject actions
- Detailed review option

#### Users Tab
- All verified users
- Expandable affiliation lists
- Individual affiliation management
- Revoke affiliation option
- Visual badges for territorial levels

#### Organizers Tab
- List of all organizers
- Add new organizer option
- Statistics and information

## Helper Functions

### Hierarchy Navigation

```typescript
// Get children of an organizer
getChildrenOrganizers(parentId: string): FirestoreOrganizer[]

// Get all parents up to root
getOrganizerParents(organizerId: string): FirestoreOrganizer[]

// Get full hierarchy path
getOrganizerHierarchy(organizerId: string): FirestoreOrganizer[]

// Check if organizer is descendant of another
isDescendantOf(organizerId: string, ancestorId: string): boolean

// Get all descendants (recursive)
getAllDescendants(organizerId: string): FirestoreOrganizer[]
```

### Affiliation Management

```typescript
// Get active affiliations
getActiveAffiliations(user: FirestoreUser): UserAffiliation[]

// Check if user has affiliation with organizer
hasAffiliationWith(user: FirestoreUser, organizerId: string): boolean

// Get all organizers user is affiliated with
getUserOrganizers(user: FirestoreUser): FirestoreOrganizer[]

// Check if user can manage organizer (includes parent hierarchy)
canUserManageOrganizer(user: FirestoreUser, organizerId: string): boolean

// Get suggested roles for territorial level
getSuggestedRoles(level: TerritorialLevel): string[]

// Validate affiliation data
validateAffiliation(affiliation: Partial<UserAffiliation>): { valid: boolean; errors: string[] }

// Check if two affiliations conflict
affiliationsConflict(aff1: UserAffiliation, aff2: UserAffiliation): boolean
```

### Verification Requests

```typescript
// Create multiple verification requests
createMultipleVerificationRequests(
  user: FirestoreUser,
  organizerRoles: Array<{ organizerId: string; role: string }>,
  data: Partial<FirestoreVerificationRequest>
): Array<Omit<FirestoreVerificationRequest, 'id'>>

// Approve request (creates affiliation)
approveVerificationRequest(
  request: FirestoreVerificationRequest,
  superuserId: string
): { user: Partial<FirestoreUser>, request: FirestoreVerificationRequest }

// Reject request
rejectVerificationRequest(
  request: FirestoreVerificationRequest,
  superuserId: string,
  reason: string
): FirestoreVerificationRequest
```

## Data Structure

### Organizer Hierarchy Example

```
FIGC (Nazionale)
├── FIGC Campania (Regionale)
│   ├── FIGC Napoli (Provinciale)
│   ├── FIGC Salerno (Provinciale)
│   └── FIGC Caserta (Provinciale)
├── FIGC Lombardia (Regionale)
│   ├── FIGC Milano (Provinciale)
│   └── FIGC Bergamo (Provinciale)
└── FIGC Lazio (Regionale)
    └── FIGC Roma (Provinciale)
```

### User with Multiple Affiliations Example

```typescript
{
  uid: "user123",
  displayName: "Mario Rossi",
  role: "verified",
  affiliations: [
    {
      organizerId: "org_figc_napoli",
      organizerName: "FIGC Napoli",
      organizerLogo: "...",
      role: "Delegato Provinciale",
      verifiedBy: "superuser456",
      verifiedAt: new Date("2024-01-15"),
      active: true
    },
    {
      organizerId: "org_csi_napoli",
      organizerName: "CSI Napoli",
      organizerLogo: "...",
      role: "Responsabile Comunicazione",
      verifiedBy: "superuser456",
      verifiedAt: new Date("2024-02-20"),
      active: true
    }
  ]
}
```

## Permissions & Access Control

### Tournament Creation

Users can create official tournaments for:
1. Organizers they are directly affiliated with
2. Child organizers of their affiliated organizers

Example: A user affiliated with "FIGC Campania" can create tournaments for:
- FIGC Campania
- FIGC Napoli
- FIGC Salerno
- FIGC Caserta

### Admin Actions

Superusers can:
- Approve/reject verification requests
- Revoke individual affiliations
- View all user affiliations
- Manage organizers

## UI/UX Features

### Visual Hierarchy

- **Tree View**: Indented display with expand/collapse arrows
- **Level Badges**: Color-coded badges for each territorial level
  - 🇮🇹 Nazionale (Gold)
  - 🏛️ Regionale (Green)
  - 🏢 Provinciale (Blue)
  - 🏘️ Comunale (Purple)
  - 📍 Locale (Orange)

### Smart Selection

- Prevents selecting both parent and child
- Disables conflicting options automatically
- Shows hierarchy path for context

### Search & Filter

- Real-time search by name, acronym, or full name
- Filter by region
- Filter by sport (when provided)

### Responsive Design

- Works on mobile and desktop
- Touch-friendly controls
- Smooth animations

## Implementation Notes

### Backwards Compatibility

The system maintains backwards compatibility with the old single-organizer model:
- Old `organizerId` and `organizerRole` fields are still supported
- Migration path: Convert old fields to first affiliation
- Gradual migration strategy

### Performance Considerations

- Efficient tree traversal algorithms
- Memoized hierarchy calculations
- Optimized search with debouncing
- Lazy loading for large organizer lists

### Future Enhancements

1. **Bulk Operations**: Approve/reject multiple requests at once
2. **Affiliation History**: Track changes over time
3. **Delegation**: Allow users to delegate permissions
4. **Notifications**: Alert users when affiliations change
5. **Analytics**: Dashboard for affiliation statistics
6. **Export**: Export affiliation data for reporting

## Testing Checklist

- [ ] Select single organizer
- [ ] Select multiple organizers
- [ ] Prevent parent-child selection
- [ ] Search functionality
- [ ] Region filter
- [ ] Expand/collapse tree nodes
- [ ] Submit verification request
- [ ] Approve request (creates affiliation)
- [ ] Reject request
- [ ] Revoke affiliation
- [ ] View user affiliations in dashboard
- [ ] Check permissions for tournament creation
- [ ] Backwards compatibility with old data

## Support

For questions or issues, contact the development team or refer to:
- `utils/organizerHelpers.ts` - Helper functions
- `components/MultiOrganizerSelector.tsx` - Selector component
- `app/profile/request-verification.tsx` - Verification flow
- `app/admin/dashboard.tsx` - Admin interface
