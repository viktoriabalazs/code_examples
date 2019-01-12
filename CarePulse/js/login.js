// CarePulse login box and user panel

// animating login panel
var loginButton = $("#login-button");
var loginBox = $(".login__login-box");
document.addEventListener("click", function (event) {
    if (document.getElementById("login-button")) {
        if (document.getElementById("login-button").contains(event.target)) {
            //clicking user button
            loginBox.toggle();
            loginButton.toggleClass("login__login-button--dark");
        } else if (document.getElementsByClassName("login__login-box")[0].contains(event.target)) {
            //clicking login drop-down
            return;
        } else {
            //clicking outside
            loginBox.hide();
            loginButton.removeClass("login__login-button--dark");
        }
    }
});

$(window).on("load", function () {
    // getting user's first name
    var userName = $("#user-name");
    if (userName.html()) {
        firstName = userName.html().split(" ")[0];
        userName.html(firstName);
        Foundation.MediaQuery.is("small only") ? userName.css("visibility", "hidden") : userName.css("visibility", "visible");
        userName.show();
    }
    // setting padding for the title
    var loginBoxWidth = $(".login").width();
    var pageTitle = $(".top-banner__title h2");
    pageTitle.css("padding-right",loginBoxWidth + 10 + "px");
});

//hiding user name on small screens
$(window).on("resize", function () {
    var userName = $("#user-name");
    Foundation.MediaQuery.is("small only") ? userName.css("visibility", "hidden") : userName.css("visibility", "visible");
});
