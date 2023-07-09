const festivalList = document.querySelector(".festival-list");
const restaurantList = document.querySelector(".restaurant-list");
const courseList = document.querySelector(".course-list");

const popupContainer = document.querySelector(".popup-container");
const topCloseBtn = document.querySelector(".top-close-btn-range");
const popupContentContainer = document.querySelectorAll(
  ".popup-content-container"
);
const courseListTitle = document.querySelector(".course-list-title");

let selectFestivalMarker;
let infoWindow;
let markerCloseTimeout;
let linePath = [];
let lines = [];
let distanceOverlay = [];

const popupList = ["festival", "restaurant", "course"];

const showPopup = (popupName) => {
  if (!popupList.includes(popupName)) return;

  mapContainer.className = "behind";
  popupContainer.classList.add("active");

  popupContentContainer.forEach((e) => {
    e.classList.remove("active");
  });

  document.querySelector(`.${popupName}-container`).classList.add("active");
};

const closePopup = () => {
  mapContainer.className = "";
  popupContainer.classList.remove("active");
};

const setPlaceMarker = (address, name) => {
  geocoder.addressSearch(address, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      selectFestivalMarker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      infoWindow = new kakao.maps.InfoWindow({
        content: `<div class="infoWindow">${name}</div>`,
      });
      infoWindow.open(map, selectFestivalMarker);

      map.setCenter(coords);

      clearTimeout(markerCloseTimeout);
      markerCloseTimeout = setTimeout(() => {
        selectFestivalMarker.setMap();
        infoWindow.close();
      }, 10000);
    }
  });
};

const getFestivals = () => {
  fetch("/api/festivals")
    .then((res) => res.json())
    .then((res) => {
      const { data } = res;

      festivalList.innerHTML = "";

      const fragment = new DocumentFragment();

      data.forEach((e) => {
        const newLi = document.createElement("li");

        const newImg = document.createElement("img");
        newImg.className = "festival-img";

        const newTopContainer = document.createElement("div");
        newTopContainer.className = "festival-top-container";

        const newNameDiv = document.createElement("div");
        newNameDiv.className = "festival-name";

        const newNameText = document.createTextNode(e.name);
        newNameDiv.appendChild(newNameText);

        newTopContainer.appendChild(newNameDiv);

        const newDateDiv = document.createElement("div");
        newDateDiv.className = "festival-date";

        const newDateText = document.createTextNode(
          `${e.startDate} ~ ${e.endDate}`
        );
        newDateDiv.appendChild(newDateText);

        newTopContainer.appendChild(newDateDiv);

        const newBottomContainer = document.createElement("div");
        newBottomContainer.className = "festival-bottom-container";

        const newPlaceDiv = document.createElement("div");
        newPlaceDiv.className = "festival-place";

        const newPlaceText = document.createTextNode(e.address);
        newPlaceDiv.appendChild(newPlaceText);

        newBottomContainer.appendChild(newPlaceDiv);

        const newServiceDiv = document.createElement("div");
        newServiceDiv.className = "festival-service";

        const newServiceText = document.createTextNode(`문의 : ${e.service}`);
        newServiceDiv.appendChild(newServiceText);

        newBottomContainer.appendChild(newServiceDiv);

        const newGoBtn = document.createElement("div");
        newGoBtn.className = "festival-go-btn";

        const newGoText = document.createTextNode("안내하기");
        newGoBtn.appendChild(newGoText);

        newGoBtn.addEventListener("click", () => {
          closePopup();
          setPlaceMarker(e.address, e.name);
        });

        newBottomContainer.appendChild(newGoBtn);

        newLi.appendChild(newImg);
        newLi.appendChild(newTopContainer);
        newLi.appendChild(newBottomContainer);

        fragment.appendChild(newLi);
      });

      festivalList.appendChild(fragment);
    });
};

const addressToLatLng = (position, address) => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result, status) => {
      const tmpLine = new kakao.maps.Polyline({
        map,
        path: [
          new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          new kakao.maps.LatLng(result[0].y, result[0].x),
        ],
      });
      tmpLine.setMap();
      resolve(tmpLine.getLength());
    });
  });
};

const getDistance = (address) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(addressToLatLng(position, address));
    });
  });
};

