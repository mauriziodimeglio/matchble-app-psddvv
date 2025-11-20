
# Guida Completa Funzionalità Matchble

## 📋 Panoramica

Questa guida descrive tutte le funzionalità implementate per la piattaforma Matchble, un'app completa per la gestione di sport amatoriali in Italia.

## 🎯 Ruoli Utente

### 1. **Utente Non Registrato (Guest)**
- ✅ Visualizza risultati partite
- ✅ Visualizza classifiche tornei
- ✅ Inserisce risultati partite
- ✅ Aggiunge note e commenti alle partite
- ✅ Carica foto delle partite
- ❌ Non può fare video live
- ❌ Non può creare tornei ufficiali
- ❌ Non può gestire società

### 2. **Utente Registrato (Regular)**
- ✅ Tutte le funzionalità Guest
- ✅ Crea profilo atleta pubblico/privato
- ✅ Fa video live delle partite
- ✅ Messaggistica con altri atleti
- ✅ Richiede associazione a società
- ✅ Crea tornei non ufficiali
- ❌ Non può creare tornei ufficiali
- ❌ Non può gestire società

### 3. **Delegato Verificato (Verified Delegate)**
- ✅ Tutte le funzionalità Utente Registrato
- ✅ Crea tornei ufficiali per organizzatori affiliati
- ✅ Caricamento massivo squadre, tornei, giornate
- ✅ Gestisce risultati e classifiche
- ✅ Verifica risultati inseriti da altri
- ✅ Accesso analytics organizzatori
- ✅ Permessi granulari configurabili

### 4. **Manager di Società (Club Manager)**
- ✅ Tutte le funzionalità Utente Registrato
- ✅ Gestisce società sportiva completa
- ✅ Gestisce atleti e squadre
- ✅ Planning attività settimanali/mensili
- ✅ Gestisce impianti sportivi multipli
- ✅ Carica partite società (ufficiali e amichevoli)
- ✅ Monitora gare e risultati
- ✅ Dashboard completa gestione

### 5. **Superuser**
- ✅ Tutte le funzionalità sistema
- ✅ Approva/rifiuta richieste verifica
- ✅ Gestisce permessi delegati
- ✅ Crea altri superuser
- ✅ Accesso admin panel completo

## 🏟️ Gestione Campi da Gioco (Venues)

### Registrazione Campo
**File**: `app/venue/register.tsx`

#### Funzionalità:
- ✅ **Campi Obbligatori**:
  - Nome campo
  - Indirizzo completo
  - Città, Provincia, Regione
  - Sport disponibili (multipli)
  - Localizzazione GPS (obbligatoria)

- ✅ **Localizzazione GPS**:
  - Rileva posizione attuale automaticamente
  - Cerca indirizzo e localizza su mappa
  - Memorizza latitudine e longitudine
  - Reverse geocoding per compilazione automatica indirizzo

- ✅ **Dettagli Campo**:
  - Capienza spettatori
  - Campo coperto/scoperto
  - Contatti (telefono, email)
  - Foto campo
  - Orari apertura

- ✅ **Associazione Partite**:
  - Ogni partita DEVE avere un campo associato
  - Selezione tra campi registrati nella provincia
  - Possibilità di registrare nuovo campo al volo
  - Filtro campi per sport e provincia

### Gestione Impianti Società
- ✅ Società può avere multipli impianti
- ✅ Vista planning per impianto
- ✅ Gestione disponibilità orari
- ✅ Assegnazione automatica campo per allenamenti

## 👥 Gestione Società Sportiva

### Dashboard Società
**File**: `app/club/dashboard.tsx`

#### Sezioni:
1. **Panoramica**:
   - Informazioni società (nome, logo, motto, fondazione)
   - Statistiche: squadre, atleti, tornei, impianti
   - Azioni rapide

2. **Squadre**:
   - Lista squadre con genere (M/F/Misto)
   - Statistiche squadra
   - Gestione roster
   - Iscrizione tornei

3. **Atleti**:
   - Gestione completa atleti
   - Profili pubblici/privati
   - Richieste associazione con mutuo consenso

4. **Planning**:
   - Vista settimanale/mensile
   - Allenamenti, partite, riunioni
   - Gestione multipli impianti

### Gestione Atleti
**File**: `app/club/athletes.tsx`

#### Profilo Atleta:
- ✅ **Profilo Pubblico** (visibile a tutti):
  - Nome visualizzato
  - Foto
  - Numero maglia
  - Ruolo/posizione
  - Frase motivazionale
  - Riconoscimenti/achievements

