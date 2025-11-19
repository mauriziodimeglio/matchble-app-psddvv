
# Matchble - Guida Utente

## 🎯 Panoramica

Matchble è un'app per atleti amatoriali italiani che permette di visualizzare risultati sportivi in tempo reale, gestire tornei e seguire classifiche.

## 🏠 Navigazione

### Header Persistente
L'app ora include un **header sempre visibile** in tutte le schermate con:
- **Logo Matchble** (cliccabile per tornare alla home)
- **Link di navigazione rapida**:
  - 🏠 Home
  - 🏆 Tornei
  - 👤 Profilo

L'header è sempre presente in sovraimpressione, permettendo una navigazione fluida tra le sezioni principali.

### Bottom Tab Bar
La barra di navigazione inferiore fluttuante permette di accedere rapidamente a:
- Home
- Tornei
- Profilo

## 👥 Ruoli Utente

### 1. Utente Regular (👤)
**Permessi:**
- Visualizza risultati e classifiche
- Crea tornei non ufficiali
- Pubblica risultati partite

**Ideale per:** Atleti amatoriali che vogliono tracciare le proprie partite

### 2. Delegato Verificato (✅)
**Permessi:**
- Tutti i permessi di Utente Regular
- Crea tornei ufficiali per organizzatori affiliati
- Gestisce risultati e classifiche ufficiali
- Può avere affiliazioni multiple con diversi organizzatori

**Ideale per:** Delegati di federazioni sportive (FIGC, FIP, FIPAV, etc.)

**Affiliazioni Multiple:**
Un delegato può essere associato a più organizzatori contemporaneamente:
- Esempio: "Delegato FIPAV Napoli" + "Arbitro FIPAV Campania" + "Dirigente CSI Napoli"
- Ogni affiliazione ha permessi indipendenti configurabili dal superuser

### 3. Superuser (👑)
**Permessi:**
- Controllo totale del sistema
- Autorizza/revoca delegati verificati
- Gestisce tutti gli organizzatori
- Accesso dashboard amministrativa
- Configura permessi granulari per ogni affiliazione

**Ideale per:** Amministratori della piattaforma

## 🎭 Modalità Demo

### Come Accedere
1. Vai alla schermata **Profilo**
2. Clicca sul banner arancione **"Modalità Demo"** in alto
3. Seleziona uno dei profili disponibili:

#### Profili Demo Disponibili:

**Marco Rossi - Delegato Verificato** ✅
- Email: marco.rossi@email.com
- Affiliazioni: FIGC Lombardia, CSI Milano
- Permessi: Crea tornei ufficiali, gestisce risultati
- URL Demo: Seleziona "Marco Rossi" nel selettore profili

**Luca Bianchi - Delegato Verificato** ✅
- Email: luca.bianchi@email.com
- Affiliazione: FIP Lombardia
- Permessi: Responsabile tornei basket
- URL Demo: Seleziona "Luca Bianchi" nel selettore profili

**Giuseppe Verdi - Utente Regular** 👤
- Email: giuseppe.verdi@email.com
- Permessi: Base (visualizza e crea tornei non ufficiali)
- URL Demo: Seleziona "Giuseppe Verdi" nel selettore profili

**Admin Matchble - Superuser** 👑
- Email: admin@matchble.it
- Permessi: Controllo totale sistema
- Accesso: Dashboard amministrativa completa
- URL Demo: Seleziona "Admin Matchble" nel selettore profili

### Testare Funzionalità per Ruolo

#### Come Superuser:
1. Seleziona "Admin Matchble" nel selettore profili
2. Clicca su "Dashboard Admin" nella schermata profilo
3. Accedi a:
   - Gestione richieste di verifica
   - Configurazione permessi delegati
   - Gestione organizzatori
   - Statistiche sistema

#### Come Delegato Verificato:
1. Seleziona "Marco Rossi" o "Luca Bianchi"
2. Visualizza le affiliazioni attive
3. Crea tornei ufficiali per gli organizzatori affiliati
4. Gestisci risultati e classifiche

#### Come Utente Regular:
1. Seleziona "Giuseppe Verdi"
2. Visualizza il pulsante "Richiedi Account Verificato"
3. Esplora le funzionalità base dell'app

## 📱 Schermate Principali

### Home
- **Hero Section**: Logo, titolo e descrizione dell'app
- **Selezione Sport Rapida**: 4 card grandi con icone sport (Calcio, Basket, Volley, Padel)
- **Barra Statistiche**: Totale partite, Live, Concluse
- **Sezione LIVE**: Partite in corso con badge rosso pulsante
- **Griglia Risultati**: Card a 2 colonne con risultati recenti

### Tornei
- **Filtri Sport**: Chip orizzontali per filtrare per sport
- **Card Tornei**: Informazioni complete (luogo, data, squadre, stato)
- **Stati**: In Corso (rosso), Prossimo (giallo), Concluso (grigio)

### Profilo
- **Avatar e Badge**: Mostra ruolo utente (Regular/Verificato/Superuser)
- **Statistiche**: Partite, Tornei, Trust Score
- **Sport Preferiti**: Badge colorati per ogni sport
- **Pulsante Ruoli**: Spiega tutti i ruoli disponibili
- **Demo Mode**: Banner per cambiare profilo di test

## 🔐 Sistema di Verifica

### Richiedere Account Verificato

1. **Accedi come Utente Regular**
2. **Vai su Profilo**
3. **Clicca "Richiedi Account Verificato"**
4. **Compila il form**:
   - Seleziona organizzatori (multipli possibili)
   - Specifica ruolo per ogni organizzatore
   - Carica documenti (carta identità + lettera delega)
   - Scrivi motivazione (max 500 caratteri)
5. **Invia richiesta**

### Approvazione (Superuser)

1. **Accedi come Superuser**
2. **Dashboard Admin → Tab "Richieste"**
3. **Visualizza richiesta completa**:
   - Dati utente
   - Organizzatori richiesti
   - Documenti caricati
   - Motivazione
4. **Per ogni organizzatore**:
   - Scegli preset permessi (Base/Manager/Custom)
   - Configura permessi granulari se Custom
5. **Approva o Rifiuta** con motivazione

## 🎨 Design e UX

### Colori Sport
- ⚽ Calcio: Verde (#4CAF50)
- 🏀 Basket: Arancione (#FF9800)
- 🏐 Volley: Blu (#2196F3)
- 🎾 Padel: Viola (#9C27B0)

### Icone e Badge
- 👤 Utente Regular
- ✅ Delegato Verificato
- 👑 Superuser
- 🔴 LIVE (partite in corso)
- 🏆 Tornei
- 📊 Classifiche

### Animazioni
- Transizioni fluide tra schermate
- Effetti hover su card e pulsanti
- Badge LIVE pulsante
- Scroll smooth con pull-to-refresh

## 🌐 Favicon e Logo

- **Logo**: Sempre visibile nell'header
- **Favicon Web**: Logo Matchble (file: 1130396b-2aa5-4881-97af-7f098b638ae7.png)
- **Icona App**: Logo Matchble per iOS e Android

## 📞 Supporto

Per domande o problemi:
- Email: admin@matchble.it
- Usa la modalità demo per testare tutte le funzionalità
- Consulta la sezione "Scopri i Ruoli Utente" nel profilo

## 🚀 Prossimi Passi

1. **Esplora l'app** con diversi profili demo
2. **Testa le funzionalità** specifiche per ogni ruolo
3. **Familiarizza** con il sistema di permessi
4. **Prova** a creare tornei e pubblicare risultati

---

**Matchble - Per chi gioca** 🏆
