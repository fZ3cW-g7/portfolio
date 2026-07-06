const header = $("header");

$(function () {
  //スクロール時
  $(function () {
    // // toTop押下時
    // let clickedToTop = false; // 自動スクロール中か
    // $(".to-top-btn").click(function () {
    //   if (clickedToTop) return;
    //   clickedToTop = true;
    //   $(".weather, .to-top-btn, .fixed-inquiry-btn").removeClass("is-visible");
    //   header.removeClass("is-scrolled");
    //   $("html, body")
    //     .stop()
    //     .animate({ scrollTop: 0 }, 600, "swing")
    //     .promise()
    //     .done(function () {
    //       clickedToTop = false;
    //       beforePos = 0;
    //       console.log("top到着、判定再開");
    //       checkScroll();
    //     });
    // });

    // スクロール判定
    let beforePos = 0;
    function checkScroll() {
      const footerHeight = $("footer").length
        ? $("footer").offset().top
        : $(document).height();
      const currentPos = $(window).scrollTop();
      let diff = beforePos - currentPos;
      // まず確認
      //   if (clickedToTop) {
      //     beforePos = currentPos;
      //     return;
      //   }
      // 200px以上スクロールしたらクラスを付ける、戻ったら外す
      if (currentPos > 200) {
        header.addClass("is-scrolled");
      } else {
        header.removeClass("is-scrolled");
      }
      //   // 問い合わせ（向きとフッター位置判定）
      //   if (currentPos < 100 || currentPos + windowHeight > footerHeight) {
      //     // ページtopまたはfooter付近にいるか
      //     inquiryBtn.removeClass("is-visible");
      //     beforePos = currentPos;
      //   } else if (diff > 100) {
      //     // 上に100px以上スクロールしたか
      //     inquiryBtn.addClass("is-visible");
      //     // beforePos = currentPos;
      //   } else if (diff < -1) {
      //     // 下にスクロールしたか
      //     inquiryBtn.removeClass("is-visible");
      //     beforePos = currentPos;
      //   }
      // 補正用
      if (diff > 300) {
        beforePos = currentPos;
      }
    }
    $(window).on("scroll", checkScroll);
    // ページtop以外での更新時にも適用
    checkScroll();
  });
});

// ページ内リンクスムーススクロール
$('a[href^="#"]').on("click", function (e) {
  const speed = 600;
  const href = $(this).attr("href");
  const target = $(href == "#" || href == "" ? "html" : href);
  if (target.length) {
    // header分高さ調整
    const headerHeight = $("header").outerHeight();
    let position = target.offset().top - headerHeight - 15; //15pxはheaderのtop移動分
    // // 特定のIDだった場合のみさらに余白を引く
    // let scrollMargin = 50; //sp #food,#life用
    // if (target.is("#food, #life")) {
    //   if (window.matchMedia("(width>767px)").matches) {
    //     scrollMargin = 150; // pc
    //   }
    // } else if (target.is("#culture")) {
    //   scrollMargin = 10; // sp,pc共通
    // }
    // position = position - scrollMargin;
    $("body,html").stop().animate({ scrollTop: position }, speed, "swing");
    return false;
  }
});

if (document.body.id === "work-detail") {
  // 1. 作品のデータベース（本来は別ファイルやAPIから取得するイメージです）
  const projectData = {
    // 写真、タイトル、種別、使用スキル、製作期間、実際の作品ページ、詳細
    "sns-app": {
      title: "写真共有SNSアプリ",
      category: "Webアプリケーション / React, Firebase",
      description:
        "日常の1コマを気軽にシェアできるモビリティファーストのSNSです。リアルタイムチャット機能を搭載しています。",
    },
    "portfolio-site": {
      title: "デザイン事務所のコーポレートサイト",
      category: "Webサイト / HTML, CSS, JavaScript",
      description:
        "視覚的な美しさとアクセシビリティを両立させた、モダンなWebサイトです。アニメーションにこだわりました。",
    },
  };

  // 2. URLからクエリパラメータ（?id=xxx）を取得する
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id"); // 'sns-app' などが取れる
  console.log(projectId);

  // 3. 該当するデータを画面に反映する
  const project = projectData[projectId];

  if (project) {
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-category").textContent = project.category;
    document.getElementById("project-description").textContent =
      project.description;
  } else {
    // パラメータが不正、または作品が見つからない場合
    document.getElementById("project-container").innerHTML =
      "<h1>作品が見つかりませんでした。</h1><p>URLを確認してください。</p>";
  }
}
