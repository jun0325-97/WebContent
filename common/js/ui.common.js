(function ($, win, doc, undefined) {
  "use strict";

  console.log("mobile common");
  var menuArray = {
    menu: [
      {
        name: "About CCK",
        link: "/html/renewal/ENG-02-01.html",
        dep2: [
          { name: "Introduction", link: "/html/renewal/ENG-02-01.html" },
          { name: "Organization Chart", link: "/html/renewal/ENG-02-02.html" },
          { name: "Major milestones", link: "/html/renewal/ENG-02-03.html" },
          { name: "Video Clip for CCK", link: "/html/renewal/ENG-02-04.html" },
          { name: "Fundraising", link: "/html/renewal/ENG-02-05.html" },
          { name: "Global partnership", link: "/html/renewal/ENG-02-06.html" },
        ],
      },
      {
        name: "Participation",
        link: "/html/renewal/ENG-03-01.html",
        dep2: [
          { name: "Individual Giving", link: "/html/renewal/ENG-03-01.html" },
          { name: "Good Families", link: "/html/renewal/ENG-03-02.html" },
          { name: "Good shop", link: "/html/renewal/ENG-03-03.html" },
          { name: "Good Workplaces", link: "/html/renewal/ENG-03-04.html" },
          { name: "Good Rights", link: "/html/renewal/ENG-03-05.html" },
          { name: "Giving Leader", link: "/html/renewal/ENG-03-06.html" },
          { name: "Giving Leaders Club", link: "/html/renewal/ENG-03-07.html" },
          { name: "Honor Society", link: "/html/renewal/ENG-03-08.html" },
          {
            name: "Korea Donor Advised Fund",
            link: "/html/renewal/ENG-03-09.html",
          },
          { name: "Corporate Giving", link: "/html/renewal/ENG-03-10.html" },
          {
            name: "Annual Campaign with Hope",
            link: "/html/renewal/ENG-03-11.html",
          },
        ],
      },
      {
        name: "Support",
        link: "/html/renewal/ENG-04-01.html",
        dep2: [
          {
            name: "Support for Basic Needs",
            link: "/html/renewal/ENG-04-01.html",
          },
          {
            name: "Support for Education",
            link: "/html/renewal/ENG-04-02.html",
          },
          { name: "Improved Housing", link: "/html/renewal/ENG-04-03.html" },
          {
            name: "Support for Healthcare",
            link: "/html/renewal/ENG-04-04.html",
          },
          { name: "Support for Mental", link: "/html/renewal/ENG-04-05.html" },
          {
            name: "Expanding Social Care",
            link: "/html/renewal/ENG-04-06.html",
          },
          {
            name: "Advocacy for Community Participation",
            link: "/html/renewal/ENG-04-07.html",
          },
          {
            name: "Reducing Cultural Disparities",
            link: "/html/renewal/ENG-04-08.html",
          },
        ],
      },
      {
        name: "Philanthropy",
        link: "/html/renewal/ENG-05-01.html",
        dep2: [
          {
            name: "Philanthropy Education",
            link: "/html/renewal/ENG-05-01.html",
          },
          {
            name: "Research on Philanthropy",
            link: "/html/renewal/ENG-05-02.html",
          },
        ],
      },
    ],
  };

  var googleAnal = {
    callAnalytics: function () {
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = "https://www.googletagmanager.com/gtag/js?id=UA-61059387-1";
      document.body.appendChild(js);
      console.log("Google Analytics === " + new Date());
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "UA-61059387-1");
    },
  };

  $plugins.common = {
    init: function (opt) {
      //google Analytics
      googleAnal.callAnalytics();

      $plugins.uiInputClear();
      $plugins.uiCaption();

      !$plugins.browser.mobile ? $plugins.uiSelect() : "";

      $(win).on("scroll", function () {
        scrollChange($(win).scrollTop());
      });

      $plugins.uiHasScrollBar({ selector: $("body") })
        ? $("html").addClass("is-scroll")
        : $("html").removeClass("is-scroll");

      function scrollChange(v) {
        var win_h = $(win).outerHeight();
        v > 0
          ? $("body").addClass("scrolled")
          : $("body").removeClass("scrolled");

        v + win_h + 10 > $(doc).outerHeight()
          ? $("body").addClass("scrolled-b")
          : $("body").removeClass("scrolled-b");

        v > win_h / 2
          ? $("body").addClass("scroll-top")
          : $("body").removeClass("scroll-top");
      }

      scrollChange($(win).scrollTop());

      $plugins.uiAjax({
        id: "baseHeader",
        url: "/inc/header.html",
        page: true,
        callback: function () {
          $plugins.common.header(opt);
        },
      });

      $plugins.uiAjax({
        id: "baseFooter",
        url: "/inc/footer.html",
        page: true,
        callback: function () {
          $plugins.common.footer(opt);
        },
      });

      $plugins.uiAjax({
        id: "counselBox",
        url: "/inc/counsel.html",
        page: true,
        callback: function () {
          !$plugins.browser.mobile ? $plugins.uiSelect() : "";
        },
      });

      $plugins.common.uiToggleBtn();
    },
    uiToggleBtn: function () {
      $(".ui-togglebtn button")
        .off("click.tg")
        .on("click.tg", function () {
          $(this)
            .closest(".ui-togglebtn")
            .find("button")
            .removeClass("btn-base-imp")
            .addClass("btn-base");
          $(this).removeClass("btn-base").addClass("btn-base-imp");
        });
    },

    header: function (opt) {
      var $nav = $("#baseNav"),
        $li_1 = $nav.find(".nav-main-1"),
        $btn_1 = $nav.find(".nav-btn-1"),
        $btn_2 = $nav.find(".nav-btn-2"),
        $dep2_wrap = $li_1.find(".nav-sub"),
        $dep2_btn = $dep2_wrap.find("a"),
        $gnb_bg = $(".dim-nav"),
        timer,
        menuType = opt.menuType,
        menucode = opt.menuid.split("_");

      $btn_1
        .on("mouseover focus", function () {
          clearTimeout(timer);
          gnbShow(this);
        })
        .on("mouseleave blur", function () {
          hideTimer();
        });

      $btn_2
        .on("mouseover focus", function () {
          clearTimeout(timer);
          gnbShow(this);
        })
        .on("mouseleave blur", function () {
          hideTimer();
        });

      $(".nav-sub")
        .on("mouseover focus", function () {
          clearTimeout(timer);
        })
        .on("mouseleave blur", function () {
          hideTimer();
        });

      function hideTimer() {
        timer = setTimeout(function () {
          gnbHide();
        }, 50);
      }

      function gnbShow(t) {
        $(t)
          .closest(".nav-main-1")
          .siblings("li")
          .find(".nav-btn-1")
          .data("selected", false);
        $(t)
          .closest(".nav-main-1")
          .siblings("li")
          .find(".nav-btn-2")
          .data("selected", false);
        if (!$(t).data("selected")) {
          $(t).data("selected", true);
          $(".nav-main-1").removeClass("on");
          clearTimeout(timer);
          $dep2_wrap.stop().animate(
            {
              height: 244,
            },
            150
          );
          $gnb_bg.addClass("on").stop().animate(
            {
              height: 244,
            },
            150
          );
        }
      }
      function gnbHide() {
        $(".nav-btn-1").data("selected", false);
        $(".nav-btn-2").data("selected", false);
        $dep2_wrap.stop().animate(
          {
            height: 0,
          },
          250
        );
        $gnb_bg.removeClass("on").stop().animate(
          {
            height: 0,
          },
          250
        );
      }

      console.log(Number(menucode[0]));

      $(".ui-menu").on("click", function () {
        $(".header-mobile").addClass("on");
      });
      $(".menu-wrap .btn-close").on("click", function () {
        $(".header-mobile").removeClass("on");
      });

      /*if(Number(menucode[0]) > 0) {
    		$li_1.eq(Number(menucode[0]) - 1).find('.nav-btn-1').addClass('selected');
    		$li_1.eq(Number(menucode[0]) - 1)
    		.find('.nav-sub > div').eq(Number(menucode[1])).addClass('selected')
    		.find('li').eq(Number(menucode[2]) - 1).find('a').addClass('selected');
    	}*/

      // 메인 URL 판별
      var path = location.pathname;
      var isMain = path === "/" || path.includes("/html/main/main.html");

      if (!isMain) {
        var menuIndex = Number(menucode[0]);

        // 1depth selected
        $li_1.eq(menuIndex).find(".nav-btn-1").addClass("selected");

        // 2depth
        if (menucode[1] !== undefined) {
          $li_1
            .eq(menuIndex)
            .find(".nav-sub > div")
            .eq(Number(menucode[1]))
            .addClass("selected");

          if (menucode[2] !== undefined) {
            $li_1
              .eq(menuIndex)
              .find(".nav-sub > div")
              .eq(Number(menucode[1]))
              .find("li")
              .eq(Number(menucode[2]))
              .find("a")
              .addClass("selected");
          }
        }
      }

      var menu4dep = menucode[3] === undefined ? false : menucode[3];
      if ($("#baseBreadcrumbs").length) {
        $plugins.uiAjax({
          id: "baseBreadcrumbs",
          url: "/inc/breadcrumbs.html",
          page: true,
          callback: function () {
            $plugins.common.breadCrumbs(
              menucode[0],
              menucode[1],
              menucode[2],
              menu4dep,
              menuType
            );
          },
        });
      }

      $plugins.uiDropdown({
        id: "uiNavUtil1",
        ps: "bc",
        eff: "st",
      });
      $plugins.uiDropdown({
        id: "uiNavUtil2",
        ps: "bc",
        eff: "st",
      });

      $plugins.uiDropdown({
        id: "uiNavUtil1_m",
        ps: "bc",
        eff: "st",
      });
      $plugins.uiDropdown({
        id: "uiNavUtil2_m",
        ps: "bc",
        eff: "st",
      });

      $plugins.uiAccordion({
        id: "AccoNavDepth1",
        current: null,
        autoclose: true,
        callback: function (v) {
          console.log(v);
        },
      });
      $plugins.uiAccordion({
        id: "AccoNavDepth2-1",
        current: null,
        autoclose: true,
        callback: function (v) {
          console.log(v);
        },
      });
      $plugins.uiAccordion({
        id: "AccoNavDepth2-2",
        current: null,
        autoclose: true,
        callback: function (v) {
          console.log(v);
        },
      });
      $plugins.uiAccordion({
        id: "AccoNavDepth2-3",
        current: null,
        autoclose: true,
        callback: function (v) {
          console.log(v);
        },
      });
      $plugins.uiAccordion({
        id: "AccoNavDepth2-4",
        current: null,
        autoclose: true,
        callback: function (v) {
          console.log(v);
        },
      });
    },
    navShow: function (t) {
      $(t)
        .closest(".nav-main-1")
        .siblings("li")
        .find(".nav-btn-1")
        .data("selected", false);
      $(t)
        .closest(".nav-main-1")
        .siblings("li")
        .find(".nav-btn-2")
        .data("selected", false);
      if (!$(t).data("selected")) {
        $(t).data("selected", true);
        $(".nav-main-1").removeClass("on");
        $(".nav-sub").css({
          height: 0,
          opacity: 0,
        });
        $(t)
          .closest(".nav-main-1")
          .addClass("on")
          .find(".nav-sub")
          .stop()
          .animate(
            {
              height: 415,
              opacity: 1,
            },
            200
          );

        $(".dim-nav").addClass("on").stop().animate(
          {
            top: 121,
            height: 420,
          },
          150
        );
      }
    },
    navHide: function () {
      $(".nav-btn-1").data("selected", false);
      $(".nav-btn-2").data("selected", false);
      $(".nav-main-1").removeClass("on").find(".nav-sub").stop().animate(
        {
          height: 0,
          opacity: 0,
        },
        150
      );
      $(".dim-nav").removeClass("on").stop().animate(
        {
          top: 121,
          height: 0,
        },
        200
      );
    },
    breadCrumbs: function (dep1, dep2, dep3, dep4, is) {
      var ma = menuArray.menu,
        d1 = Number(dep1),
        d2 = Number(dep2),
        d3 = Number(dep3),
        d4 = dep4 === false ? false : Number(dep4),
        html_dep1 = "",
        html_dep2 = "",
        html_dep3 = "",
        html_dep4 = "";

      html_dep1 +=
        '<button type="button" class="breadcrumb-btn ui-drop" id="uiNavDep1">' +
        ma[d1].name +
        "</button>";
      html_dep1 +=
        '<div class="ui-drop-pnl breadcrumb-list" data-id="uiNavDep1">';
      html_dep1 += "<ul>";

      for (var i = 0; i < ma.length; i++) {
        if (d1 === i) {
          html_dep1 +=
            '<li><a href="' +
            ma[i].link +
            '" class="selected">' +
            ma[i].name +
            "</a></li>";
        } else {
          html_dep1 +=
            '<li><a href="' + ma[i].link + '">' + ma[i].name + "</a></li>";
        }
      }
      html_dep1 += "</ul>";
      html_dep1 += "</div>";
      $("#breadcrumbDep1").append(html_dep1);
      $plugins.uiDropdown({
        id: "uiNavDep1",
        ps: "bc",
        eff: "st",
        auto: false,
        dim: false,
        openback: function () {
          console.log("open callback");
        },
        closeback: function () {
          console.log("close callback");
        },
        offset: false,
      });

      if (ma[d1].dep2 !== undefined) {
        html_dep2 +=
          '<button type="button" class="breadcrumb-btn ui-drop" id="uiNavDep2">' +
          ma[d1].dep2[d2].name +
          "</button>";
        html_dep2 +=
          '<div class="ui-drop-pnl breadcrumb-list" data-id="uiNavDep2">';
        html_dep2 += "<ul>";

        for (var ii = 0; ii < ma[d1].dep2.length; ii++) {
          //	                alert(ma[d1].dep2.length);
          if (d2 === ii) {
            html_dep2 +=
              '<li><a href="' +
              ma[d1].dep2[ii].link +
              '" class="selected">' +
              ma[d1].dep2[ii].name +
              "</a></li>";
          } else {
            html_dep2 +=
              '<li><a href="' +
              ma[d1].dep2[ii].link +
              '">' +
              ma[d1].dep2[ii].name +
              "</a></li>";
          }
        }
        html_dep2 += "</ul>";
        html_dep2 += "</div>";
        $("#breadcrumbDep2").append(html_dep2);
        $plugins.uiDropdown({
          id: "uiNavDep2",
          ps: "bc",
          eff: "st",
          auto: false,
          dim: false,
          openback: function () {
            console.log("open callback");
          },
          closeback: function () {
            console.log("close callback");
          },
          offset: false,
        });

        if (ma[d1].dep2[d2].dep3 !== undefined) {
          html_dep3 +=
            '<button type="button" class="breadcrumb-btn ui-drop" id="uiNavDep3">' +
            ma[d1].dep2[d2].dep3[d3].name +
            "</button>";
          html_dep3 +=
            '<div class="ui-drop-pnl breadcrumb-list" data-id="uiNavDep3">';
          html_dep3 += "<ul>";

          for (var iii = 0; iii < ma[d1].dep2[d2].dep3.length; iii++) {
            if (d3 === iii) {
              html_dep3 +=
                '<li><a href="' +
                ma[d1].dep2[d2].dep3[iii].link +
                '" class="selected">' +
                ma[d1].dep2[d2].dep3[iii].name +
                "</a></li>";
            } else {
              html_dep3 +=
                '<li><a href="' +
                ma[d1].dep2[d2].dep3[iii].link +
                '">' +
                ma[d1].dep2[d2].dep3[iii].name +
                "</a></li>";
            }
          }
          html_dep3 += "</ul>";
          html_dep3 += "</div>";
          $("#breadcrumbDep3").append(html_dep3);
          $plugins.uiDropdown({
            id: "uiNavDep3",
            ps: "bc",
            eff: "st",
            auto: false,
            dim: false,
            openback: function () {
              console.log("open callback");
            },
            closeback: function () {
              console.log("close callback");
            },
            offset: false,
          });
          if (ma[d1].dep2[d2].dep3[d3].dep4 !== undefined && d4 !== false) {
            html_dep4 +=
              '<button type="button" class="breadcrumb-btn ui-drop" id="uiNavDep4">' +
              ma[d1].dep2[d2].dep3[d3].dep4[d4].name +
              "</button>";
            html_dep4 +=
              '<div class="ui-drop-pnl breadcrumb-list" data-id="uiNavDep4">';
            html_dep4 += "<ul>";

            for (
              var iiii = 0;
              iiii < ma[d1].dep2[d2].dep3[d3].dep4.length;
              iiii++
            ) {
              if (d3 === iiii) {
                html_dep4 +=
                  '<li><a href="' +
                  ma[d1].dep2[d2].dep3[d3].dep4[iiii].link +
                  '" class="selected">' +
                  ma[d1].dep2[d2].dep3[d3].dep4[iiii].name +
                  "</a></li>";
              } else {
                html_dep4 +=
                  '<li><a href="' +
                  ma[d1].dep2[d2].dep3[d3].dep4[iiii].link +
                  '">' +
                  ma[d1].dep2[d2].dep3[d3].dep4[iiii].name +
                  "</a></li>";
              }
            }
            html_dep4 += "</ul>";
            html_dep4 += "</div>";
            $("#breadcrumbDep4").append(html_dep4);
            $plugins.uiDropdown({
              id: "uiNavDep4",
              ps: "bc",
              eff: "st",
              auto: false,
              dim: false,
              openback: function () {
                console.log("open callback");
              },
              closeback: function () {
                console.log("close callback");
              },
              offset: false,
            });
          }
        }
      }
    },

    footer: function () {
      console.log("footer");
    },
  };
  //page
  $plugins.page = {};

  //callback
  $plugins.callback = {
    modal: function (modalId) {
      $plugins.uiInputClear();
      $plugins.uiCaption();
      !$plugins.browser.mobile ? $plugins.uiSelect() : "";

      switch (modalId) {
        case "modalTest2":
          break;
      }
    },
  };
})(jQuery, window, document);
