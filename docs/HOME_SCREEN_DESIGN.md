
# Home Screen Design Documentation

## Overview

The home screen has been redesigned to be more visually appealing and provide quick, immediate sport selection. The new design features a hero section, large sport selection cards, stats bar, and improved content organization.

## Design Principles

1. **Visual First:** Large, colorful elements that catch the eye
2. **Quick Access:** Sport selection is immediate and prominent
3. **Clear Hierarchy:** Important information is prioritized
4. **Engaging:** Gradients and animations make the app feel modern
5. **Informative:** Stats bar provides quick overview

## Layout Structure

```
┌─────────────────────────────────────┐
│         Hero Section                │
│    (Purple Gradient Banner)         │
│      Matchble - Per chi gioca       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│    Scegli il tuo sport              │
│  ┌──────────┐  ┌──────────┐        │
│  │  Calcio  │  │  Basket  │        │
│  │    ⚽    │  │    🏀    │        │
│  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐        │
│  │  Volley  │  │  Padel   │        │
│  │    🏐    │  │    🎾    │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Stats Bar                          │
│  [12 Partite] [3 Live] [9 Concluse]│
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  🔴 LIVE ORA                        │
│  ┌─────────────────────────────┐   │
│  │   Large Match Card          │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  📋 Altri Risultati                 │
│  ┌──────────┐  ┌──────────┐        │
│  │  Match   │  │  Match   │        │
│  │  Card    │  │  Card    │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
```

## Components

### 1. Hero Section

**Purpose:** Brand identity and app introduction

