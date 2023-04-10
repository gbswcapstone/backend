const mapContainer = document.querySelector(".map");
const trackingCheckbox = document.querySelector("#tracking");
const goCurrentLoc = document.querySelector(".goCurrentLoc");

const mapOption = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
};

const map = new kakao.maps.Map(mapContainer, mapOption);

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // const moveLatLon = new kakao.maps.LatLng(lat, lon);

      // const marker = new kakao.maps.Marker({
      //   position: moveLatLon,
      // });

      // marker.setMap(null);
      // marker.setMap(map);

      // map.panTo(moveLatLon);

      if (trackingCheckbox.checked) {
        map.panTo(new kakao.maps.LatLng(lat, lon));
      }

      const gps_content =
        '<div><img class="pulse" draggable="false" unselectable="on" src="https://ssl.pstatic.net/static/maps/m/pin_rd.png" alt=""></div>';

      const currentOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(lat, lon),
        content: gps_content,
        map: map,
      });
      currentOverlay.setMap(map);
      setTimeout(() => {
        currentOverlay.setMap(null);
      }, 520);
    });
  }
};

goCurrentLoc.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.panTo(new kakao.maps.LatLng(lat, lon));
    });
  }
});

setInterval(getLocation, 500);