- ✅ **Profilo Privato** (solo società associate):
  - Nome completo
  - Data nascita
  - Contatti (telefono, email)
  - Contatto emergenza
  - Note mediche
  - Altezza, peso

- ✅ **Statistiche**:
  - Partite giocate
  - Goal/Punti
  - Assist
  - Cartellini
  - Premi MVP

- ✅ **Disponibilità**:
  - Calendario settimanale
  - Giorni disponibili per allenamenti

#### Associazione Atleta-Società:
- ✅ Richiesta da parte atleta o società
- ✅ **Mutuo consenso obbligatorio**
- ✅ Stati: pending, accepted, rejected
- ✅ Ruoli: player, captain, vice_captain, reserve
- ✅ Possibilità di associazione multipla (più squadre)

### Planning Attività
**File**: `app/club/planning.tsx`

#### Funzionalità:
- ✅ **Vista Settimanale**:
  - Colonne per ogni giorno
  - Attività per giorno
  - Codice colore per tipo attività

- ✅ **Vista Mensile**:
  - Raggruppamento per data
  - Lista attività dettagliata

- ✅ **Tipi Attività**:
  - ⚽ Partite (rosso)
  - 🏃 Allenamenti (verde)
  - 📋 Riunioni (blu)
  - 🎉 Eventi (viola)

- ✅ **Dettagli Attività**:
  - Titolo e descrizione
  - Squadra/team
  - Impianto
  - Orario inizio/fine
  - Partecipanti
  - Note

- ✅ **Gestione Multipli Impianti**:
  - Vista per impianto
  - Disponibilità orari
  - Prenotazioni sovrapposte

## 🌟 Vetrina Atleti e Messaggistica

### Vetrina Atleti
**File**: `app/showcase/index.tsx`

#### Funzionalità:
- ✅ **Ricerca Atleti**:
  - Ricerca per nome o ruolo
  - Filtro per sport
  - Ricerca veloce sempre disponibile

- ✅ **Profili in Evidenza**:
  - Foto grande atleta
  - Informazioni pubbliche
  - Statistiche principali
  - Riconoscimenti
  - Frase motivazionale

- ✅ **Azioni**:
  - Visualizza profilo completo
  - Invia messaggio diretto
  - Proposta collaborazione

### Sistema Messaggistica
**File**: `app/messages/index.tsx`

#### Funzionalità:
- ✅ **Lista Conversazioni**:
  - Avatar utente
  - Ultimo messaggio
  - Timestamp
  - Badge messaggi non letti

- ✅ **Ricerca Conversazioni**:
  - Ricerca per nome utente
  - Filtro conversazioni

- ✅ **Messaggi**:
  - Invio/ricezione messaggi
  - Stato lettura
  - Notifiche push

- ✅ **Suddivisione per Sport**:
  - Filtro atleti per sport
  - Gruppi sport-specifici

## 📤 Caricamento Massivo Dati

### Per Delegati
**File**: `app/delegate/bulk-upload.tsx`

#### Tipi Caricamento:
1. **Squadre** (CSV):
   ```csv
   name,gender,city,sport
   AC Milan,male,Milano,calcio
   Inter Femminile,female,Milano,calcio
   ```

2. **Tornei** (CSV):
   ```csv
   name,sport,gender,startDate,endDate,city,maxTeams,division,group,venueIds
   Coppa Italia,calcio,male,2025-01-10,2025-02-15,Milano,16,Serie D,Girone A,venue_001;venue_002
   ```

3. **Giornate di Gara** (CSV):
   ```csv
   tournamentId,date,homeTeam,awayTeam,venueId,homeScore,awayScore
   tournament_001,2025-01-20,AC Milan,Inter,venue_001,3,2
   ```

### Per Società
- ✅ Caricamento partite proprie
- ✅ Partite ufficiali (campionato/torneo)
- ✅ Partite amichevoli (non associate a tornei)
- ✅ Formato CSV standardizzato

## 🎥 Video Live

### Funzionalità:
- ✅ **Disponibile per**:
  - Utenti registrati
  - Delegati
  - Manager società
  - Superuser

- ✅ **Caratteristiche**:
  - Streaming live partite
  - Contatore spettatori
  - Chat live
  - Registrazione automatica
  - Condivisione social

- ❌ **Non disponibile per**:
  - Utenti non registrati (guest)

## 🔍 Ricerca Globale

### Implementazione:
- ✅ **Campo ricerca sempre visibile**
- ✅ **Ricerca in**:
  - Atleti (nome, ruolo, sport)
  - Squadre (nome, città)
  - Tornei (nome, sport, città)
  - Società (nome, città)
  - Campi (nome, città, provincia)
  - Partite (squadre, data)

