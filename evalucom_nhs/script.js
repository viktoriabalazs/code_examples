$(function () {
  $.get("https://www.carepulse.co.uk/api/nursing_homes/", function(data, status){
    myJson = data.results;
    next = data.next;
    getData();
    loadMoreButton = $("<button/>", {
      html: "Load more...",
      "class": "btn load-button",
      "onclick": "loadMore(\''+next+'\')",
      "type": "button"
    });
    buttonBox = $("<div/>", {
      "class": "btn-box col-m-6 col-4 col-l-3"
    });
    loadMoreButton.appendTo(buttonBox);
    buttonBox.appendTo("#result");
    var buttons = $(".button");
  });
});
function getData() {
  for(var x = 0; x < myJson.length; x++) {
    //get data
    var ids = [];
    var names = [];
    var providers = [];
    var address = [];
    var totalBeds = [];
    var occupBeds = [];
    var phones = [];
    var websites = [];
    ids.push(myJson[x].id);
    names.push("<h3 class='name'>" + myJson[x].name + "</h3>");
    providers.push("<h4 class='provider'>" + myJson[x].provider + "</h4>");
    address.push("<p class='address contact'>" + myJson[x].address + ", <span>" + myJson[x].postcode + "</span></p>");
    totalBeds.push("<div class='beds-container'><span>Total beds: </span><p class='no_beds'>" + myJson[x].no_beds + "</p></div>");
    occupBeds.push("<div class='occup-container'><span>Occupied: </span><p class='no_occupied_beds'>" + myJson[x].no_occupied_beds + "</p></div>");
    if(myJson[x].get_phone_number != null) {
      phones.push("<p class='phone contact'>Phone: " + myJson[x].get_phone_number + "</p>");
    }
    if(myJson[x].website != null) {
      websites.push("<a href='http://" + myJson[x].website + "' class='website contact' target='_blank'>" + myJson[x].website + "</a>");
    }
    //create new elements
    var myNewList = $("<div/>", {
      "class": "my-new-list",
      "id": ids.join(""),
      html: names.join("") + providers.join("") + address.join("") + totalBeds.join("") + occupBeds.join("") + phones.join("") + websites.join("")
    });
    var nursingHomeBox = $("<div/>", {
      "class": "nursing-home-box col-m-6 col-4 col-l-3"
    });
    var button = $("<button/>", {
      "class": "btn button",
      "type": "button",
      html: "Book"
    });
    var totalBeds = myJson[x].no_beds;
    var occupBeds = myJson[x].no_occupied_beds;
    if(totalBeds <= occupBeds) {
      button.attr("disabled","disabled");
      button.text("Fully booked");
    }
    button.click(function(){
      var totalBedsText = $(this).siblings("div.my-new-list").children("div.beds-container").children("p.no_beds").text();
      var occupBedsText = $(this).siblings("div.my-new-list").children("div.occup-container").children("p.no_occupied_beds").text();
      var noBeds = parseInt(totalBedsText, 10);
      var noOccupBeds = parseInt(occupBedsText, 10);
      var id = $(this).siblings("div.my-new-list").attr("id");
      var url = "https://www.carepulse.co.uk/api/nursing_homes/" + id + "/";
      if(noBeds == noOccupBeds + 1) {
        $(this).siblings("div.my-new-list").children("div.occup-container").children("p.no_occupied_beds").text(noOccupBeds + 1);
        noOccupBeds += 1;
        console.log(id);
        console.log(url);
        var data = '"no_occupied_beds=' + noOccupBeds + '"';
        console.log(data);
        putData(url, data);
        $(this).text("Fully booked");
        $(this).attr("disabled","disabled");
      } else if(noBeds > noOccupBeds) {
        $(this).siblings("div.my-new-list").children("div.occup-container").children("p.no_occupied_beds").text(noOccupBeds + 1);
        noOccupBeds += 1;
        console.log(id);
        console.log(url);
        var data = '"no_occupied_beds=' + noOccupBeds + '"';
        console.log(data);
        putData(url, data);
      } else if(noBeds <= noOccupBeds) {
        $(this).text("Fully booked");
        $(this).attr("disabled","disabled");
      }
    });
    nursingHomeBox.appendTo("#result");
    button.appendTo(nursingHomeBox);
    myNewList.prependTo(nursingHomeBox);
  }
}
function loadMore(url) {
  $.get(url, function(data, status){
    myJson = data.results;
    next = data.next;
    getData();
    if (next != null){
        $(".btn-box").remove();
        buttonBox.appendTo("#result");
    } else {
        $(".btn-box").remove();
    }
  });
}
function putData(newurl, newdata) {
    console.log("Sending PUT request...");
    $.ajax({
        url: newurl,
        type: 'PUT',
        data: newdata,
        async: true,
        success: function (data) {
            console.log("DONE");
            console.log(data);
        }
    });
}
