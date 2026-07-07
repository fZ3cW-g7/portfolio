// 共通
let windowHeight = $(window).height();
const header = $("header");
const toTop = $(".to-top-btn");

$(function () {
  const speed = 400;
  const defaultScrollMargin = 30;
  // 共通のスクロール実行関数
  function scrollToTarget($target) {
    if (!$target.length) return;
    const headerHeight = $("header").outerHeight() || 0;
    console.log(headerHeight);

    let position = $target.offset().top - headerHeight;
    let scrollMargin = defaultScrollMargin;
    position = position - scrollMargin;
    // スクロール実行
    $("body,html").stop().animate({ scrollTop: position }, speed, "swing");
  }
  //top topとページ内リンク
  $('a[href^="#"]')
    .add(toTop)
    .on("click", function (e) {
      e.preventDefault();
      const href = $(this).attr("href");
      const $target = $(href === "#" || href === "" ? "html" : href);
      scrollToTarget($target);
      return false;
    });
  //   $('a[href^="#"]').on("click", function () {
  //     const href = $(this).attr("href");
  //     const $target = $(href === "#" || href === "" ? "html" : href);

  //     scrollToTarget($target);
  //     return false; // ページ遷移（デフォルト挙動）をキャンセル
  //   });

  //   toTop.on("click", function () {
  //     const href = $(this).attr("href");
  //     const $target = $(href === "#" || href === "" ? "html" : href);
  //     scrollToTarget($target);
  //     return false; // ページ遷移（デフォルト挙動）をキャンセル
  //   });

  // ナビゲーション移動
  function moveNavigation() {
    let windowWidth = window.innerWidth;
    if (windowWidth > 767) {
      // PC bodyの直下へ移動
      if ($("header .global-nav").length > 0) {
        $(".global-nav").appendTo("#wrapper");
      }
    } else {
      // sp 元の状態に戻す
      if ($("#wrapper > .global-nav").length > 0) {
        $(".global-nav").appendTo(".nav-wrap");
      }
    }
  }
  moveNavigation();
  $(window).on("resize", moveNavigation);
});

// sp burger menu
const burger = $(".burger-btn");
const nav = $(".global-nav");
const overlay = $(".nav-overlay");
const body = $("body");
burger
  .add(overlay)
  .add($(".global-nav ul li a[href^='#']"))
  .on("click", function () {
    let windowWidth = window.innerWidth;
    if (windowWidth < 766) {
      burger.toggleClass("active");
      overlay.toggleClass("active");
      nav.toggleClass("active");
      if (overlay.hasClass("active")) {
        $(".header-logo img").attr("src", "img/logo_white.png");
        $(".burger-btn img").attr("src", "img/burger-btn-open@2x.png");
        body.css("overflow", "clip");
      } else {
        $(".header-logo img").attr("src", "img/logo.png");
        $(".burger-btn img").attr("src", "img/burger-btn-closed@2x.png");
        body.css("overflow", "");
      }
    }
  });
const wrapper = $("#wrapper");
const hiddenTrigger = $(".hidden-gem-trigger");
const hiddenGem = $("#hidden-gem");
let clickCount = 0;
// let originalContent = "";
hiddenTrigger.on("click", function () {
  clickCount++;
  console.log("隠しコマンドまであと: " + (3 - clickCount) + "回");
  if (clickCount === 3) {
    wrapper.fadeOut(1000);
    hiddenGem.addClass("is-active").delay(500).fadeIn(1000);
    setTimeout(function () {
      hiddenGem.removeClass("is-active");
      wrapper.show().fadeIn(1000);
      clickCount = 0; // カウンターリセット
    }, 5000);
  }
});
