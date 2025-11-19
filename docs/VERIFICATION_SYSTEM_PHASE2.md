
# Sistema Account Verificati - Fase 2

## Implementazione Completata

### 1. Tipi e Strutture Dati

#### Nuovi Tipi in `types/index.ts`:
- `VerificationRequestStatus`: 'pending' | 'approved' | 'rejected'
- `FirestoreVerificationRequest`: Struttura completa per le richieste di verifica
- Aggiornato `NotificationType` per includere notifiche di verifica

#### Mock Data:
- `data/verificationRequestsMockData.ts`: 5 richieste di esempio (3 pending, 1 approved, 1 rejected)

### 2. Dashboard Superuser (`app/admin/dashboard.tsx`)

#### Features:
- **Header**: Badge superuser visibile
- **Tab Navigation**: 3 tab (Richieste, Organizzatori, Utenti)

#### Tab Richieste:
- Lista richieste pending con card dettagliate
- Informazioni utente (avatar, nome, email)
- Organizzatore richiesto con logo
- Ruolo richiesto evidenziato
- Data richiesta
- Azioni rapide:
  - 👁️ Dettagli (naviga a review-request)
  - ✅ Approva (con conferma)
  - ❌ Rifiuta (naviga a review-request con action=reject)
- Empty state quando non ci sono richieste

#### Tab Organizzatori:
- Lista organizzatori con stats
- Bottone "➕ Nuovo Organizzatore"
- Card con logo, nome, sport, tornei totali
- Badge "🏆 Ufficiale" per organizzatori ufficiali

#### Tab Utenti:
- Lista utenti verificati
- Search bar funzionante
- Card con avatar, nome, ruolo, organizzatore
- Bottone "🔓 Revoca Verifica" con conferma

### 3. Richiesta Verifica (`app/profile/request-verification.tsx`)

#### Form Step-by-Step con Progress Bar:

**Step 1 - Selezione Organizzatore:**
- Lista scrollabile di tutti gli organizzatori
- Card selezionabili con logo, nome completo, scope
- Checkmark visibile sulla selezione
- Validazione: organizzatore obbligatorio

**Step 2 - Ruolo:**
- Input text per ruolo personalizzato
- Chip suggeriti cliccabili:
  - Arbitro
  - Dirigente
  - Responsabile Comunicazione
  - Delegato Provinciale
  - Delegato Regionale
  - Istruttore
- Validazione: ruolo obbligatorio

**Step 3 - Documenti:**
- Upload documento identità:
  - Bottone fotocamera
  - Bottone galleria
  - Preview immagine con bottone rimozione
- Upload lettera delega:
  - Bottone fotocamera
  - Bottone galleria
  - Preview immagine con bottone rimozione
- Validazione: entrambi i documenti obbligatori
- Integrazione con `expo-image-picker`

**Step 4 - Motivazione:**
- Textarea multiline
- Placeholder suggestivo
- Counter caratteri (max 500)
- Validazione: minimo 50 caratteri

**Step 5 - Conferma:**
- Riepilogo completo:
  - Organizzatore con logo
  - Ruolo
  - Documenti caricati (✅)
  - Motivazione completa
- Checkbox "Dichiaro che le informazioni sono veritiere"
- Bottone "📨 Invia Richiesta"
- Validazione: checkbox obbligatorio

#### Features:
- Progress bar con 5 dots
- Navigazione avanti/indietro
- Validazione per ogni step
- Alert di conferma invio
- Navigazione automatica al profilo dopo invio

### 4. Review Richiesta (`app/admin/review-request.tsx`)

#### Visualizzazione Completa:

**User Profile Card:**
- Avatar grande (80x80)
- Nome e email
- Design pulito e professionale

**Organizer Card:**
- Logo organizzatore (80x80)
- Nome organizzatore
- Badge ruolo richiesto (evidenziato in arancione)

**Documenti:**
- Preview documento identità (immagine inline 250px height)
- Preview lettera delega (immagine inline 250px height)
- Label chiare per ogni documento

**Motivazione:**
- Card dedicata con testo completo
- Font leggibile e spaziatura adeguata

**Timestamp:**
- Data e ora richiesta formattata in italiano

#### Azioni:

**Bottone ✅ Approva (Verde):**
- Alert di conferma con riepilogo:
  - Nome utente
  - Ruolo che riceverà
  - Permessi che otterrà
- Simulazione aggiornamento user:
  - role = 'verified'
  - organizerId
  - organizerRole
  - canCreateOfficialTournaments = true
- Notifica utente
- Navigazione automatica indietro

**Bottone ❌ Rifiuta (Rosso):**
- Modal bottom sheet
- Textarea per motivo rifiuto
- Counter caratteri (minimo 20, max 500)
- Validazione motivo obbligatorio
- Bottone disabilitato se < 20 caratteri
- Notifica utente con motivo
- Navigazione automatica indietro

### 5. Integrazione Profilo (`app/(tabs)/profile.tsx`)

#### Aggiornamenti:

**Per Utenti Regular:**
- Card "Richiedi Account Verificato"
- Emoji ✅
- Titolo e sottotitolo descrittivo
- Navigazione a request-verification

**Per Utenti Verified:**
- Badge ✅ sull'avatar
- Display ruolo organizzatore sotto nome
- Nessun bottone richiesta verifica

