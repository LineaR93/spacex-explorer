SpaceX Explorer
Versione: 0.0.0
Private: true

Descrizione: applicazione React + Vite per esplorare i razzi di SpaceX con login fittizio e ruoli user/admin

Prerequisiti:
Node.js v14+ e npm

Installazione ed esecuzione:
npm install
npm run dev      # avvia il server di sviluppo
npm run build    # crea la build di produzione
npm run preview  # preview della build prod
npm run lint     # controlla il codice con ESLint


Comandi utili:
dev → avvia il server di sviluppo (npm run dev)
ESLint (npm run lint)

Dipendenze principali:
react, react-dom, @reduxjs/toolkit, react-redux, react-router-dom, bootstrap

API utilizzata:
https://api.spacexdata.com/v4/rockets

Funzionalità:
login fittizio con due ruoli (user/admin)
lista e dettaglio razzi con paginazione e gestione errori
protezione delle rotte riservate