const getRestaurants = () => {
  fetch("/api/restaurants")
    .then((res) => res.json())
    .then(async (res) => {
      const { data } = res;

      restaurantList.innerHTML = "";

      const fragment = new DocumentFragment();

      for (const e of data) {
        const newLi = document.createElement("li");

        const newLeftContainer = document.createElement("div");
        newLeftContainer.className = "restaurant-left";

        const newImg = document.createElement("img");
        newImg.className = "restaurant-img";

        newLeftContainer.appendChild(newImg);

        const newRightContainer = document.createElement("div");
        newRightContainer.className = "restaurant-right";

        const newTitle = document.createElement("div");
        newTitle.className = "restaurant-title";

        const newNameDiv = document.createElement("div");
        newNameDiv.className = "restaurant-name";

        const newNameText = document.createTextNode(e.name);
        newNameDiv.appendChild(newNameText);

        newTitle.appendChild(newNameDiv);

        const newCategoryDiv = document.createElement("div");
        newCategoryDiv.className = "restaurant-category";

        const newCategoryText = document.createTextNode(e.category);
        newCategoryDiv.appendChild(newCategoryText);

        newTitle.appendChild(newCategoryDiv);

        newRightContainer.appendChild(newTitle);

        const newDistantDiv = document.createElement("div");
        newDistantDiv.className = "restaurant-distant";

        const distanceRestaurant = Math.ceil(await getDistance(e.address));
        // const distanceRestaurant = 1;

        const newDistantText = document.createTextNode(
          `현 위치로 부터 ${distanceRestaurant}m`
        );
        newDistantDiv.appendChild(newDistantText);

        newRightContainer.appendChild(newDistantDiv);

        const newTimeDiv = document.createElement("div");
        newTimeDiv.className = "restaurant-time";

        const newTimeText = document.createTextNode(
          `운영시간 : ${e.startTime} ~ ${e.endTime}`
        );
        newTimeDiv.appendChild(newTimeText);

        newRightContainer.appendChild(newTimeDiv);

        const newGoBtn = document.createElement("div");
        newGoBtn.className = "restaurant-go-btn";

        const newGoText = document.createTextNode("안내하기");
        newGoBtn.appendChild(newGoText);

        newRightContainer.appendChild(newGoBtn);

        newLi.appendChild(newLeftContainer);
        newLi.appendChild(newRightContainer);

        fragment.appendChild(newLi);
      }

      restaurantList.appendChild(fragment);
    });
};

const getCourses = () => {
  fetch("/api/courses")
    .then((res) => res.json())
    .then((res) => {
      const { data } = res;

      restaurantList.innerHTML = "";

      const fragment = new DocumentFragment();

      data.forEach((e) => {
        const newLi = document.createElement("li");

        const newDiv = document.createElement("div");
        newDiv.innerText = e.name;

        newDiv.addEventListener("click", () => {
          fetch(`/api/courses/${e.idx}`)
            .then((res) => res.json())
            .then((res) => {
              const { data } = res;

              data.forEach((e) => {
                linePath.push(new kakao.maps.LatLng(e.lat, e.lon));
              });

              linePath.map((e, i) => {
                if (i == 0) return;

                lines.push(
                  new kakao.maps.Polyline({
                    path: [linePath[i - 1], linePath[i]],
                    strokeWeight: 5,
                    strokeColor: "#3F48CC",
                    strokeOpacity: 1,
                    strokeStyle: "solid",
                  })
                );
              });

              lines.map((e, i) => {
                e.setMap(map);
                distanceOverlay.push(
                  new kakao.maps.CustomOverlay({
                    content:
                      '<div class="course-distance-display">거리 <span class="number">' +
                      Math.ceil(e.getLength()) +
                      "</span>m</div>",
                    position: new kakao.maps.LatLng(
                      (linePath[i].Ma + linePath[i + 1].Ma) / 2,
                      (linePath[i].La + linePath[i + 1].La) / 2
                    ),
                    yAnchor: 1,
                    zIndex: 2,
                  })
                );
              });

              distanceOverlay.forEach((e) => {
                e.setMap(map);
              });

              closePopup();
            });
        });

        newLi.appendChild(newDiv);

        fragment.appendChild(newLi);
      });

      courseList.appendChild(fragment);
    });
};

bottomMenuBtns.forEach((e) => {
  e.addEventListener("click", () => {
    showPopup(e.getAttribute("popupName"));
  });
});

topCloseBtn.addEventListener("click", closePopup);

courseListTitle.addEventListener("click", () => {
  linePath = [];

  lines.forEach((e) => {
    e.setMap();
  });

  lines = [];

  distanceOverlay.forEach((e) => {
    e.setMap();
  });

  distanceOverlay = [];

  closePopup();
});

getFestivals();
getRestaurants();
getCourses();
