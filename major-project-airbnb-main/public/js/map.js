mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,  
  zoom: 9
});


const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML("<h3>Exact Location</h3>")
  )
  .addTo(map);

marker.togglePopup();


const markerEl = marker.getElement();
markerEl.classList.add("custom-marker-hover");
