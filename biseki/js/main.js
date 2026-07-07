// 共通
let windowHeight = $(window).height();
const header = $("header");
const inquiryBtn = $(".fixed-inquiry-btn");

// ホーム セクションフェードイン表示
function fadein() {
  $(window).scroll(function () {
    const windowHeight = $(window).height(); // windowの高さを取得
    const scrollValue = $(window).scrollTop(); // ユーザのスクロール量を取得
    $("section").each(function () {
      const targetOffset = $(this).offset().top; // window上端から要素までの距離
      if (scrollValue > targetOffset - windowHeight + 100) {
        $(this).addClass("is-show");
      }
    });
  });
}

// ページ内リンクスムーススクロール
$('a[href^="#"]').on("click", function (e) {
  const speed = 500;
  const href = $(this).attr("href");
  const target = $(href == "#" || href == "" ? "html" : href);
  if (target.length) {
    // header分高さ調整
    const headerHeight = $("header").outerHeight();
    let position = target.offset().top - headerHeight;
    // 特定のIDだった場合のみさらに余白を引く
    let scrollMargin = 50; //sp #food,#life用
    if (target.is("#food, #life")) {
      if (window.matchMedia("(width>767px)").matches) {
        scrollMargin = 150; // pc
      }
    } else if (target.is("#culture")) {
      scrollMargin = 10; // sp,pc共通
    }
    position = position - scrollMargin;
    $("body,html").stop().animate({ scrollTop: position }, speed, "swing");
    return false;
  }
});

// sp burger menu
const burger = $(".burger-btn");
const nav = $(".global-nav");
const overlay = $(".nav-overlay");
const body = $("body");
burger.click(function () {
  $(this).toggleClass("active");
  nav.toggleClass("active");
  overlay.toggleClass("active");
  inquiryBtn.removeClass("is-visible");
  if ($(this).hasClass("active")) {
    body.css("overflow", "clip");
  } else {
    body.css("overflow", "");
  }
});
$(".global-nav ul li a[href^='#']").click(function () {
  burger.removeClass("active");
  nav.removeClass("active");
  overlay.removeClass("active");
  body.css("overflow", "");
});
overlay.click(function () {
  burger.toggleClass("active");
  nav.toggleClass("active");
  $(this).removeClass("active");
  body.css("overflow", "");
});

// mainvisual アニメーション処理
const intervalTime = 5000; // 切り替えの間隔
const fadeTime = 1500; // フェードイン・アウトにかける時間
function slider() {
  const $currentSlide = $(".slider li.current");
  let $nextSlide = $currentSlide.next("li");
  if ($nextSlide.length === 0) {
    $nextSlide = $(".slider li:first-child");
  }
  // アニメーション処理
  $nextSlide
    .css({
      zIndex: 1,
      display: "block",
      opacity: 0,
    })
    .animate(
      {
        opacity: 1,
      },
      fadeTime,
    );
  $currentSlide
    .css({
      zIndex: 2,
    })
    .fadeOut(fadeTime, function () {
      // フェードアウト完了後処理
      $(this).removeClass("current");
      $nextSlide.addClass("current");
    });
}

// ranking リスト
const scrollList = $(".rank-list, .related-list");
const cards = $(".card");
const prev = $(".prev");
const next = $(".next");
// 矢印ボタン
function updateArrowStatus() {
  scrollList.each(function () {
    const $this = $(this); // 参照するリスト
    const scrollLeft = $this.scrollLeft(); // 現在のスクロール位置
    const listWidth = $this.innerWidth(); // 見えている範囲の幅
    const scrollWidth = $this.prop("scrollWidth"); // リスト全体の横幅
    // 左端・右端の判定なら薄くする
    if (scrollLeft <= 0) {
      prev.css({ opacity: "0.3", "pointer-events": "none" });
    } else {
      prev.css({ opacity: "1", "pointer-events": "auto" });
    }
    if (scrollLeft + listWidth >= scrollWidth - 2) {
      next.css({ opacity: "0.3", "pointer-events": "none" });
    } else {
      next.css({ opacity: "1", "pointer-events": "auto" });
    }
  });
}
// 正面のカードにactiveクラス付与
function checkActiveCard() {
  scrollList.each(function () {
    const $this = $(this); // 参照するリスト
    // リストの中央位置計算
    const listCenter = $this.offset().left + $this.width() / 2;
    let closestCard = null;
    let minDistance = Infinity;
    cards.each(function () {
      // 各カードの中央位置計算
      const cardCenter = $(this).offset().left + $(this).width() / 2;
      // リスト中央との距離
      const distance = Math.abs(listCenter - cardCenter);
      // 一番距離が近いカード特定
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = $(this);
      }
    });
    // 矢印ボタンクリック時
    next.click(function () {
      const cardWidth = $(".card").outerWidth(true);
      $this.stop().animate({ scrollLeft: $this.scrollLeft() + cardWidth }, 100);
    });
    prev.click(function () {
      const cardWidth = $(".card").outerWidth(true);
      $this.stop().animate({ scrollLeft: $this.scrollLeft() - cardWidth }, 100);
    });
    cards.removeClass("active");
    if (closestCard) {
      closestCard.addClass("active");
    }
  });
}
// スクロール時
scrollList.each(function () {
  $(this).on("scroll", function () {
    updateArrowStatus();
    checkActiveCard();
  });
});
// pc クリック
let isDown = false; // マウスが押されているか
let isMoved = false; // 移動したかどうか
scrollList.each(function () {
  const $this = $(this); // 参照するリスト
  $this.on("mousedown", function (e) {
    isDown = true;
    $this.addClass("is-dragging");
    startX = e.pageX - $this.offset().left;
    scrollLeft = $this.scrollLeft();
    return false;
  });
  $(window).on("mouseup", function () {
    isDown = false;
    $this.removeClass("is-dragging");
  });
  $this.on("mousemove", function (e) {
    if (!isDown) return;
    const x = e.pageX - $this.offset().left;
    const walk = (x - startX) * 2;
    // 5px以上動いたらページ送りとみなす
    if (Math.abs(walk) > 5) {
      isMoved = true;
    }
    $this.scrollLeft(scrollLeft - walk);
  });
  $this.find("a").on("click", function (e) {
    // ページ送り中aタグを制御
    if (isMoved) {
      e.preventDefault();
    }
  });
});

