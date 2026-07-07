const header = $("header");

$(function () {
  //スクロール時
  $(function () {
    // toTop押下時
    let clickedToTop = false; // 自動スクロール中か
    $(".to-top-btn").click(function () {
      if (clickedToTop) return;
      clickedToTop = true;
      if (!document.body.classList.contains("is-under")) {
        header.removeClass("is-scrolled");
      }
      $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, 400, "swing")
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
      // const footerHeight = $("footer").length
      //   ? $("footer").offset().top
      //   : $(document).height();
      const currentPos = $(window).scrollTop();
      let diff = beforePos - currentPos;
      // まず確認
      //   if (clickedToTop) {
      //     beforePos = currentPos;
      //     return;
      //   }
      // 下層ページもしくは200px以上スクロールしたらクラスを付ける、戻ったら外す
      if (currentPos > 200 || document.body.classList.contains("is-under")) {
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

if (document.body.classList.contains("work-detail")) {
  const projectData = {
    // 写真、タイトル、種別、使用スキル、製作期間、実際の作品ページ、詳細
    biseki: {
      title: "町おこしサイト",
      category: "WEBサイト（架空・学校課題）",
      skill: "HTML, CSS, javaScripst",
      period: "約60時間",
      description:
        "架空の町「弥石町」町おこしサイトの依頼書に基づいて、初めてデザインから作成したWEBサイト。年齢層を絞らないシンプルめなデザインを意識。横スクロールリストやjsによるスクロール関連の制御等を自力で実装出来た。",
      url: "biseki",
      imgSrcMain: "img/work-biseki-pc.png",
      imgSrcSP: "img/work-biseki-sp.png",
    },
    diner: {
      title: "ダイナーサイト",
      category: "WEBサイト（架空）",
      skill: "HTML, CSS, javaScripst, Illustrator",
      period: "約36時間",
      description:
        "創業70周年になる架空のアメリカンダイナーのWEBサイト。個人的な好みを盛り込みつつ、レトロな名残がある現代的なポップさを感じられるデザインを意識。言語切替機能、PDF表示の実装、またidによって表示切替できるメニュー商品詳細ページ実装の挑戦を行った。",
      url: "diner",
      imgSrcMain: "img/work-diner-pc.png",
      imgSrcSP: "img/work-diner-sp.png",
    },
    hokurei: {
      title: "花火大会告知LPサイト",
      category: "LPサイトデザインカンプ（架空・学校課題）",
      skill: "XD, Illustlator, Photoshop",
      period: "約40時間",
      description:
        "架空の町「北礼町」花火大会告知サイトの依頼書に基づいて初めて作成したLPサイトデザインカンプ。ほどよく落ち着きながらも祭りの賑わいを感じられるデザインを意識。セクションタイトル等に使用した装飾作成において、Illustrator/Photoshopで様々な加工を試す機会になった。",
      url: "",
      imgSrcMain: "img/work-hokurei.png",
      imgSrcSP: "",
    },
    ogura: {
      title: "アーティスト非公式LPファンサイト",
      category: "LPサイト（架空）",
      skill: "HTML, CSS, javaScripst",
      period: "約20時間",
      description:
        "クラスメイトがデザインした、アーティスト非公式LPファンサイトのコーディング部分を担当。お心当たりのあるアーティスト様へ：今回の最終課題発表のために作成したため、もちろん本物のポートフォリオからは除去するのでご安心ください。",
      url: "ogura",
      imgSrcMain: "img/work-ogura-pc.png",
      imgSrcSP: "img/work-ogura-sp.png",
    },
  };
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");
  const project = projectData[projectId];
  if (project) {
    document.getElementById("title").textContent = project.title;
    document.getElementById("category").textContent = project.category;
    document.getElementById("skill").textContent = project.skill;
    document.getElementById("period").textContent = project.period;
    if (project.url) {
      document.getElementById("url").classList.remove("is-hidden");
      document.getElementById("url").href = project.url;
    } else {
      document.getElementById("url").classList.add("is-hidden");
    }
    document.getElementById("description").textContent = project.description;
    if (project.imgSrcMain) {
      document.getElementById("imgMain").classList.remove("is-hidden");
      document.getElementById("imgMain").src = project.imgSrcMain;
    } else {
      document.getElementById("imgMain").classList.add("is-hidden");
    }
    if (project.imgSrcSP) {
      document.getElementById("imgSP").classList.remove("is-hidden");
      document.getElementById("imgSP").src = project.imgSrcSP;
    } else {
      document.getElementById("imgSP").classList.add("is-hidden");
    }
    // ページタイトル書き換え
    const siteName = "portfolio";
    document.title = `${project.title} | ${siteName}`;
  } else {
    // パラメータが不正、または作品が見つからない場合
    document.getElementById("project-container").innerHTML =
      "<h1>作品が見つかりませんでした。</h1><p>URLを確認してください。</p>";
  }
}
