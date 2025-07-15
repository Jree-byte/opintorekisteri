

# Opintorekisteri APPI

Tämä on REST-rajapinta opintorekisteritietojen hallintaan. Sen avulla voidaan luoda, lukea, päivittää ja poistaa opiskelijoiden, opintojaksojen ja arviointien tietoja.

---

1. Ohjelman toiminta

Tämä sovellus on rakennettu Node.js:llä ja Express.js:llä, ja se käyttää MySQL-tietokantaa tiedon tallennukseen. Se noudattaa tyypillistä REST-arkkitehtuuria, jossa tietokannan resursseja (opiskelijat, opintojaksot, arvioinnit) hallitaan HTTP-pyyntöjen (GET, POST, PUT, DELETE) avulla.

Sovelluksen rakenne:

 `app.js`: Sovelluksen pää tiedosto, joka käynnistää Express-palvelimen, määrittää middlewaret  ja lataa reitit.
 `src/config/db.js`: Määrittelee tietokantayhteyden. Tässä tiedostossa luodaan MySQL-yhteys, jota mallit käyttävät tietokantakyselyihin. Yhteystiedot haetaan `.env`-ympäristömuuttujista.
 `src/models/`: Sisältää sovelluksen tietomallit (`opiskelija.model.js`, `opintojakso.model.js`, `arviointi.model.js`). Jokainen malli käsittää tietyn resurssin ja sisältää metodeja CRUD-operaatioiden suorittamiseen tietokannassa.
 `src/controllers/`: Sisältää kontrollerit (`opiskelijaController.js`, `opintojaksoController.js`, `arviointiController.js`). Nämä tiedostot käsittelevät saapuvia HTTP-pyyntöjä, varmistavat syötteen (esim. pakolliset kentät, viiteavaimet), kutsuvat malleja tietokantaoperaatioiden suorittamiseksi ja lähettävät vastauksen asianmukaisella HTTP-tilakoodilla ja datalla. Kontrollerit huolehtivat myös virheiden käsittelystä ja kartoittamisesta selkeisiin virheilmoituksiin.
 `src/routes/`: Määrittää API-reitit (`opiskelija.routes.js`, `opintojakso.routes.js`, `arviointi.routes.js`). Nämä tiedostot yhdistävät CRUD-operaatiot (GET, POST jne.) tiettyihin URL-polkuihin ja ohjaavat pyynnöt oikeisiin kontrollerifunktioihin. Ne käyttävät `express.Router()`-instansseja reittien organisointiin.
 `.env`: Ympäristömuuttujatiedosto, joka sisältää tietokannan yhteystiedot ja muut konfiguraatioasetukset. Tätä tiedostoa ei ole githubissa.

API:n toiminta:

1.  Ohjelma (esim. Postman) lähettää `POST`-pyynnön osoitteeseen `/api/opiskelijat` JSON-muotoisena.
2.  `app.js` vastaanottaa pyynnön ja reitittää sen `opiskelija.routes.js`-tiedoston kautta `opiskelijaController.js`-tiedoston `create`-funktioon.
3.  `opiskelijaController.create` tarkistaa, että pyynnön keho (`req.body`) sisältää kaikki pakolliset kentät (etunimi, sukunimi, syntymäaika, email). Jos kenttiä puuttuu, se palauttaa virhe ilmoituksen.
4.  Kontrolleri kutsuu `Opiskelija.model.js`-tiedoston `create`-metodia ja välittää sille opiskelijan tiedot.
5.  `Opiskelija.create`-metodi suorittaa `INSERT`-kyselyn MySQL-tietokantaan.
6.  Jos lisäys onnistuu, malli palauttaa luodun opiskelijan tiedot (mukaan lukien tietokannan generoiman ID:n).
7.  Kontrolleri vastaanottaa tiedot ja palauttaa asiakkaalle `201 Created` -tilakoodin ja luodun opiskelijan tiedot JSON-muodossa.
8.  Jos tietokantatoiminnassa tapahtuu virhe, virhe siepataan `try-catch`-lohkossa. Kontrolleri palauttaa asianmukaisen virhetilakoodin  ja virheviestin. Virhe kirjataan myös palvelimen konsoliin.

---
 2. ER-diagrammi

Alla on ER-diagrammi, joka kuvaa tietokannan taulujen välisiä suhteita ja niiden sisältämiä kenttiä.
![Opintorekisterin ER-diagrammi](images/ER_diagrammi.png)