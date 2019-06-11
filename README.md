
# Wirtualny lekarz (praca licencjacka)

### Wymagane oprogramowanie (linki do instalacji)
* Node (8.10.0 lub wyższa) [Link](https://nodejs.org/en/download/)
* npm (6.9.0 lub wyższa) [Link](https://www.npmjs.com/package/npm)
* MongoDB (3.6.3 lub wyższa) [Link](https://docs.mongodb.com/manual/administration/install-community/)

### Uruchomienie bazy danych
```
mongod
```
### Instalacja bibliotek
W folderze projektu
```
npm install
```

### Załadowanie danych
W folderze projektu, po wcześniejszej instalacji bibliotek
```
node seed/seed.js
```
### Testowanie
W folderze projektu, po wcześniejszej instalacji bibliotek i załadowaniu danych
```
npm test
```

### Uruchomienie
W folderze projektu, po wcześniejszej instalacji bibliotek i załadowaniu danych
```
npm start
```

Portal będzie dostępny pod adresem 
```
localhost:3001
```