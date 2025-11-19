
# ✅ Deployment Checklist per Matchble

## Pre-Deployment

### 🔧 Setup Iniziale

#### Account e Servizi
- [ ] Account Apple Developer creato ($99/anno)
- [ ] Account Google Play Developer creato ($25 una tantum)
- [ ] Progetto Firebase configurato
- [ ] Account Expo creato
- [ ] EAS CLI installato (`npm install -g eas-cli`)
- [ ] Firebase CLI installato (`npm install -g firebase-tools`)

#### Configurazione Progetto
- [ ] `app.json` configurato con bundle IDs corretti
- [ ] `eas.json` configurato
- [ ] `firebase.json` configurato
- [ ] Firebase config aggiunto all'app
- [ ] Permessi iOS configurati in `app.json`
- [ ] Permessi Android configurati in `app.json`

### 📱 App Preparation

#### Testing
- [ ] Testato su iPhone reale (iOS 15+)
- [ ] Testato su Android reale (Android 8+)
- [ ] Testato su iPad
- [ ] Testato su tablet Android
- [ ] Testato su web (Chrome, Safari, Firefox)
- [ ] Tutte le funzionalità funzionano
- [ ] Nessun crash critico
- [ ] Performance accettabili (60fps)
- [ ] Caricamento immagini funziona
- [ ] Notifiche funzionano
- [ ] Autenticazione funziona (Google, Apple, Email)

#### Code Quality
- [ ] Nessun console.error in produzione
- [ ] Nessun warning critico
- [ ] Codice pulito e commentato
- [ ] TypeScript types corretti
- [ ] ESLint passa senza errori
- [ ] Build locale funziona (`expo export`)

#### Assets
- [ ] App icon 1024x1024px (iOS)
- [ ] App icon 512x512px (Android)
- [ ] Splash screen configurato
- [ ] Favicon per web
- [ ] Feature graphic 1024x500px (Android)
- [ ] Screenshot preparati (almeno 3 per piattaforma)

### 📄 Legal & Documentation

#### Privacy & Terms
- [ ] Privacy Policy scritta
- [ ] Terms of Service scritti
- [ ] Privacy Policy pubblicata su web
- [ ] Terms of Service pubblicati su web
- [ ] Link privacy policy in app
- [ ] Link terms of service in app
- [ ] Cookie policy (se necessario)

#### Store Listing
- [ ] Nome app deciso
- [ ] Descrizione breve scritta (80 caratteri)
- [ ] Descrizione completa scritta
- [ ] Keywords ricercate e selezionate
- [ ] Screenshot con descrizioni
- [ ] Categoria selezionata
- [ ] Age rating determinato
- [ ] Support email configurato
- [ ] Support URL configurato
- [ ] Marketing URL configurato

---

## 🌐 Web Deployment

### Firebase Hosting

#### Setup
- [ ] `firebase login` eseguito
- [ ] `firebase init hosting` eseguito
- [ ] Public directory impostato su `dist`
- [ ] Single-page app configurato

#### Build & Deploy
- [ ] `npx expo export -p web` eseguito con successo
- [ ] Build output verificato in `dist/`
- [ ] `firebase deploy --only hosting` eseguito
- [ ] Sito web accessibile
- [ ] Tutte le pagine funzionano
- [ ] Routing funziona correttamente
- [ ] Assets caricano correttamente

#### Post-Deploy
- [ ] Testato su desktop
- [ ] Testato su mobile browser
- [ ] SEO meta tags verificati
- [ ] Performance verificata (Lighthouse)
- [ ] Analytics configurato
- [ ] Dominio personalizzato configurato (opzionale)

---

## 📱 iOS Deployment

### Pre-Build

#### Apple Developer
- [ ] Apple Developer account attivo
- [ ] Team ID ottenuto
- [ ] App ID creato in Developer Portal
- [ ] App creata in App Store Connect
- [ ] ASC App ID ottenuto