- ✅ **Filtri Rapidi**:
  - Per sport
  - Per città/regione
  - Per data
  - Per stato

## 🎨 UI/UX Design

### Principi:
- ✅ **Smooth e Fluida**:
  - Animazioni 60fps
  - Transizioni morbide
  - Feedback tattile

- ✅ **Ottimizzazione Spazi**:
  - Nessuno spazio vuoto inutile
  - Contenuti densi ma leggibili
  - Card compatte

- ✅ **Nessuna Sovrapposizione Mobile**:
  - Padding bottom per tab bar
  - Scroll contenuti completo
  - Bottoni sempre accessibili

- ✅ **Colori per Sport**:
  - ⚽ Calcio: Verde
  - 🏀 Basket: Arancione
  - 🏐 Volley: Blu
  - 🎾 Padel: Giallo

- ✅ **Grafica Differenziata**:
  - Icone grandi (min 80x80px)
  - Emoji per categorie
  - Badge colorati per stati
  - Foto e loghi prominenti

## 🌳 Struttura Organizzatori

### Gerarchia:
```
Nazionale (FIGC, FIP, FIPAV)
  └── Regionale (FIGC Lombardia)
      └── Provinciale (FIGC Milano)
          └── Comunale (FIGC Milano Centro)
```

### Implementazione:
- ✅ Struttura ad albero
- ✅ Navigazione gerarchica
- ✅ Filtro per livello territoriale
- ✅ Ricerca in tutta la gerarchia

## 📊 Sistema Punteggi Standardizzato

### Per Sport:
**File**: `utils/scoringSystems.ts`

#### Calcio:
- Vittoria: 3 punti
- Pareggio: 1 punto
- Sconfitta: 0 punti

#### Basket:
- Vittoria: 2 punti
- Sconfitta: 0 punti

#### Volley:
- Vittoria 3-0 o 3-1: 3 punti
- Vittoria 3-2: 2 punti
- Sconfitta 2-3: 1 punto
- Sconfitta 0-3 o 1-3: 0 punti

#### Padel:
- Vittoria: 2 punti
- Sconfitta: 0 punti

## 📱 Funzionalità Aggiuntive

### Note e Commenti Partite:
- ✅ Tutti possono aggiungere note
- ✅ Commenti con timestamp
- ✅ Moderazione per contenuti inappropriati

### Foto e Video:
- ✅ Upload multiplo foto
- ✅ Galleria partita
- ✅ Video highlights
- ✅ Condivisione social

### Notifiche:
- ✅ Risultati partite
- ✅ Inizio tornei
- ✅ Richieste associazione atleti
- ✅ Messaggi ricevuti
- ✅ Reminder allenamenti

## 🚀 Prossimi Sviluppi

### In Roadmap:
- [ ] Statistiche avanzate atleti
- [ ] Analisi video partite
- [ ] Marketplace attrezzature
- [ ] Sponsorizzazioni squadre
- [ ] Prenotazione campi online
- [ ] Pagamenti integrati
- [ ] App arbitri
- [ ] Certificati medici digitali

## 📖 Guide Utente

### Per Iniziare:
1. **Utente Non Registrato**:
   - Esplora risultati e classifiche
   - Inserisci risultati partite
   - Registrati per funzionalità avanzate

2. **Utente Registrato**:
   - Crea profilo atleta
   - Cerca società
   - Richiedi associazione
   - Partecipa a tornei

3. **Manager Società**:
   - Registra società
   - Aggiungi squadre
   - Invita atleti
   - Gestisci planning
   - Registra campi

4. **Delegato**:
   - Richiedi verifica
   - Crea tornei ufficiali
   - Carica dati massivi
   - Gestisci risultati

## 🔐 Privacy e Sicurezza

### Profili Atleti:
- ✅ Controllo granulare visibilità dati
- ✅ Dati sensibili solo a società associate
- ✅ Consenso esplicito per associazioni
- ✅ Possibilità revoca consenso

### Dati Società:
- ✅ Dati pubblici: nome, logo, città
- ✅ Dati privati: contatti, atleti, planning
- ✅ Accesso controllato per ruolo

## 📞 Supporto

Per assistenza:
- 📧 Email: support@matchble.it
- 💬 Chat in-app
- 📱 Telegram: @matchble_support
- 🌐 Web: https://matchble.it/support

---

**Versione**: 2.0.0  
**Ultimo Aggiornamento**: Gennaio 2025  
**Autore**: Team Matchble
