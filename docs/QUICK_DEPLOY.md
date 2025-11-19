
# 🚀 Quick Deploy Commands

## Comandi Rapidi per il Deployment

### 🌐 Web (Firebase Hosting)
```bash
# Build e deploy in un comando
npm run build:web && firebase deploy --only hosting

# Solo deploy (se hai già fatto build)
firebase deploy --only hosting

# Preview prima del deploy
firebase hosting:channel:deploy preview
```

### 📱 iOS (App Store)

#### Prima Build
```bash
# 1. Login a EAS (solo prima volta)
eas login

# 2. Configura il progetto (solo prima volta)
eas build:configure

# 3. Build
eas build -p ios --profile production

# 4. Submit
eas submit -p ios --latest
```

#### Aggiornamenti
```bash
# 1. Incrementa buildNumber in app.json (es: da "1" a "2")

# 2. Build e submit
eas build -p ios --profile production && eas submit -p ios --latest
```

### 🤖 Android (Google Play Store)

#### Prima Build
```bash
# 1. Login a EAS (solo prima volta)
eas login

# 2. Build
eas build -p android --profile production

# 3. Submit
eas submit -p android --latest
```

#### Aggiornamenti
```bash
# 1. Incrementa versionCode in app.json (es: da 1 a 2)

# 2. Build e submit
eas build -p android --profile production && eas submit -p android --latest
```

### 🔄 Deploy Completo (Tutte le Piattaforme)

```bash
# 1. Incrementa versioni in app.json
# - iOS: buildNumber
# - Android: versionCode
# - Expo: version (opzionale)

# 2. Build web
npm run build:web

# 3. Deploy web
firebase deploy --only hosting

# 4. Build iOS
eas build -p ios --profile production

# 5. Build Android
eas build -p android --profile production

# 6. Submit iOS
eas submit -p ios --latest

# 7. Submit Android
eas submit -p android --latest
```

### 🧪 Test Build (Prima di Production)

```bash
# iOS Preview (Internal Testing)
eas build -p ios --profile preview

# Android Preview (APK per test)
eas build -p android --profile preview

# Scarica e testa su dispositivo reale
```

### 📊 Monitoraggio

```bash
# Vedi status delle build
eas build:list

# Vedi dettagli di una build specifica
eas build:view [BUILD_ID]

# Vedi log di una build
eas build:logs [BUILD_ID]
```

### 🔧 Troubleshooting

```bash
# Pulisci cache e riprova
eas build --clear-cache -p ios
eas build --clear-cache -p android

# Rigenera credenziali iOS
eas credentials -p ios

# Rigenera credenziali Android
eas credentials -p android

# Verifica configurazione
eas config

# Aggiorna EAS CLI
npm install -g eas-cli@latest
```

### 📝 Checklist Pre-Deploy

Prima di ogni deploy, verifica:

- [ ] Tutte le funzionalità funzionano correttamente
- [ ] Nessun console.error o warning critico
- [ ] Testato su dispositivi reali (iOS e Android)
- [ ] Incrementate le versioni in app.json
- [ ] Firebase config è corretto
- [ ] Screenshot aggiornati (se necessario)
- [ ] Privacy policy aggiornata (se necessario)
- [ ] Changelog preparato per gli store

### 🎯 Workflow Consigliato

1. **Sviluppo**: Lavora in locale con `npm run dev`
2. **Test**: Build preview con `eas build --profile preview`
3. **Staging**: Deploy web su Firebase preview channel
4. **Production**: Deploy completo su tutti gli store

### ⏱️ Tempi Stimati

- **Web Deploy**: 2-5 minuti
- **iOS Build**: 15-25 minuti
- **Android Build**: 10-20 minuti
- **iOS Review**: 1-3 giorni
- **Android Review**: Poche ore - 1 giorno

### 💡 Tips

- Usa `--profile preview` per test interni prima di production
- Tieni traccia delle versioni in un changelog
- Fai backup delle credenziali (keystore Android, certificati iOS)
- Monitora Firebase Analytics dopo ogni deploy
- Rispondi velocemente alle recensioni negative negli store