**Design:**
- Purple gradient background (#667eea → #764ba2)
- Large "Matchble" title (42pt, bold)
- "Per chi gioca" subtitle (18pt, semi-bold)
- Descriptive text (14pt, regular)
- Rounded corners (20px)
- Shadow for depth

**Dimensions:**
- Padding: 32px all sides
- Margin: 16px horizontal, 24px bottom
- Border radius: 20px

**Colors:**
- Gradient: Linear from #667eea to #764ba2
- Text: White (#FFFFFF)
- Text shadow: rgba(0, 0, 0, 0.3)

### 2. Sport Quick Select

**Purpose:** Immediate sport filtering

**Design:**
- 2x2 grid of large cards
- Each card has gradient background
- Large emoji icon (48pt)
- Sport name (18pt, bold)
- Checkmark when selected
- Tap to select/deselect

**Sport Configurations:**

#### Calcio (⚽)
- Gradient: #00C853 → #00E676 (Green)
- Icon: soccerball / sports_soccer
- Name: "Calcio"

#### Basket (🏀)
- Gradient: #FF6D00 → #FF9100 (Orange)
- Icon: basketball.fill / sports_basketball
- Name: "Basket"

#### Volley (🏐)
- Gradient: #2979FF → #448AFF (Blue)
- Icon: volleyball.fill / sports_volleyball
- Name: "Volley"

#### Padel (🎾)
- Gradient: #D500F9 → #E040FB (Purple)
- Icon: tennisball.fill / sports_tennis
- Name: "Padel"

**Dimensions:**
- Card width: 50% (2 columns)
- Card padding: 24px
- Card margin: 6px
- Min height: 140px
- Border radius: 16px

**Interaction:**
- Tap to select/deselect
- Scale animation (0.98) when selected
- Checkmark icon appears in top-right corner
- Active opacity: 0.7

### 3. Stats Bar

**Purpose:** Quick overview of match statistics

**Design:**
- White card with shadow
- 3 stats in a row
- Large numbers (28pt, bold)
- Small labels (12pt, uppercase)
- Dividers between stats

**Stats:**
1. **Total Matches:** Count of all matches
2. **Live Matches:** Count with red color
3. **Finished Matches:** Count of completed matches

**Dimensions:**
- Padding: 20px
- Margin: 16px horizontal, 24px bottom
- Border radius: 16px

**Colors:**
- Background: White card
- Numbers: Primary color (except Live = red)
- Labels: Secondary text color
- Dividers: #E0E0E0

### 4. Live Section

**Purpose:** Highlight ongoing matches

**Design:**
- Section header with pulsing red dot
- "LIVE ORA" title (22pt, bold)
- Large match cards
- Red accent color

**Features:**
- Pulsing dot animation (12px diameter)
- Only shown when live matches exist
- Large cards for better visibility
- Red color (#FF3B30) for urgency

### 5. Results Section

**Purpose:** Display all other matches

**Design:**
- Section title with emoji
- 2-column grid of match cards
- Standard match card size
- Pull to refresh

**Title:**
- "📋 Altri Risultati" (if live matches exist)
- "📋 Risultati" (if no live matches)

### 6. Empty State

**Purpose:** Inform user when no matches found

**Design:**
- Large emoji (64pt)
- Title text (18pt, bold)
- Subtitle text (14pt, regular)
- Centered layout
- Generous padding

**Content:**
- Emoji: 🏆
- Title: "Nessun risultato per questo sport"
- Subtitle: "Prova a selezionare un altro sport o torna più tardi"

## Color Palette

### Primary Colors
- **Primary:** #007AFF (Blue)
- **Secondary:** #5856D6 (Purple)
- **Success:** #34C759 (Green)
- **Warning:** #FF9500 (Orange)
- **Error:** #FF3B30 (Red)

### Sport Gradients
- **Calcio:** #00C853 → #00E676 (Green)
- **Basket:** #FF6D00 → #FF9100 (Orange)
- **Volley:** #2979FF → #448AFF (Blue)
- **Padel:** #D500F9 → #E040FB (Purple)

### Hero Gradient
- **Start:** #667eea (Purple-Blue)
- **End:** #764ba2 (Purple)

### Neutral Colors
- **Background:** #F5F5F5 (Light Gray)
- **Card:** #FFFFFF (White)
- **Text:** #000000 (Black)
- **Text Secondary:** #8E8E93 (Gray)
- **Divider:** #E0E0E0 (Light Gray)

## Typography

### Font Weights
- **900:** Hero title, section titles
- **800:** Sport names, card titles
- **700:** Subtitles, labels
- **600:** Secondary text
- **400:** Body text, descriptions

### Font Sizes
- **42pt:** Hero title
- **28pt:** Stat values
- **24pt:** Quick select title
- **22pt:** Section titles
- **18pt:** Sport names, empty state title
- **16pt:** Body text
- **14pt:** Descriptions, empty state subtitle
- **12pt:** Stat labels, small text

## Spacing

### Margins
- **Screen padding:** 16px horizontal
- **Section spacing:** 24px vertical
- **Card spacing:** 12px between cards
- **Grid gap:** 6px between grid items

### Padding
- **Hero section:** 32px all sides
- **Sport cards:** 24px all sides
- **Stats bar:** 20px all sides
- **Section content:** 16px horizontal

### Border Radius
- **Hero section:** 20px
- **Sport cards:** 16px
- **Stats bar:** 16px
- **Match cards:** 12px
- **Badges:** 8px

## Animations

### Sport Card Selection
```typescript
// Scale down slightly when selected
transform: [{ scale: 0.98 }]
```

### Live Dot Pulse
```typescript
// Pulsing animation for live indicator
// Implementation using Animated API or CSS animation
```

### Pull to Refresh
```typescript
// Standard RefreshControl
<RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
  tintColor={colors.primary}
  colors={[colors.primary]}
/>
```

## Responsive Behavior

### Sport Cards
- Always 2 columns (50% width each)
- Maintains aspect ratio
- Scales content proportionally

### Match Cards
- Live matches: Full width
- Other matches: 2 columns (50% width each)
- Maintains consistent spacing

### Stats Bar
- 3 equal columns
- Dividers between columns
- Scales text if needed

## Accessibility

### Touch Targets
- Minimum 44pt touch target size
- Sport cards exceed minimum (140px height)
- Adequate spacing between interactive elements

### Color Contrast
- White text on gradient backgrounds (high contrast)
- Dark text on white cards (high contrast)
- Red live indicator (high visibility)

### VoiceOver Support
- Descriptive labels for all interactive elements
- Sport card: "Calcio, sport filter button"
- Stats: "12 total matches, 3 live matches"
- Match cards: Full match information

## Performance Considerations

### Image Optimization
- Sport emojis (no images needed)
- Match card images lazy loaded
- Gradient backgrounds (CSS, no images)

### Rendering
- FlatList for long match lists (not implemented yet)
- Memoization for sport cards
- Efficient re-renders on filter change

### Animations
- Use native driver when possible
- Smooth 60fps animations
- Minimal layout recalculations

## Implementation Notes

### Key Components Used
- `LinearGradient` from expo-linear-gradient
- `IconSymbol` for checkmark icons
- `MatchCard` for match display
- `ScrollView` with RefreshControl

### State Management
```typescript
const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
const [refreshing, setRefreshing] = useState(false);
```

### Filtering Logic
```typescript
const filteredMatches = selectedSport
  ? mockMatches.filter(match => match.sport === selectedSport)
  : mockMatches;

const liveMatches = filteredMatches.filter(match => match.status === 'live');
const otherMatches = filteredMatches.filter(match => match.status !== 'live');
```

## Future Enhancements

### Planned Features
1. **Animated Transitions:** Smooth transitions when selecting sports
2. **Skeleton Loading:** Show loading state while fetching data
3. **Infinite Scroll:** Load more matches as user scrolls
4. **Search Bar:** Quick search for teams or tournaments
5. **Filter Chips:** Additional filters (date, location, tournament)
6. **Favorites:** Quick access to favorite teams/tournaments
7. **Personalization:** Remember user's preferred sport

### Potential Improvements
1. **Horizontal Sport Scroll:** Allow more sports without grid
2. **Match Highlights:** Show key moments or highlights
3. **Live Score Updates:** Real-time score updates
4. **Push Notifications:** Notify for live matches
5. **Share Functionality:** Share matches on social media

## Testing Checklist

- [ ] Hero section displays correctly
- [ ] Sport cards show proper gradients
- [ ] Sport selection works (tap to select/deselect)
- [ ] Checkmark appears on selected sport
- [ ] Stats bar shows correct counts
- [ ] Live section only shows when live matches exist
- [ ] Live dot is visible and positioned correctly
- [ ] Match cards display properly in grid
- [ ] Empty state shows when no matches
- [ ] Pull to refresh works
- [ ] Scroll performance is smooth
- [ ] Touch targets are adequate size
- [ ] Colors have sufficient contrast
- [ ] VoiceOver reads content correctly

## Conclusion

The redesigned home screen provides a modern, engaging, and functional interface that prioritizes quick sport selection and clear information hierarchy. The use of gradients, large touch targets, and clear visual feedback creates an app that is both beautiful and easy to use.
