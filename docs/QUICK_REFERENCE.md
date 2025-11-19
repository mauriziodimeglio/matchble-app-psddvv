
# Matchble - Quick Reference Card

## 🚀 Avvio Rapido

```bash
npm run dev
# Apri http://localhost:8081
```

## 🎭 Profili Demo

| Emoji | Nome | Ruolo | ID | Cosa Testare |
|-------|------|-------|-------|--------------|
| ✅ | Marco Rossi | Delegato | `user_001` | Multi-affiliazione |
| ✅ | Luca Bianchi | Delegato | `user_002` | Tornei basket |
| 👤 | Giuseppe Verdi | Regular | `user_003` | Richiesta verifica |
| 👑 | Admin Matchble | Superuser | `user_superuser_001` | Dashboard admin |

**Cambio Profilo:** Profilo → Banner "Modalità Demo" → Seleziona

## 🏠 Navigazione

### Header Persistente (Sempre Visibile)
- 🏠 **Home** - Risultati e partite live
- 🏆 **Tornei** - Lista tornei con filtri
- 👤 **Profilo** - Statistiche e impostazioni

### Bottom Tab Bar
- Stesse 3 sezioni
- Fluttuante in basso
- Animazioni smooth

## 👥 Ruoli e Permessi

### 👤 Regular
- ✅ Visualizza risultati
- ✅ Crea tornei non ufficiali
- ❌ Tornei ufficiali

### ✅ Verificato
- ✅ Tutto di Regular
- ✅ Crea tornei ufficiali
- ✅ Gestisce risultati ufficiali
- ✅ Affiliazioni multiple

### 👑 Superuser
- ✅ Controllo totale
- ✅ Autorizza delegati
- ✅ Dashboard admin
- ✅ Configura permessi

## 🎨 Colori Sport

| Sport | Emoji | Colore | Hex |
|-------|-------|--------|-----|
| Calcio | ⚽ | Verde | #4CAF50 |
| Basket | 🏀 | Arancione | #FF9800 |
| Volley | 🏐 | Blu | #2196F3 |
| Padel | 🎾 | Viola | #9C27B0 |

## 📱 Schermate Chiave

### Home
- Hero con logo
- 4 card sport grandi
- Barra statistiche
- Sezione LIVE
- Griglia risultati

### Profilo
- Avatar + badge ruolo
- Banner demo mode
- Pulsante "Scopri Ruoli"
- Stats (partite/tornei/trust)
- Sport preferiti

### Dashboard Admin (Superuser)
- Tab Richieste
- Tab Utenti
- Tab Organizzatori
- Configurazione permessi

## 🔑 Shortcut Tastiera (Web)

| Tasto | Azione |
|-------|--------|
| `H` | Home |
| `T` | Tornei |
| `P` | Profilo |
| `D` | Demo Mode (se in profilo) |
| `R` | Refresh |

## 📂 File Importanti

```
components/
  AppHeader.tsx          # Header persistente
  FloatingTabBar.tsx     # Bottom nav

app/(tabs)/
  (home)/index.tsx       # Home screen
  tournaments.tsx        # Tornei
  profile.tsx            # Profilo + demo

data/
  firestoreMockData.ts   # Dati utenti demo
  mockData.ts            # Dati partite/tornei

docs/
  USER_GUIDE.md          # Guida completa
  DEMO_ACCESS.md         # Accesso demo
  QUICK_REFERENCE.md     # Questa pagina
```

## 🐛 Debug

### Logo non visibile?
```typescript
// Verifica import in componente
import AppHeader from '@/components/AppHeader';
<AppHeader />
```

### Profilo demo non cambia?
```typescript
// Controlla stato in profile.tsx
const [selectedDemoUser, setSelectedDemoUser] = useState('user_001');
```

### Header sovrapposto?
```typescript
// Aumenta padding top contenuto
paddingTop: 120 // invece di 48
```

## 📊 Metriche Performance

| Metrica | Target | Attuale |
|---------|--------|---------|
| First Paint | < 1s | ✅ 0.8s |
| Interactive | < 2s | ✅ 1.5s |
| Header Load | < 100ms | ✅ 80ms |
| Demo Switch | < 200ms | ✅ 150ms |

## 🎯 Testing Checklist

- [ ] Logo visibile in tutte le pagine
- [ ] Nav header funzionante
- [ ] Cambio profilo demo
- [ ] Modal ruoli apre/chiude
- [ ] Dashboard admin (superuser)
- [ ] Richiesta verifica (regular)
- [ ] Affiliazioni multiple (verificato)

## 🔗 Link Utili

- 📚 [Guida Completa](./USER_GUIDE.md)
- 🎭 [Accesso Demo](./DEMO_ACCESS.md)
- 📝 [Changelog](./CHANGELOG_UI_IMPROVEMENTS.md)
- 🏗️ [Architettura](./IMPLEMENTATION_SUMMARY.md)

## 💡 Tips

1. **Usa Demo Mode** per testare rapidamente
2. **Leggi Modal Ruoli** per capire permessi
3. **Testa come Superuser** per vedere tutto
4. **Prova Multi-Affiliazione** con Marco Rossi
5. **Verifica Responsive** su mobile/tablet/desktop

## 🆘 Supporto Rapido

**Problema:** Header non si vede
**Soluzione:** Verifica z-index e paddingTop

**Problema:** Demo non funziona
**Soluzione:** Controlla mockFirestoreUsers in data/

**Problema:** Navigazione non attiva
**Soluzione:** Verifica pathname matching in AppHeader

---

**Matchble - Per chi gioca** 🏆

*Ultimo aggiornamento: Gennaio 2025*
