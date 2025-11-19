
# Matchble - Accesso Demo e Test

## 🎭 Come Testare l'App

### Metodo 1: Selettore Profili Integrato (Consigliato)

1. Apri l'app Matchble
2. Vai alla schermata **Profilo** (tab in basso)
3. Clicca sul **banner arancione "Modalità Demo"** in alto
4. Seleziona uno dei profili disponibili dal menu

### Metodo 2: Modifica Codice (Per Sviluppatori)

Nel file `app/(tabs)/profile.tsx`, modifica la riga:

```typescript
const [selectedDemoUser, setSelectedDemoUser] = useState('user_001');
```

Cambia `'user_001'` con uno dei seguenti ID:

## 👥 Profili Demo Disponibili

### 1. Marco Rossi - Delegato Verificato Multi-Affiliazione
```typescript
ID: 'user_001'
```
**Caratteristiche:**
- ✅ Account verificato
- 🏢 Affiliazioni: FIGC Lombardia + CSI Milano
- 🎯 Ruoli: Delegato Regionale + Responsabile Tornei
- 📊 Stats: 15 partite, 2 tornei, 92% trust score
- 🔑 Permessi: Crea tornei ufficiali, gestisce risultati

**Cosa Testare:**
- Creazione tornei ufficiali per FIGC Lombardia
- Gestione risultati per CSI Milano
- Visualizzazione affiliazioni multiple
- Permessi granulari per organizzatore

---

### 2. Luca Bianchi - Delegato Verificato Basket
```typescript
ID: 'user_002'
```
**Caratteristiche:**
- ✅ Account verificato
- 🏢 Affiliazione: FIP Lombardia
- 🎯 Ruolo: Responsabile Tornei
- 📊 Stats: 22 partite, 3 tornei, 95% trust score
- 🔑 Permessi: Gestione tornei basket ufficiali

**Cosa Testare:**
- Creazione tornei basket ufficiali
- Gestione classifiche FIP
- Import risultati CSV
- Verifica risultati altri utenti

---

### 3. Giuseppe Verdi - Utente Regular
```typescript
ID: 'user_003'
```
**Caratteristiche:**
- 👤 Account regular (non verificato)
- 🏢 Nessuna affiliazione
- 📊 Stats: 8 partite, 0 tornei, 78% trust score
- 🔑 Permessi: Base (visualizza, crea tornei non ufficiali)

**Cosa Testare:**
- Visualizzazione risultati e classifiche
- Pulsante "Richiedi Account Verificato"
- Creazione tornei non ufficiali
- Limitazioni utente regular

---

### 4. Admin Matchble - Superuser
```typescript
ID: 'user_superuser_001'
```
**Caratteristiche:**
- 👑 Superuser (amministratore)
- 🔑 Controllo totale sistema
- 📊 Stats: 0 partite (account admin)
- 🎯 Accesso: Dashboard amministrativa completa

**Cosa Testare:**
- Dashboard Admin (pulsante dorato)
- Gestione richieste verifica
- Configurazione permessi delegati
- Approvazione/rifiuto richieste
- Gestione organizzatori
- Revoca affiliazioni

---

## 🔄 Cambio Rapido Profilo

### Nell'App (UI)
1. Profilo → Banner "Modalità Demo" → Seleziona profilo
2. L'app si aggiorna immediatamente
3. Tutte le funzionalità cambiano in base al ruolo

### Nel Codice (Sviluppatori)
```typescript
// In app/(tabs)/profile.tsx
const [selectedDemoUser, setSelectedDemoUser] = useState('user_001'); // Cambia qui
```

## 🎯 Scenari di Test Consigliati

### Scenario 1: Flusso Utente Regular → Verificato
1. Inizia come `user_003` (Giuseppe Verdi)
2. Clicca "Richiedi Account Verificato"
3. Compila form con organizzatori multipli
4. Cambia a `user_superuser_001` (Admin)
5. Approva richiesta dalla dashboard
6. Torna a `user_003` per vedere account verificato

### Scenario 2: Gestione Multi-Affiliazione
1. Usa `user_001` (Marco Rossi)
2. Visualizza affiliazioni: FIGC Lombardia + CSI Milano
3. Crea torneo ufficiale per FIGC
4. Gestisci risultati per CSI
5. Verifica permessi diversi per ogni affiliazione

### Scenario 3: Dashboard Superuser
1. Usa `user_superuser_001` (Admin)
2. Accedi a Dashboard Admin
3. Tab "Richieste": Gestisci verifiche
4. Tab "Utenti": Visualizza tutti gli utenti
5. Tab "Organizzatori": Gestisci organizzatori
6. Configura permessi granulari

### Scenario 4: Delegato Specializzato
1. Usa `user_002` (Luca Bianchi)
2. Crea torneo basket ufficiale FIP
3. Gestisci classifiche
4. Import risultati CSV
5. Verifica risultati altri utenti

## 📱 URL Demo per Testing

### Web (Sviluppo)
```
http://localhost:8081/?demo=user_001        # Marco Rossi
http://localhost:8081/?demo=user_002        # Luca Bianchi
http://localhost:8081/?demo=user_003        # Giuseppe Verdi
http://localhost:8081/?demo=user_superuser_001  # Admin
```

### Deep Links (Mobile)
```
matchble://profile?demo=user_001
matchble://profile?demo=user_002
matchble://profile?demo=user_003
matchble://profile?demo=user_superuser_001
```

## 🔐 Credenziali Mock (Per Reference)

| Profilo | Email | Ruolo | Password (Mock) |
|---------|-------|-------|-----------------|
| Marco Rossi | marco.rossi@email.com | Verificato | demo123 |
| Luca Bianchi | luca.bianchi@email.com | Verificato | demo123 |
| Giuseppe Verdi | giuseppe.verdi@email.com | Regular | demo123 |
| Admin Matchble | admin@matchble.it | Superuser | admin123 |

**Nota:** Queste sono credenziali mock per testing. In produzione, usa Firebase Authentication.

## 🧪 Checklist Testing

### ✅ Funzionalità Base
- [ ] Navigazione header persistente
- [ ] Logo sempre visibile
- [ ] Link Home/Tornei/Profilo funzionanti
- [ ] Cambio profilo demo
- [ ] Visualizzazione ruoli

### ✅ Utente Regular
- [ ] Visualizza risultati
- [ ] Visualizza tornei
- [ ] Pulsante "Richiedi Verifica" visibile
- [ ] Nessun accesso dashboard admin

### ✅ Delegato Verificato
- [ ] Badge verificato visibile
- [ ] Affiliazioni mostrate
- [ ] Crea tornei ufficiali
- [ ] Gestisce risultati
- [ ] Nessun accesso dashboard admin

### ✅ Superuser
- [ ] Badge corona visibile
- [ ] Pulsante "Dashboard Admin" dorato
- [ ] Accesso dashboard completa
- [ ] Gestione richieste verifica
- [ ] Configurazione permessi

## 🚀 Quick Start

```bash
# 1. Avvia l'app
npm run dev

# 2. Apri nel browser
http://localhost:8081

# 3. Vai su Profilo

# 4. Clicca banner "Modalità Demo"

# 5. Seleziona profilo da testare

# 6. Esplora funzionalità!
```

## 📞 Supporto

Problemi con i profili demo?
- Verifica che `mockFirestoreUsers` in `data/firestoreMockData.ts` contenga tutti gli utenti
- Controlla console per errori
- Riavvia l'app se il cambio profilo non funziona

---

**Buon Testing! 🎉**
