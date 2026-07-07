// 共通
let windowHeight = $(window).height();
const header = $("header");
const txtEns = document.querySelectorAll(".lang-en");
const txtJps = document.querySelectorAll(".lang-jp");
const btnEns = document.querySelectorAll(".en-btn");
const btnJps = document.querySelectorAll(".jp-btn");

// ページ内リンクスムーススクロール
$(function () {
  const speed = 400;
  const defaultScrollMargin = 30;
  // 共通のスクロール実行関数
  function scrollToTarget($target) {
    if (!$target.length) return;
    const headerHeight = $("header").outerHeight() || 0;
    let position = $target.offset().top - headerHeight;
    let scrollMargin = defaultScrollMargin;
    position = position - scrollMargin;
    // スクロール実行
    $("body,html").stop().animate({ scrollTop: position }, speed, "swing");
  }
  //ページ内リンク
  $('a[href^="#"]').on("click", function () {
    const href = $(this).attr("href");
    const $target = $(href === "#" || href === "" ? "html" : href);

    scrollToTarget($target);
    return false; // ページ遷移（デフォルト挙動）をキャンセル
  });
  //別ページから#つき
  $(window).on("load", function () {
    const hash = window.location.hash;
    if (hash) {
      window.scrollTo(0, 0);
      setTimeout(function () {
        const $target = $(hash);
        if ($target.length) {
          scrollToTarget($target);
        }
      }, 10);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mainVisual = document.querySelector(".mv");
  const body = document.body;
  // //pcのみ
  // if (window.matchMedia("(width > 767px)").matches) {
  // トップページヘッダー制御
  const observerOptions = {
    root: null,
    // 完全に見えなくなったら発火
    threshold: 0,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // entry.isIntersecting は「見えているかどうか」
      if (!entry.isIntersecting) {
        // メインビジュアルが画面から消えた
        body.classList.add("mv-scrolled");
      } else {
        body.classList.remove("mv-scrolled");
      }
    });
  }, observerOptions);
  const topBody = document.querySelector("body#top");
  if (topBody) {
    // メインビジュアルの監視を開始
    observer.observe(mainVisual);
  }

  //言語切り替え
  //JPボタンが押された
  btnJps.forEach((btnJp) => {
    btnJp.addEventListener("click", () => {
      body.classList.remove("is-en");
      body.classList.add("is-jp");
      btnJps.forEach((btn) => btn.classList.add("active"));
      btnEns.forEach((btn) => btn.classList.remove("active"));
    });
  });
  //ENボタンが押された
  btnEns.forEach((btnEn) => {
    btnEn.addEventListener("click", () => {
      body.classList.remove("is-jp");
      body.classList.add("is-en");
      btnEns.forEach((btn) => btn.classList.add("active"));
      btnJps.forEach((btn) => btn.classList.remove("active"));
    });
  });
});

// sp burger menu
const burger = $(".burger-btn");
const nav = $(".main-nav");
const overlay = $(".nav-overlay");
const body = $("body");
burger.click(function () {
  $(this).toggleClass("active");
  nav.toggleClass("active");
  overlay.toggleClass("active");
  if ($(this).hasClass("active")) {
    body.css("overflow", "clip");
  } else {
    body.css("overflow", "");
  }
});
$(".main-nav ul li a[href^='#'], .main-nav ul li.languages p").click(
  function () {
    burger.removeClass("active");
    nav.removeClass("active");
    overlay.removeClass("active");
    body.css("overflow", "");
  },
);
overlay.click(function () {
  burger.toggleClass("active");
  nav.toggleClass("active");
  $(this).removeClass("active");
  body.css("overflow", "");
});

// ﾒﾆｭｰ詳細ページ
$(function () {
  const menuData = {
    fullThrottleBurger: {
      image: "img/burger.jpg",
      title: { en: "FULL THROTTLE BURGER", jp: "フルスロットル・バーガー" },
      price: "$20.50",
      desc: {
        en: "Full throttle to recharge. Not just giant. Juicy triple patties with our secret BBQ sauce on a toasted bun.",
        jp: "フルスロットルでエネルギーチャージ。ただ大きいだけではない。ジューシーな肉厚トリプルパティに自家製BBQソースを絡めた自慢の一品。",
      },
    },
    midnightDriverShake: {
      image: "img/shake.jpg",
      title: {
        en: "MIDNIGHT DRIVER SHAKE",
        jp: "ミッドナイトドライバー・シェイク",
      },
      price: "$11.00",
      desc: {
        en: "Fuel for the long night ride. Rich, creamy vanilla blended with strong espresso and crushed oreos to keep your eyes wide open.",
        jp: "長い夜のドライブを走り抜くための燃料。濃厚なバニラに強烈なエスプレッソと砕いたオレオをブレンドした、目が覚める一杯。",
      },
    },
    pitStopFries: {
      image: "img/fries.jpg",
      title: { en: "PIT STOP FRIES", jp: "ピットストップ・フライ" },
      price: "$7.50",
      desc: {
        en: "Quick pit stop, maximum recharge. Crispy golden fries loaded with melted cheddar, crispy bacon, and a kick of jalapeno.",
        jp: "最速のピットインで、最大級のチャージ。カリカリの黄金ポテトに、とろけるチェダーチーズ、クリスピーベーコン、そしてハラペーニョの刺激をトッピング。",
      },
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const menuId = urlParams.get("id");
  if (!menuId || !menuData[menuId]) return;
  const item = menuData[menuId];

  function renderDetail() {
    const isJp = document.body.classList.contains("is-jp");
    const lang = isJp ? "jp" : "en";
    // HTMLの各要素書き換え
    document.getElementById("img").src = item.image;
    document.getElementById("title").textContent = item.title[lang];
    document.getElementById("price").textContent = item.price;
    document.getElementById("desc").textContent = item.desc[lang];
    // ページタイトル書き換え
    const siteName = "Highway Star Diner";
    document.title = `${item.title[lang]} | ${siteName}`;
  }
  // 最初のページ読み込み時に描画を実行
  renderDetail();
  // 言語切替時
  btnJps.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderDetail();
    });
  });
  btnEns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // bodyへのクラス付け替え処理（既存のコード）の直後に追記
      renderDetail();
    });
  });
});
