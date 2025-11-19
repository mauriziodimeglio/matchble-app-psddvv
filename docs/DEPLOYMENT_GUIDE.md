
# 🚀 Guida al Deployment di Matchble

Questa guida ti aiuterà a pubblicare Matchble su Web, App Store e Google Play Store.

## 📋 Prerequisiti

### Account Necessari
1. **Apple Developer Account** ($99/anno) - per iOS App Store
2. **Google Play Developer Account** ($25 una tantum) - per Android Play Store
3. **Firebase Project** (già configurato) - per hosting web
4. **Expo Account** (gratuito) - per EAS Build

### Installazioni Richieste
```bash
# Installa EAS CLI globalmente
npm install -g eas-cli

# Installa Firebase CLI globalmente
npm install -g firebase-tools

# Login a Expo
eas login

# Login a Firebase
firebase login
```

---

## 🌐 PARTE 1: Pubblicazione Web (Firebase Hosting)

### Step 1: Configura Firebase Hosting

```bash
# Inizializza Firebase nel progetto
firebase init hosting
```

Quando richiesto:
- **Public directory**: `dist` (Expo web build output)
- **Configure as single-page app**: `Yes`
- **Set up automatic builds**: `No`
- **Overwrite index.html**: `No`

### Step 2: Configura app.json per Web

Assicurati che `app.json` contenga la configurazione web:

```json
{
  "expo": {
    "web": {
      "bundler": "metro",
      "favicon": "./assets/images/final_quest_240x240.png"
    }
  }
}
```

### Step 3: Build e Deploy

```bash
# Build per web
npx expo export -p web

# Deploy su Firebase Hosting
firebase deploy --only hosting
```

La tua app sarà disponibile su: `https://matchble-app.web.app`

### Step 4: (Opzionale) Dominio Personalizzato

Nel Firebase Console:
1. Vai su **Hosting**
2. Clicca **Add custom domain**
3. Segui le istruzioni per configurare il DNS

---

## 📱 PARTE 2: Pubblicazione iOS (App Store)

### Step 1: Configura EAS

```bash
# Inizializza EAS nel progetto
eas build:configure
```

Questo creerà `eas.json` (già presente nel tuo progetto).

### Step 2: Configura app.json per iOS

Verifica che `app.json` contenga:

```json
{
  "expo": {
    "name": "Matchble",
    "slug": "matchble",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.matchble.app",
      "buildNumber": "1",
      "supportsTablet": true,
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "Matchble ha bisogno di accedere alle tue foto per caricare immagini delle partite.",
        "NSCameraUsageDescription": "Matchble ha bisogno di accedere alla fotocamera per scattare foto delle partite.",
        "NSLocationWhenInUseUsageDescription": "Matchble usa la tua posizione per mostrare partite e tornei vicini."
      }
    }
  }
}
```

### Step 3: Build per iOS

```bash
# Build per iOS (prima volta - ci vorranno ~20-30 minuti)
eas build -p ios

# Per build successive
eas build -p ios --profile production
```

Durante il processo:
- Ti verrà chiesto di creare un Apple Developer account se non ce l'hai
- EAS gestirà automaticamente certificati e provisioning profiles

### Step 4: Submit all'App Store

```bash
# Submit automatico
eas submit -p ios --latest

# Oppure manualmente:
# 1. Scarica il file .ipa dalla build
# 2. Usa Transporter app per caricare su App Store Connect
```

### Step 5: Completa in App Store Connect

