const header = $("header");

$(function () {
  //スクロール時
  $(function () {
    console.log("あああああああああ");

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
