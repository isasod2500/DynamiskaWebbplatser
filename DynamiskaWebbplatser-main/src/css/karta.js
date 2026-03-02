"use strict";

var map = null

document.addEventListener("DOMContentLoaded", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        map = getLocation(latitude, longitude)

        document.getElementById("searchBtn").addEventListener("click", search)
    }, function (error) {
        console.error("Fel vid hämtning av position:", error.message);
    });
});


const mapEl = document.getElementById("map");

/**
 * Funktion som markerar vart 
 * @param {float} latitude 
 * @param {float} longitude 
 * @returns 
 */
function getLocation(latitude, longitude) {
    var map = L.map("map").setView([latitude, longitude], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,

        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
}

var latResult = null
var lngResult = null
var nameResult = null
/**
 * Hämtar information så som latitud, longitud, namn och befolkning. Sorterar efter befolkning och går till största staden sökt.
 * @returns latResult, lngResult, nameResult
 */
async function search() {
    let searchBar = document.getElementById("search")
    let geoSearch = searchBar.value
    var errorList = document.getElementById("errorList")

    if (geoSearch == "")
    {      
        errorList.innerHTML = "";
        let error = document.createElement("li")
        error.innerHTML = "Du måste ange en plats"
        errorList.appendChild(error)
        return;
    }
    try {
        let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${geoSearch}&count=5`)
        var result = await response.json();
        result.results.sort((a, b) => b.population - a.population)
        latResult = result.results[0].latitude
        lngResult = result.results[0].longitude
        nameResult = result.results[0].name

        
        console.log(result.results)

    } catch (error) {
        console.log(error);
    }
    map.flyTo(new L.LatLng(latResult, lngResult), 14);
    placeMarker(map)
    return { latResult, lngResult, nameResult };
}

var marker;

/**
 * Funktion skapar markör på sökresultatets plats. Tar bort gamla markörer.
 */
function placeMarker() {
    if (marker) {
        map.removeLayer(marker)
        marker = L.marker([latResult, lngResult]).addTo(map);
        marker.bindPopup(`Du har anlänt till: ${nameResult}`)
    } else {
        marker = L.marker([latResult, lngResult]).addTo(map);
        marker.bindPopup(`Du har anlänt till: ${nameResult}`)
    }
}

