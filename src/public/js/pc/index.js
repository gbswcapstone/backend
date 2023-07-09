window.addEventListener("scroll", function (e) {
  if (this.window.scrollY == 0) {
    document.querySelector("header").style.borderBottom =
      "1px solid transparent";
    document.querySelector("header").style.backgroundColor = "transparent";
  } else if (this.window.screenY > 1350) {
  } else {
    document.querySelector("header").style.borderBottom =
      "3px solid rgba(255,255,255,0.8)";
    document.querySelector("header").style.backgroundColor =
      "rgba(0,0, 0, 0.3)";
    document.querySelector("header").style.color = "white";
    document.querySelectorAll("header a").forEach((e) => {
      e.style.color = "white";
    });
  }
  const bar = this.document.getElementById("bar");
  bar.style.width = this.window.scrollY / 14.3 + "%";
});

var mySwiper = new Swiper(".swiper-container", {
  // 슬라이드를 버튼으로 움직일 수 있습니다.
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // 현재 페이지를 나타내는 점이 생깁니다. 클릭하면 이동합니다.
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },

  // 현재 페이지를 나타내는 스크롤이 생깁니다. 클릭하면 이동합니다.
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  // 3초마다 자동으로 슬라이드가 넘어갑니다. 1초 = 1000
  autoplay: {
    delay: 3000,
  },
});