// info タブ切り替え
$(".tab").on("click", function () {
  const index = $(".tab").index(this);
  $(".tab").removeClass("active");
  $(this).addClass("active");
  $(".panel").removeClass("visible");
  $(".panel").eq(index).addClass("visible");
});

// 観光体験一覧ページ ボタン押下時処理
$(function () {
  $(".filter-btn").on("click", function () {
    const target = $(this).data("target");
    const $items = $(".item-grid .card");
    $(".filter-btn").removeClass("is-active");
    $(this).addClass("is-active");

    $items
      .filter(":visible")
      .stop(true, true)
      .fadeOut(200)
      .addClass("is-hide")
      .promise()
      .done(function () {
        const $targetItems =
          target === "all"
            ? $items
            : $items.filter(`[data-category~="${target}"]`);
        $targetItems.each(function (index) {
          $(this)
            .stop(true, true)
            .css({ opacity: 0, display: "block" })
            .animate({ opacity: 1 }, 500, function () {
              $(this).css("opacity", "");
            })
            .removeClass("is-hide");
        });
      });
  });
});

$(function () {
  // スクロール判定系
  $(function () {
    // toTop押下時
    let clickedToTop = false; // 自動スクロール中か
    $(".to-top-btn").click(function () {
      if (clickedToTop) return;
      clickedToTop = true;
      $(".weather, .to-top-btn, .fixed-inquiry-btn").removeClass("is-visible");
      header.removeClass("is-scrolled");
      $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, 600, "swing")
        .promise()
        .done(function () {
          clickedToTop = false;
          beforePos = 0;
          console.log("top到着、判定再開");
          checkScroll();
        });
    });

    // スクロール判定
    let beforePos = 0;
    function checkScroll() {
      const footerHeight = $("footer").length
        ? $("footer").offset().top
        : $(document).height();
      const currentPos = $(window).scrollTop();
      let diff = beforePos - currentPos;
      // まず確認
      if (clickedToTop) {
        beforePos = currentPos;
        return;
      }
      // header,天気,toTop (スクロール量判定)
      // 100px以上スクロールしたらクラスを付ける、戻ったら外す
      if ($("body").hasClass("is-home")) {
        // ホームのみ
        if (currentPos > 100) {
          header.addClass("is-scrolled");
          $(".weather, .to-top-btn").addClass("is-visible");
        } else {
          header.removeClass("is-scrolled");
          $(".weather, .to-top-btn").removeClass("is-visible");
        }
      } else if ($("body").hasClass("is-under")) {
        // 下層ページ
        if (currentPos > 100) {
          $(".to-top-btn").addClass("is-visible");
        } else {
          $(".to-top-btn").removeClass("is-visible");
        }
      }
      // 問い合わせ（向きとフッター位置判定）
      if (currentPos < 100 || currentPos + windowHeight > footerHeight) {
        // ページtopまたはfooter付近にいるか
        inquiryBtn.removeClass("is-visible");
        beforePos = currentPos;
      } else if (diff > 100) {
        // 上に100px以上スクロールしたか
        inquiryBtn.addClass("is-visible");
        // beforePos = currentPos;
      } else if (diff < -1) {
        // 下にスクロールしたか
        inquiryBtn.removeClass("is-visible");
        beforePos = currentPos;
      }
      // 補正用
      if (diff > 300) {
        beforePos = currentPos;
      }
    }
    $(window).on("scroll", checkScroll);
    // ページtop以外での更新時にも適用
    checkScroll();
  });

  // ホームの場合のみ
  if ($("body").hasClass("is-home")) {
    fadein();
    // mainvisual
    if ($(".main-visual").length) {
      setInterval(slider, intervalTime);
    }
  }
  // 横スクロールのリストある時
  if (scrollList.length) {
    updateArrowStatus();
    checkActiveCard();
  }
});
