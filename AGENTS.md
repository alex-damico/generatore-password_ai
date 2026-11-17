# Regole di Progetto: Generatore Password

## Struttura Cartelle
- `/backend`: API REST in .NET 11 (porta `http://localhost:5000`)
- `/frontend`: Interfaccia utente in Flutter Web
- `/tests`: Test End-to-End con Cypress.js

## Contratto API (JSON)
- **Endpoint:** `POST http://localhost:5000/genera-password`
- **Richiesta:** `{"lunghezza": 16, "numeri": true, "simboli": true}`
- **Risposta:** `{"password": "..."}`
- **CORS:** Deve essere abilitato sul backend per accettare richieste dal frontend.

## Etichette UI (per Frontend e Test)
- Checkbox numeri: `"Includi Numeri"`
- Checkbox simboli: `"Includi Simboli"`
- Campo lunghezza: `"Lunghezza"`
- Pulsante invio: `"Genera Password"`
