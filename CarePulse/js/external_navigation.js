// CarePulse external navigation

// animating navigation and creating different layouts based on the screen size
// for content animation: wrap every content into one div element except top banner, footer, navigation
// and add "content-wrap" id name to it

$(".navbar__title").on("click", function () {
    $(this).next().toggle();
    $(this).find(".navbar__icon").toggleClass("fa-plus");
    $(this).find(".navbar__icon").toggleClass("fa-minus");
});

var navbar = $("#external-navbar");
var linkText = $(".navbar__link .navbar__link-text");
var navbarHeader = $(".navbar__header");
var navbarTitle = $(".navbar__title");
var navbarTitleNh = $("#nh-nav-box .navbar__title div");
var navbarTitleDc = $("#dc-nav-box .navbar__title div");
var navbarTitleLp = $("#lp-nav-box .navbar__title div");
var navbarTitleReport = $("#rep-nav-box .navbar__title div");
var navbarTitleResource = $("#resc-nav-box .navbar__title div");
var navbarTitleIcon = $(".navbar__title .navbar__icon");
var topBanner = $("#external_page_banner");
var pageTitle = $("#page_title");
var subNav = $("#sub-navigation");
var contentWrap = $("#content-wrap");

//creating an outer wrap for the content
contentWrap.wrap(function () {
    return "<div id='outer-content-wrap'></div>";
});

//initialising navigation
$(window).on("load", function () {
    if (Foundation.MediaQuery.is("medium only")) {
        navbarTitleNh.html("CH");
        navbarTitleDc.html("DC AQP");
        navbarTitleLp.html("LPH");
        navbarTitleReport.html("Report");
        navbarTitleResource.html("RC");
    }
    if (localStorage.getItem("expanded") === "true" || localStorage.getItem("expanded") == null) {
        navbarExpand()
    } else {
        navbarCollapse()
    }
});

navbarHeader.on("click", function () {
    navbar.width() >= 200 ? navbarCollapse() : navbarExpand();
});

//reinitialising navigation when screensize is changing
var cachedWidth = $(window).width();
$(window).resize(function () {
    var outerContentWrapWidth = $("#outer-content-wrap").width();
    var newWidth = $(window).width();
    if (newWidth !== cachedWidth) {
        if (Foundation.MediaQuery.atLeast("large")) {
            navbar.width() >= 200 ? navbarExpand() : navbarCollapse();
            navbar.width() >= 200 ? contentWrap.css("width", "100%") : contentWrap.css("width", (outerContentWrapWidth - 125) + "px");
        } else {
            navbar.width() >= 200 ? navbarExpand() : navbarCollapse();
        }
        cachedWidth = newWidth;
    }
});

//collapsing navigation
function navbarCollapse() {
    localStorage.setItem("expanded", false);
    var outerContentWrap = $("#outer-content-wrap");
    var contentWrapWidth = contentWrap.width();
    //for large screen
    if (Foundation.MediaQuery.atLeast("large")) {

        //setting navbar size
        navbar.width(75);
        navbar.css("height", "100%");

        //animating content and banner
        topBanner.css("padding-left", "90px");
        pageTitle.css("padding-left", "105px");
        subNav.css("padding-left", "0px");
        outerContentWrap.css("margin-left", "75px");
        contentWrap.width(contentWrapWidth);

        //hiding elements
        linkText.hide();
        navbarTitleIcon.hide();
        navbarHeader.find("span").hide();
        navbarHeader.find("div").css("opacity", 0);

        //setting link's titles
        navbarTitleNh.html("CH");
        navbarTitleDc.html("DC AQP");
        navbarTitleLp.html("LPH");
        navbarTitleReport.html("Report");
        navbarTitleResource.html("RC");
        navbarTitle.css("padding-left", "5px");
        navbarTitle.css("padding-right", "5px");
        navbarTitle.css("text-align", "center");

    //for medium screen
    } else if (Foundation.MediaQuery.atLeast("medium")) {
        //setting navbar size
        navbar.width(75);
        navbar.css("height", "100%");

        //animating content and banner
        topBanner.css("padding-left", "0px");
        pageTitle.css("padding-left", "95px");
        subNav.css("padding-left", "0px");
        outerContentWrap.css("margin-left", "75px");
        contentWrap.css("width", "100%");

        //hiding elements
        linkText.hide();
        navbarTitleIcon.hide();
        navbarHeader.find("span").hide();
        navbarHeader.find("div").css("opacity", 0);

        //setting link's titles
        navbarTitleNh.html("CH");
        navbarTitleDc.html("DC AQP");
        navbarTitleLp.html("LPH");
        navbarTitleReport.html("Report");
        navbarTitleResource.html("RC");
        navbarTitle.css("padding-left", "5px");
        navbarTitle.css("padding-right", "5px");
        navbarTitle.css("text-align", "center");

        //removing overlay
        $(".navigation__overlay").hide();

    //for small screen
    } else if (Foundation.MediaQuery.is("small only")) {
        //setting navbar size
        navbar.width(65);
        navbar.css("height", "42px");
        topBanner.css("padding-left", "0px");

        //animating content and banner
        pageTitle.css("padding-left", "65px");
        subNav.css("padding-left", "0px");
        outerContentWrap.css("margin-left", "0px");
        contentWrap.css("width", "100%");

        //hiding elements
        navbarHeader.find("span").hide();
        navbarHeader.find("div").css("opacity", 0);
    }
}

//expanding navigation
function navbarExpand() {
    localStorage.setItem("expanded", true)
    var outerContentWrap = $("#outer-content-wrap");
    var contentWrapWidth = contentWrap.width();

    //setting navbar size
    navbar.css("height", "100%");

    //showing elements
    linkText.show();
    navbarTitleIcon.show();
    navbarHeader.find("span").show();
    navbarHeader.find("div").css("opacity", 1);

    //setting link's titles
    navbarTitleNh.html("Care homes");
    navbarTitleDc.html("Domiciliary Care AQP");
    navbarTitleLp.html("LPH team sites");
    navbarTitleReport.html("Reporting");
    navbarTitleResource.html("Resource Centre");
    navbarTitle.css("text-align", "left");
    navbarTitle.css("padding-left", "25px");
    navbarTitle.css("padding-right", "30px");

    //for large screen
    if (Foundation.MediaQuery.atLeast("large")) {
        //setting navbar size
        navbar.width(200);

        //animating content and banner
        topBanner.css("padding-left", "210px");
        pageTitle.css("padding-left", "225px");
        subNav.css("padding-left", "120px");
        outerContentWrap.css("margin-left", "200px");
        contentWrap.width(contentWrapWidth);
        $(".navigation__overlay").hide();

    //for medium screen
    } else if (Foundation.MediaQuery.atLeast("medium")) {
        //setting navbar size
        navbar.width(200);

        //animating content and banner
        topBanner.css("padding-left", "0px");
        pageTitle.css("padding-left", "95px");
        subNav.css("padding-left", "0px");
        outerContentWrap.css("margin-left", "75px");
        contentWrap.css("width", "100%");

        //setting overlay
        $(".navigation__overlay").show();

    //for small screen
    } else if (Foundation.MediaQuery.is("small only")) {
        //setting navbar size
        navbar.css("width", "100%");

        //animating content and banner
        topBanner.css("padding-left", "0px");
        pageTitle.css("padding-left", "65px");
        navbarTitle.css("padding-right", "40px");
        subNav.css("padding-left", "0px");
        outerContentWrap.css("margin-left", "0px");
        contentWrap.css("width", "100%");
        $(".navigation__overlay").hide();
    }
}