#### EAS Configuration
- [ ] `eas login` eseguito
- [ ] `eas build:configure` eseguito
- [ ] Bundle identifier corretto in `app.json`
- [ ] Build number incrementato
- [ ] Version number corretto

### Build

#### First Build
- [ ] `eas build -p ios --profile production` eseguito
- [ ] Build completata con successo (15-25 min)
- [ ] Build scaricata e testata su TestFlight (opzionale)
- [ ] Nessun crash su TestFlight

#### Subsequent Builds
- [ ] Build number incrementato in `app.json`
- [ ] Changelog preparato
- [ ] Build eseguita

### Submit

#### App Store Connect
- [ ] App information completata
  - [ ] Nome
  - [ ] Sottotitolo
  - [ ] Descrizione
  - [ ] Keywords
  - [ ] Support URL
  - [ ] Marketing URL
  - [ ] Privacy Policy URL
- [ ] Pricing & Availability configurato
- [ ] App Privacy completato
- [ ] Screenshots caricati (iPhone, iPad)
- [ ] App icon verificato
- [ ] Age rating completato
- [ ] App Review Information compilato
  - [ ] Contact info
  - [ ] Demo account (se necessario)
  - [ ] Note per reviewer

#### Submit
- [ ] `eas submit -p ios --latest` eseguito
- [ ] Build selezionata in App Store Connect
- [ ] "Submit for Review" cliccato
- [ ] Conferma ricevuta da Apple

### Post-Submit
- [ ] Status monitorato in App Store Connect
- [ ] Risposto a eventuali rejection
- [ ] App approvata
- [ ] App pubblicata
- [ ] Link App Store condiviso

---

## 🤖 Android Deployment

### Pre-Build

#### Google Play Console
- [ ] Google Play Developer account attivo
- [ ] App creata in Play Console
- [ ] Service account creato
- [ ] Service account JSON scaricato
- [ ] Service account JSON salvato come `google-service-account.json`

#### EAS Configuration
- [ ] Package name corretto in `app.json`
- [ ] Version code incrementato
- [ ] Version name corretto
- [ ] `eas.json` configurato con service account path

### Build

#### First Build
- [ ] `eas build -p android --profile production` eseguito
- [ ] Build completata con successo (10-20 min)
- [ ] AAB scaricato e verificato
- [ ] Testato su dispositivo reale (opzionale)

#### Subsequent Builds
- [ ] Version code incrementato in `app.json`
- [ ] Changelog preparato
- [ ] Build eseguita

### Submit

#### Play Console
- [ ] Store listing completato
  - [ ] Titolo app
  - [ ] Descrizione breve
  - [ ] Descrizione completa
  - [ ] Screenshots (phone, tablet)
  - [ ] Feature graphic
  - [ ] App icon
- [ ] Content rating completato
- [ ] Target audience selezionato
- [ ] Pricing & distribution configurato
- [ ] Privacy Policy URL aggiunto
- [ ] App category selezionata
- [ ] Contact details aggiunti

#### Release
- [ ] `eas submit -p android --latest` eseguito
- [ ] Release creata in Play Console
- [ ] Release notes aggiunte
- [ ] Rollout percentage impostato (es: 100%)
- [ ] "Start rollout to Production" cliccato

### Post-Submit
- [ ] Status monitorato in Play Console
- [ ] App approvata (poche ore - 1 giorno)
- [ ] App pubblicata
- [ ] Link Play Store condiviso

---

## 🔄 Post-Deployment

### Monitoring

#### Analytics
- [ ] Firebase Analytics configurato
- [ ] Eventi custom tracciati
- [ ] Conversioni monitorate
- [ ] Retention monitorato

#### Crash Reporting
- [ ] Firebase Crashlytics configurato
- [ ] Crash-free rate monitorato (target: 99%+)
- [ ] Errori critici risolti rapidamente

#### Performance
- [ ] Firebase Performance Monitoring configurato
- [ ] Tempi di caricamento monitorati
- [ ] Network requests ottimizzati

