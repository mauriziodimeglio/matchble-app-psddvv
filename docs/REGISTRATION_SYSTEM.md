
# Sistema di Registrazione Matchble

## Panoramica

Il sistema di registrazione di Matchble offre tre metodi di autenticazione:
- **Email/Password**: Registrazione tradizionale con validazione password avanzata
- **Google Sign-In**: Accesso rapido con account Google
- **Apple Sign-In**: Accesso rapido con Apple ID (solo iOS)

## Flusso di Registrazione

### 1. Schermata di Benvenuto (`/auth/welcome`)
- Logo Matchble con motto "Il social di chi gioca"
- Tre pulsanti per i metodi di registrazione
- Link per accedere se già registrati
- Note su termini e privacy

### 2. Registrazione Email (`/auth/email-registration`)

#### Campi del Form:
- **Nome**: Minimo 2 caratteri
- **Cognome**: Minimo 2 caratteri
- **Email**: Formato email valido
- **Password**: Con validazione in tempo reale
- **Conferma Password**: Deve corrispondere alla password

#### Validazione Password:
La password deve soddisfare tutti i seguenti requisiti:
- ✅ Minimo 8 caratteri
- ✅ Almeno una lettera maiuscola (A-Z)
- ✅ Almeno una lettera minuscola (a-z)
- ✅ Almeno un numero (0-9)
- ✅ Almeno un carattere speciale (!@#$%^&*(),.?":{}|<>)

#### Indicatore Forza Password:
- **Debole** (rosso): 1-2 requisiti soddisfatti
- **Media** (arancione): 3-4 requisiti soddisfatti
- **Forte** (verde): Tutti i 5 requisiti soddisfatti

#### Checkbox Obbligatoria:
- Accettazione Termini e Condizioni e Privacy Policy

### 3. Selezione Tipo Profilo (`/auth/profile-type-selection`)

Dopo l'autenticazione, l'utente deve selezionare un tipo di profilo:

#### Tipi di Profilo:

1. **Giocatore** ⚽
   - Partecipa a tornei e trova compagni di squadra
   - Profilo predefinito se si salta la selezione

2. **Organizzatore Torneo** 🏆
   - Crea e gestisci tornei ufficiali
   - Richiede verifica amministrativa

3. **Team Manager** 👔
   - Gestisci la tua squadra e i risultati
   - Accesso a funzionalità di gestione team

4. **Arbitro/Giudice** 🎯
   - Registra risultati ufficiali delle partite
   - Validazione risultati con autorità

5. **Spettatore** 👀
   - Segui tornei e giocatori preferiti
   - Accesso in sola lettura

#### Funzionalità:
- Selezione obbligatoria (o skip per default Giocatore)
- Possibilità di modificare in seguito dalle impostazioni
- Salvataggio su Firestore

## Integrazione Firebase

### Configurazione

1. **Variabili d'Ambiente** (`.env`):
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

2. **Inizializzazione** (`config/firebase.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
```

### Metodi di Autenticazione

#### Email/Password:
```typescript
import { registerWithEmail } from '@/utils/firebaseAuth';

const user = await registerWithEmail(
  email,
  password,
  firstName,
  lastName
);
```

#### Google Sign-In:
```typescript
import { signInWithGoogle } from '@/utils/firebaseAuth';

const user = await signInWithGoogle();
```

#### Apple Sign-In:
```typescript
import { signInWithApple } from '@/utils/firebaseAuth';

const user = await signInWithApple();
```

### Struttura Dati Firestore

Dopo la registrazione, viene creato un documento nella collection `users`:

```typescript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null,
  profileType: 'player' | 'organizer' | 'manager' | 'referee' | 'spectator',
  createdAt: Timestamp,
  isVerified: boolean,
  completedOnboarding: boolean,
  // ... altri campi
}
```

## UI/UX Design

### Colori:
- **Primario (CTA)**: `#FF6B35` (Arancione)
- **Secondario (Link)**: `#004E89` (Blu)
- **Errore**: `#DC2626` (Rosso)
- **Successo**: `#10B981` (Verde)
- **Warning**: `#F59E0B` (Arancione)

### Componenti:

#### Input Fields:
- Bordo grigio di default (`#E0E0E0`)
- Bordo arancione al focus (`#FF6B35`)
- Bordo rosso per errori (`#DC2626`)

#### Pulsanti:
- **Primario**: Sfondo arancione, testo bianco
- **Google**: Sfondo bianco, bordo grigio, icona Google
- **Apple**: Sfondo nero, testo bianco, icona Apple

#### Password Input:
- Icona occhio per mostrare/nascondere
- Indicatore forza password sotto il campo
- Lista requisiti con checkmark colorati

## Gestione Errori

### Messaggi User-Friendly:

| Codice Errore | Messaggio | Azione |
|---------------|-----------|--------|
| `auth/email-already-in-use` | "Email già registrata" | Proponi login |
| `auth/weak-password` | "Password troppo debole" | Mostra requisiti |
| `auth/invalid-email` | "Email non valida" | Evidenzia campo |
| `auth/network-request-failed` | "Verifica la connessione internet" | Riprova |
| `auth/popup-closed-by-user` | "Accesso annullato" | Riprova o usa email |

### Validazione Client-Side:
- Controllo in tempo reale durante la digitazione
- Feedback visivo immediato (rosso/verde)
- Disabilitazione pulsante se form non valido

## Sicurezza

### Best Practices:
1. ✅ Password mai salvate in plain text
2. ✅ Validazione sia client che server-side
3. ✅ HTTPS obbligatorio per tutte le richieste
4. ✅ Token di sessione gestiti da Firebase Auth
5. ✅ Checkbox obbligatoria per termini e privacy

### Password Requirements:
- Minimo 8 caratteri
- Mix di maiuscole, minuscole, numeri e simboli
- Nessuna password comune (gestito da Firebase)

## Navigazione

### Flusso Completo:
```
/auth/welcome
  ↓
/auth/email-registration (o /auth/google-signin o /auth/apple-signin)
  ↓
/auth/profile-type-selection
  ↓
/(tabs)/(home) [Home Screen]
```

### Back Navigation:
- Ogni schermata ha un pulsante "Indietro"
- Possibilità di tornare alla schermata precedente
- Skip opzionale per selezione profilo

## Animazioni

### Transizioni:
- Fade in/out tra schermate
- Slide animation per form multi-step
- Smooth color transitions per validazione

### Feedback Visivi:
- Pulse animation per pulsanti primari
- Shake animation per errori
- Checkmark animation per successo

## Testing

### Test Cases:

1. **Registrazione Email**:
   - ✅ Form valido completo
   - ❌ Email già esistente
   - ❌ Password debole
   - ❌ Password non corrispondenti
   - ❌ Termini non accettati

2. **Google Sign-In**:
   - ✅ Primo accesso (nuovo utente)
   - ✅ Accesso esistente
   - ❌ Popup chiuso dall'utente
   - ❌ Errore di rete

3. **Apple Sign-In**:
   - ✅ Primo accesso (nuovo utente)
   - ✅ Accesso esistente
   - ❌ Non disponibile su Android
   - ❌ Accesso annullato

## Accessibilità

### Features:
- ✅ Label descrittive per screen readers
- ✅ Touch targets minimo 44pt
- ✅ Contrasto colori WCAG AA
- ✅ Supporto VoiceOver/TalkBack
- ✅ Keyboard navigation

## Performance

### Ottimizzazioni:
- Lazy loading dei componenti
- Debounce per validazione in tempo reale
- Caching delle configurazioni Firebase
- Minimizzazione chiamate API

## Deployment

### Checklist:
1. ✅ Configurare Firebase project
2. ✅ Abilitare Email/Password authentication
3. ✅ Configurare Google OAuth
4. ✅ Configurare Apple Sign-In (iOS)
5. ✅ Impostare variabili d'ambiente
6. ✅ Testare su dispositivi reali
7. ✅ Verificare termini e privacy policy

## Manutenzione

### Aggiornamenti Futuri:
- [ ] Autenticazione biometrica (Face ID/Touch ID)
- [ ] Autenticazione a due fattori (2FA)
- [ ] Login con numero di telefono
- [ ] Social login aggiuntivi (Facebook, Twitter)
- [ ] Password recovery via email
- [ ] Email verification obbligatoria

## Supporto

Per problemi o domande:
- 📧 Email: support@matchble.it
- 📱 In-app support chat
- 📚 Documentazione: docs.matchble.it
