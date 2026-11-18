# Regole di Progetto: Generatore Password

## Struttura Cartelle
- `/backend`: API REST in .NET 11 (porta `http://localhost:5000`)
- `/frontend`: Interfaccia utente in Flutter Web
- `/tests`: Test End-to-End con Cypress.js

## Contratto API (JSON)
- **Endpoint:** `POST http://localhost:5000/genera-password`
- **Richiesta:** `{"length": 16, "number": true, "symbol": true}`
- **Risposta:** `{"password": "..."}`
- **CORS:** Deve essere abilitato sul backend per accettare richieste dal frontend.

## Etichette UI (per Frontend e Test)
- Checkbox numeri: `"Includi Numeri"`
- Checkbox simboli: `"Includi Simboli"`
- Campo lunghezza: `"Lunghezza"`
- Pulsante invio: `"Genera Password"`

## Convenzioni di Codice e Lingua
- **Codice in Inglese:** Scrivi tutti i nomi di file, classi, metodi, variabili, proprietà e commenti nel codice rigorosamente in **inglese** (es. `generatePassword`, `includeNumbers`, `length`).
- **Interfaccia Utente in Italiano:** Mantieni in **italiano** esclusivamente le stringhe e le etichette visibili all'utente finale nella UI (come `"Genera Password"`, `"Includi Numeri"`).

## Ambiente e Strumenti
- **Flutter:** Per ogni comando Flutter nell'ambiente va usato il prefisso `fvm` (es. `fvm flutter`, `fvm flutter create`, `fvm flutter run`, `fvm flutter pub get`).


