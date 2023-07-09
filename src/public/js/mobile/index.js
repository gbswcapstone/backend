const nowLocationAddressSpan = document.querySelector(".now-location-address");
const sideCenterLocation = document.querySelector(".side-center-location");

const bottomMenuBtns = document.querySelectorAll(".bottom-menu-btn");

let lat = 36.3526576;
let lon = 128.6970053;

const mapContainer = document.querySelector("#map");
const mapOption = {
  center: new kakao.maps.LatLng(lat, lon),
  level: 3,
};

const map = new kakao.maps.Map(mapContainer, mapOption);
const geocoder = new kakao.maps.services.Geocoder();

let searchMarkers = [];

let movingTimeOut;

let centerMarker = new kakao.maps.CustomOverlay({});
let isCenterMarkerDisplay = false;

let isUS = true;
let isMoving = false;

const setCenter = () => {
  navigator.geolocation.watchPosition((position) => {
    centerMarker.setMap(null);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    geocoder.coord2Address(lon, lat, (result, status) => {
      const address = !!result[0].road_address
        ? result[0].road_address.address_name
        : result[0].address.address_name;
      const region = result[0].address.region_2depth_name;
      nowLocationAddressSpan.innerText = address;

      if (region != "의성군") {
        return (isUS = false);
      }
      return (isUS = true);
    });

    if (!isUS) return;

    const setMap = new kakao.maps.LatLng(lat, lon);

    const makerContent = `
  <div class="center-marker"></div>
  `;

    centerMarker = new kakao.maps.CustomOverlay({
      position: setMap,
      content: makerContent,
    });

    centerMarker.setMap(map);

    if (!isMoving) {
      map.setCenter(setMap);
    }
  });
};

const setMapViewCenter = () => {
  const setMap = new kakao.maps.LatLng(lat, lon);

  map.setCenter(setMap);
};

sideCenterLocation.addEventListener("click", setMapViewCenter);

kakao.maps.event.addListener(map, "drag", () => {
  isMoving = true;
});

kakao.maps.event.addListener(map, "dragend", () => {
  movingTimeOut = setTimeout(() => {
    isMoving = false;
  }, 3000);
});

setCenter();
