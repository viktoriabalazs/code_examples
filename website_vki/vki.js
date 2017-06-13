$(function() {
  var animalsCarousel = $("#carousel_animals");
  animalsCarousel.carousel("pause");
    
});

$(function() {
  var eventsCollapse = $("#collapse_sign");
  var eventsPanel = $("#events");
  var contentBox = $(".large_container");
  var headerTitle = $("#header_title");
  eventsCollapse.on("click", function() {
    eventsPanel.toggleClass("collapse_events");
    contentBox.toggleClass("expand_large_container");
    headerTitle.toggleClass("header_rotate");
    var panelToggle = function() {
      if(!eventsPanel.hasClass("collapse_events")) {
        eventsPanel.find("#accordion").show(50);
        headerTitle.next().show(400);
        headerTitle.parent().css("height","auto");
        eventsCollapse.removeClass("glyphicon-chevron-left");
        eventsCollapse.addClass("glyphicon-chevron-right");
      } else {
        eventsPanel.find("#accordion").hide(300);
        headerTitle.next().hide();
        headerTitle.parent().animate({
          "height": "200px"
        }, 800);
        eventsCollapse.removeClass("glyphicon-chevron-right");
        eventsCollapse.addClass("glyphicon-chevron-left");
      }
    }
    setTimeout(panelToggle, 50);
  });
});
