const mapContainer = document.querySelector("#map"),
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

const map = new kakao.maps.Map(mapContainer, mapOption);

let centerMarker = new kakao.maps.CustomOverlay({});
let isCenterMarkerDisplay = false;

const a = navigator.geolocation.watchPosition((position) => {
  console.log(position);
  if (isCenterMarkerDisplay) {
    centerMarker.setMap(null);
  } else {
    isCenterMarkerDisplay = true;
  }

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  alert(lat + "\n" + lon);

  const setMap = new kakao.maps.LatLng(lat, lon);

  const makerContent = `
  <div class="center-marker"></div>
  `;

  centerMarker = new kakao.maps.CustomOverlay({
    position: setMap,
    content: makerContent,
  });

  centerMarker.setMap(map);
  console.log(1);

  map.setCenter(setMap);
});