1. Vai su [App Store Connect](https://appstoreconnect.apple.com)
2. Crea una nuova app
3. Compila tutti i dettagli:
   - **Nome**: Matchble
   - **Categoria**: Sport
   - **Screenshot**: Prepara screenshot per iPhone e iPad
   - **Descrizione**: Descrivi l'app
   - **Keywords**: calcio, basket, volley, padel, sport, tornei
   - **Privacy Policy URL**: Crea una privacy policy
4. Seleziona la build caricata
5. Submit for Review

**Tempo di review**: 1-3 giorni

---

## 🤖 PARTE 3: Pubblicazione Android (Google Play Store)

### Step 1: Configura app.json per Android

Verifica che `app.json` contenga:

```json
{
  "expo": {
    "android": {
      "package": "com.matchble.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/final_quest_240x240.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

### Step 2: Build per Android

```bash
# Build per Android (prima volta - ci vorranno ~15-20 minuti)
eas build -p android

# Per build successive
eas build -p android --profile production
```

EAS creerà automaticamente il keystore per firmare l'app.

### Step 3: Submit al Play Store

```bash
# Submit automatico
eas submit -p android --latest
```

Durante il processo ti verrà chiesto:
- **Service Account JSON**: Crea un service account nel Google Cloud Console
- Segui le istruzioni di EAS per configurarlo

### Step 4: Completa in Google Play Console

1. Vai su [Google Play Console](https://play.google.com/console)
2. Crea una nuova app
3. Compila tutti i dettagli:
   - **Nome**: Matchble
   - **Categoria**: Sport
   - **Screenshot**: Prepara screenshot per telefoni e tablet
   - **Descrizione breve**: Max 80 caratteri
   - **Descrizione completa**: Max 4000 caratteri
   - **Icona**: 512x512px
   - **Feature Graphic**: 1024x500px
   - **Privacy Policy URL**: Stessa del iOS
4. Configura il contenuto:
   - **Classificazione contenuti**: Compila il questionario
   - **Target audience**: Seleziona le età appropriate
   - **Paesi**: Seleziona dove distribuire l'app
5. Crea una release di produzione
6. Submit for Review

**Tempo di review**: Poche ore - 1 giorno

---

## 🔄 Aggiornamenti Futuri

### Web
```bash
# Build e deploy
npx expo export -p web
firebase deploy --only hosting
```

### iOS
```bash
# Incrementa buildNumber in app.json
# Poi:
eas build -p ios
eas submit -p ios --latest
```

### Android
```bash
# Incrementa versionCode in app.json
# Poi:
eas build -p android
eas submit -p android --latest
```

---

## 💰 Costi Stimati

### Setup Iniziale
- Apple Developer: $99/anno
- Google Play Developer: $25 una tantum
- Firebase (Spark Plan): Gratuito fino a:
  - 10GB storage
  - 360MB/giorno database reads
  - 120MB/giorno database writes
  - 10GB/mese hosting

### Costi Operativi Mensili (stima per 1000 utenti attivi)
- Firebase: $0-25/mese (probabilmente gratuito all'inizio)
- EAS Build: Gratuito (limiti: 30 build iOS/mese, illimitate Android)

**Totale primo anno**: ~$125-150
**Totale anni successivi**: ~$100-125/anno

---

## 📊 Monitoraggio Post-Lancio

### Firebase Console
- **Analytics**: Monitora utenti attivi, retention, eventi
- **Crashlytics**: Traccia crash e errori
- **Performance**: Monitora performance dell'app

### App Store Connect
- **Sales and Trends**: Download e revenue
- **App Analytics**: Comportamento utenti
- **Ratings & Reviews**: Feedback utenti

### Google Play Console
- **Statistics**: Download e installazioni
- **User feedback**: Recensioni e rating
- **Crashes & ANRs**: Problemi tecnici

---

## 🚨 Checklist Pre-Lancio

### Generale
- [ ] Testa l'app su dispositivi reali (iOS e Android)
- [ ] Verifica che tutte le funzionalità funzionino
- [ ] Testa con dati reali (non solo mock)
- [ ] Configura Firebase Analytics
- [ ] Configura Crashlytics
- [ ] Crea Privacy Policy
- [ ] Crea Terms of Service

### iOS
- [ ] Screenshot per tutti i device (iPhone, iPad)
- [ ] App icon 1024x1024px
- [ ] Testa su iOS 15+ (minimo supportato)
- [ ] Verifica permessi (camera, location, photos)

### Android
- [ ] Screenshot per telefoni e tablet
- [ ] Feature graphic 1024x500px
- [ ] App icon 512x512px
- [ ] Testa su Android 8+ (minimo supportato)
- [ ] Verifica permessi

### Web
- [ ] Testa su Chrome, Safari, Firefox
- [ ] Verifica responsive design
- [ ] Configura meta tags per SEO
- [ ] Aggiungi favicon

---

## 🆘 Troubleshooting Comune

### Build Fallisce
```bash
# Pulisci cache e riprova
eas build --clear-cache -p ios
eas build --clear-cache -p android
```

### Firebase Hosting Non Funziona
```bash
# Verifica che il build sia completo
ls -la dist/

# Re-deploy
firebase deploy --only hosting --force
```

### App Rifiutata da App Store
- Leggi attentamente il feedback
- Correggi i problemi indicati
- Re-submit con note per il reviewer

### Problemi con Certificati iOS
```bash
# Rigenera certificati
eas credentials -p ios
```

---

## 📚 Risorse Utili

- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy Center](https://play.google.com/about/developer-content-policy/)
- [Expo Application Services](https://expo.dev/eas)

---

## 🎯 Prossimi Passi Consigliati

1. **Settimana 1**: Setup account e configurazioni
2. **Settimana 2**: Test approfonditi e screenshot
3. **Settimana 3**: Build e submit
4. **Settimana 4**: Risposta a feedback review e lancio

Buona fortuna con il lancio di Matchble! 🚀⚽🏀
