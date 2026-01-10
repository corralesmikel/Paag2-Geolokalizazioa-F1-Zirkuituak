# F1 Tracks 2025

Web aplikazio batek 1 Formulako 2025 denboraldiko zirkuituak erakusten ditu eta, zirkuitu batean klik egitean, mapa interaktibo bat erakusten du, gertuko hotel eta jatetxeekin.

---

## Edukien taula

- [Helburua](#helburua)
- [Erabilitako teknologiak](#erabilitako-teknologiak)
- [Erabilitako datuak](#erabilitako-datuak)
- [Nola exekutatu aplikazioa](#nola-exekutatu-aplikazioa)
- [Aplikazioaren erabilera](#aplikazioaren-erabilera)
- [Proiektuaren egitura](#proiektuaren-egitura)
- [Harrapaketak](#harrapaketak)
- [Notak eta bug-ak](#notak-eta-bug-ak) 

---

## Helburua

Proiektu honen helburua 1 2025 Formulako zirkuituak esploratzeko modu bisual eta interaktiboa eskaintzea da, erabiltzaileei aukera emanez:

- Zirkuitu bakoitzari buruzko oinarrizko informazioa kontsultatu (izena, kokapena, itzulerako errekorra, itzuliak, luzera, lehen lasterketa, Sari Nagusia).
- Zirkuituaren kokapena mapa batean bistaratzea.
- Zirkuitu bakoitzetik hurbil dauden hotelak eta jatetxeak esploratzea.
- Elementuak mapan bisualki iragaztea geruzen bidez: zirkuituak, hotelak eta jatetxeak.
- Kimi Räikkönenen aipamen dibertigarriak erakutsi nabigatzen ari den bitartean.

---

## Erabilitako teknologiak

- **HTML5** y **CSS3** egitura eta diseinurako.
- **JavaScript (ES6 Modules)** aplikazioaren logikarako.
- **GSAP** animazio leunetarako, zirkuituak eta hitzorduak kargatzean.
- **Leaflet.js** mapa interaktiboetarako.
- **OpenStreetMap** mapako oihaletarako eta hirien geokodifikaziorako.
- **Kanpoko API-ak**:
  - [API de Fórmula 1](https://www.api-football.com/) zirkuituen datuak lortzeko.
  - [API de Kimi Quotes](https://kimiquotes.pages.dev/api/quote) esaldiak erakusteko.
- **JSON lokal** hotel eta jatetxeetarako zirkuituko.

---

## Erabilitako datuak

- **F1 2025 zirkuituak**:  F1eko APItik lortutakoak, zerrendarekin iragazita `circuitsList.js`.
- **Hotelak eta jatetxeak**: JSON lokalak (`hotels.json` y `restaurants.json`) zirkuitu bidez antolatuak.
- **Geokodetzea**: OpenStreetMap-eko Nominatimen API, hiria eta herrialdea koordenatu bihurtzeko.

---

## Nola exekutatu aplikazioa

1. Biltegi hau klonatu edo deskargatu.
2. Ziurtatu zure F1eko `API` gakoa `API_KEY` gisa `config.js` duzula (adibidez: API_KEY = "TuCodigoDeApi").
3. Nabigatzaile batean, `index.html` irekitzen du.
4. Egin klik edozein zirkuitutan mapa interaktibora nabigatzeko.

> ⚠️ Oharra: Kanpoko CORS eta APIen mugak direla eta, VSCode `LiveServer` zerbitzari lokala erabiltzea gomendatzen da.

---

## Aplikazioaren erabilera

1. **Orrialde nagusia (`index.html`)**:
- 2025. denboraldiko zirkuitu guztiak erakusten dira.
- Bloke bakoitzak hau erakusten du:
  - Zirkuituaren irudia
  - Zirkuituaren izena
  - Sari Nagusia
  - Kokapena (hiria eta herrialdea)
  - Lehenengo lasterketa
  - Bira kopurua eta luzera
  - Itzulerako errekorra
- Zirkuitu batean klik egitean, `map.html` ra birbideratzen da hautatutako zirkuituarekin. 

2. **Mapa elkarreragilea (`map.html`)**:
- Zirkuitu bat hautatu gabe mapa-orria hautatzen bada, zirujau, jatetxe eta hotel guztien mapa agertuko da.
- Orri nagusitik zirkuitua hautatuz gero, hautatutako zirkuituan zentratutako mapa bat agertuko da.
- Geruzak eta iragazkiak:
  - Zirkuituak
  - Hotelak
  - Jatetxeak
- Markagailu bakoitza klikagarria da eta informazio zehatza duen popup bat erakusten du.
- Alboko paneletik aktiba edo desaktiba dezakezu geruza bakoitza.

---

## Proiektuaren egitura

```text
F1-Tracks-2025/
│
├─ index.html
├─ map.html
├─ css/
│   └─ styles.css
├─ js/
│   ├─ config.js <- Fitxategi hau ez dago sartuta, [ApiSports](https://www.api-sports.io/) ren berezko API key bat erabiliz gehitu behar da
│   ├─ circuits.js
│   ├─ circuitsList.js
│   ├─ map.js
│   └─ quote.js
├─ data/
│   ├─ hotels.json
│   └─ restaurants.json
├─ img/
│   ├─ favicon.png
│   ├─ f1.png
│   ├─ hotel-icon.png
│   └─ restaurant-icon.png
└─ README.md
```

---

## Harrapaketak

### Orrialde nagusia – F1 2025 zirkuituen zerrenda
![Orrialde nagusia](img/captura-index.png)

Ikuspegi honetan 1 Formulako 2025 denboraldiko zirkuitu guztiak erakusten dira informazio zehatzarekin eta animazioekin.

---

### Mapa interaktiboa – Zirkuituak, hotelak eta jatetxeak
![Mapa interaktiboa](img/captura-mapa-busqueda.png)
![Mapa interaktibo osoa](img/captura-mapa-completo.png)

Leaflet-en oinarritutako mapa interaktiboa. Bertan, aukeratutako zirkuitua ikus daiteke, gertuko hotel eta jatetxeekin batera, geruzakako iragazkiekin.
Maparik aukeratzen ez bada, mapa osoa agertuko da.

---

## Notak eta bug-ak

- Kanpoko HJA batzuek eguneko eskaera kopurua muga dezakete.
- Zirkuituen izenak aldatu egin daitezke eta ez datoz bat barne-zerrendarekin; beraz, baliteke zirkuitu batzuk ez erakustea.
- Baliteke zirkuitu batzuk mapan behar bezala kokatuta ez egotea.

---

Created by Mikel Corrales