#### User Feedback
- [ ] Recensioni monitorate (App Store, Play Store)
- [ ] Rating medio tracciato (target: 4.5+)
- [ ] Feedback negativo gestito rapidamente
- [ ] Feature requests raccolte

### Marketing

#### Launch
- [ ] Post sui social media
- [ ] Email a beta testers
- [ ] Press release (opzionale)
- [ ] Landing page aggiornata

#### ASO (App Store Optimization)
- [ ] Keywords ottimizzate
- [ ] Screenshots A/B testati
- [ ] Descrizione ottimizzata
- [ ] Icona testata

#### Growth
- [ ] Referral program considerato
- [ ] Partnerships con centri sportivi
- [ ] Collaborazioni con influencer sportivi
- [ ] Ads considerati (Google Ads, Facebook Ads)

---

## 🐛 Troubleshooting

### Build Failures

#### iOS
- [ ] Certificati verificati: `eas credentials -p ios`
- [ ] Cache pulita: `eas build --clear-cache -p ios`
- [ ] Bundle ID corretto
- [ ] Provisioning profile valido

#### Android
- [ ] Keystore verificato: `eas credentials -p android`
- [ ] Cache pulita: `eas build --clear-cache -p android`
- [ ] Package name corretto
- [ ] Service account configurato

### Rejection Issues

#### Common iOS Rejections
- [ ] Crash all'avvio
- [ ] Funzionalità incomplete
- [ ] Privacy policy mancante
- [ ] Permessi non giustificati
- [ ] Design non conforme alle guidelines

#### Common Android Rejections
- [ ] Privacy policy mancante
- [ ] Permessi non necessari
- [ ] Content rating errato
- [ ] Crash su dispositivi specifici

---

## 📊 Success Metrics

### Week 1
- [ ] 100+ downloads
- [ ] 50+ registrazioni
- [ ] 10+ risultati pubblicati
- [ ] 0 crash critici
- [ ] 4.0+ rating

### Month 1
- [ ] 1,000+ downloads
- [ ] 500+ utenti attivi
- [ ] 100+ risultati pubblicati
- [ ] 5+ tornei creati
- [ ] 99%+ crash-free rate
- [ ] 4.5+ rating

### Month 3
- [ ] 5,000+ downloads
- [ ] 2,000+ utenti attivi
- [ ] 500+ risultati pubblicati
- [ ] 20+ tornei attivi
- [ ] 50%+ retention D7
- [ ] 4.5+ rating

---

## 🎯 Next Steps

### Immediate (Week 1-2)
- [ ] Monitora crash e errori
- [ ] Rispondi a recensioni
- [ ] Fix bug critici
- [ ] Raccogli feedback utenti

### Short-term (Month 1-3)
- [ ] Implementa feature richieste
- [ ] Ottimizza performance
- [ ] Espandi marketing
- [ ] A/B test features

### Long-term (Month 3-6)
- [ ] Nuovi sport
- [ ] Funzionalità social avanzate
- [ ] Integrazione con wearables
- [ ] Espansione internazionale

---

## 📝 Notes

### Versioning Strategy
- **1.0.0**: Initial release
- **1.0.x**: Bug fixes
- **1.x.0**: New features
- **x.0.0**: Major updates

### Release Schedule
- **Bug fixes**: Ogni 1-2 settimane
- **Features**: Ogni 4-6 settimane
- **Major**: Ogni 3-6 mesi

### Backup Strategy
- [ ] Keystore Android salvato in luogo sicuro
- [ ] Certificati iOS salvati
- [ ] Firebase config salvato
- [ ] Database backup configurato

---

## ✅ Final Checklist

Prima di premere "Submit":
- [ ] Tutto testato su dispositivi reali
- [ ] Nessun crash critico
- [ ] Privacy policy pubblicata
- [ ] Screenshots pronti
- [ ] Descrizioni scritte
- [ ] Support email configurato
- [ ] Analytics configurato
- [ ] Backup completati
- [ ] Team informato
- [ ] Changelog preparato

**Sei pronto per il lancio! 🚀**
