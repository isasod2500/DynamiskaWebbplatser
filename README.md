# DynamiskaWebbplatser

## https://dynamiskawebbplatser.onrender.com/

Dynamisk webbplats som hämtar information från MIUNs API för kurs- och programstatistik.

Stapeldiagram och cirkeldiagram för kurser respektive program. 
Stapeldiagrammet tar fram dem sex populäraste kurserna och cirkeldiagrammet dem fem populäraste programmen.

Kartan tar från början användarens plats (eller så nära som möjligt), förutsatt att geolocation godkänns i webbläsaren.
Sökning hämtar information från Open-meteo Geocodings API och kartan hämtas från Leaflet. 
Markörer placeras ut vid sökresultat och sökresultatet utvärderas efter mängd befolkning.

Main och dev har sporadiska commits eftersom detta projekt strulade otroligt mycket av någon anledning. Fel i Visual Code, fel speglat innehåll lokalt vs github, render kan inte bygga pga fel osv osv.