**Per Superuser:**
- Badge 👑 sull'avatar
- Card "Dashboard Admin" evidenziata in oro
- Navigazione a admin/dashboard

**Per Tutti:**
- Bottone "Organizzatori Sportivi"
- Navigazione a /organizers/

### 6. Routing e Navigation

#### Nuove Route:
- `/admin/dashboard` - Dashboard superuser
- `/admin/review-request?id={requestId}` - Review richiesta
- `/profile/request-verification` - Form richiesta verifica

#### Layout Files:
- `app/admin/_layout.tsx` - Layout per admin routes
- `app/profile/_layout.tsx` - Layout per profile routes
- `app/organizers/_layout.tsx` - Layout per organizers routes

#### Aggiornato:
- `app/_layout.tsx` - Include nuove route

### 7. Stili e Design

#### Caratteristiche:
- Design consistente con il resto dell'app
- Colori brand utilizzati (primary, calcio, live)
- Card con shadow e elevation
- Bottoni con stati hover/press
- Animazioni smooth
- Responsive layout
- Dark mode ready (usa colors da commonStyles)

#### Componenti Riutilizzati:
- IconSymbol per icone cross-platform
- Colors da commonStyles
- Layout patterns consistenti

### 8. User Experience

#### Features UX:
- Progress bar visibile in ogni step
- Validazione real-time
- Messaggi di errore chiari
- Conferme per azioni critiche
- Empty states informativi
- Loading states (simulati con console.log)
- Navigazione intuitiva
- Back button sempre disponibile

### 9. Mock Data e Testing

#### Dati di Test:
- 5 verification requests con stati diversi
- 3 pending (Paolo Maldini, Sara Gama, Andrea Pirlo)
- 1 approved (Giulia Rossi)
- 1 rejected (Marco Verdi con motivo)

#### Utenti di Test:
- user_001 (Marco Rossi) - verified
- user_002 (Luca Bianchi) - verified
- user_003 (Giuseppe Verdi) - regular
- user_superuser_001 (Admin Matchble) - superuser

### 10. Funzionalità Future (Non Implementate)

#### Backend Integration:
- Firebase Storage per upload documenti
- Firestore per salvare richieste
- Cloud Functions per notifiche
- Firebase Auth per gestione utenti

#### Features Aggiuntive:
- Notifiche push
- Email notifications
- History richieste utente
- Analytics dashboard
- Bulk actions per superuser
- Export dati

## Come Testare

### 1. Testare come Utente Regular:
```typescript
// In app/(tabs)/profile.tsx, line 11:
const currentUser = mockFirestoreUsers.find(u => u.uid === 'user_003');
```
- Vedrai il bottone "Richiedi Account Verificato"
- Clicca per aprire il form step-by-step
- Completa tutti i 5 step
- Invia la richiesta

### 2. Testare come Utente Verified:
```typescript
// In app/(tabs)/profile.tsx, line 11:
const currentUser = mockFirestoreUsers.find(u => u.uid === 'user_001');
```
- Vedrai il badge ✅ sull'avatar
- Vedrai il ruolo "Delegato FIGC Lombardia"
- Non vedrai il bottone richiesta verifica

### 3. Testare come Superuser:
```typescript
// In app/(tabs)/profile.tsx, line 11:
const currentUser = mockFirestoreUsers.find(u => u.uid === 'user_superuser_001');
```
- Vedrai il badge 👑 sull'avatar
- Vedrai la card "Dashboard Admin" in oro
- Clicca per aprire la dashboard
- Naviga tra i 3 tab
- Clicca "Dettagli" su una richiesta per reviewarla
- Approva o rifiuta richieste

## File Modificati/Creati

### Nuovi File:
1. `data/verificationRequestsMockData.ts`
2. `app/admin/dashboard.tsx`
3. `app/admin/review-request.tsx`
4. `app/admin/_layout.tsx`
5. `app/profile/request-verification.tsx`
6. `app/profile/_layout.tsx`
7. `app/organizers/_layout.tsx`
8. `docs/VERIFICATION_SYSTEM_PHASE2.md`

### File Modificati:
1. `types/index.ts` - Aggiunto FirestoreVerificationRequest
2. `app/(tabs)/profile.tsx` - Aggiunto UI per verifica e admin
3. `app/_layout.tsx` - Aggiunto routing per nuove route
4. `styles/commonStyles.ts` - Aggiunto sportLabels export

## Note Tecniche

### Dipendenze Utilizzate:
- `expo-image-picker` - Per upload documenti
- `expo-router` - Per navigazione
- `react-native` - Core components

### Pattern Utilizzati:
- Step-by-step wizard con state management
- Modal bottom sheet per input
- Card-based layout
- Tab navigation
- Alert per conferme

### Performance:
- Immagini ottimizzate con resizeMode
- ScrollView con contentContainerStyle
- Lazy loading delle immagini
- Validazione client-side

## Conclusione

Il sistema di account verificati Fase 2 è completamente implementato con:
- ✅ Dashboard superuser completa
- ✅ Form richiesta verifica step-by-step
- ✅ Screen review richiesta con azioni
- ✅ Integrazione profilo utente
- ✅ Mock data per testing
- ✅ UI/UX professionale
- ✅ Routing completo
- ✅ Validazione e conferme

Il sistema è pronto per essere integrato con Firebase per la persistenza dei dati e le notifiche.
