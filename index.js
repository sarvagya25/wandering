// Sidenav
const sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});

// Slider
const slider = document.querySelector(".slider");
M.Slider.init(slider, {
  indicators: false,
  height: 500,
  transition: 500,
  interval: 6000
});

// Autocomplete
const ac = document.querySelector(".autocomplete");
M.Autocomplete.init(ac, {
  data: {
    Bangalore: null,
    Hyderabad: null,
    Lucknow: null,
    Jaipur: null,
    Delhi: null
  }
});

// Material Boxed
const mb = document.querySelectorAll(".materialboxed");
M.Materialbox.init(mb, {});

// ScrollSpy
const ss = document.querySelectorAll(".scrollspy");
M.ScrollSpy.init(ss, {});

//location
var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  myFun(lat, lon);
}

function getRestaurantDetails(res_id) {
  $.ajax({
    url:
      "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + res_id + "",
    dataType: "json",
    type: "Get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("user-key", "2551a90683ce16b6665e6c8e89587a62");
    },
    contentType: "application/json; charset=utf-8",
    // data: JSON.stringify(loginObj),
    success: function(response) {
      console.log("SUCCESS");
      console.log(response);
    },
    error: function(errormessage) {},
    complete: function() {}
  });
}

function searchByCity() {
  city = document.getElementById("sbcity").value;
  $.ajax({
    url: "https://developers.zomato.com/api/v2.1/locations?query=" + city,
    dataType: "json",
    type: "Get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("user-key", "2551a90683ce16b6665e6c8e89587a62");
    },
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      data = response["location_suggestions"]["0"];
      lat = data["latitude"];
      lon = data["longitude"];
      myFun(lat, lon);
    },
    error: function(errormessage) {},
    complete: function() {}
  });
}

function generateRestaurantDetails() {
  restaurants = JSON.parse(localStorage.getItem("restaurant") || "[]");
  console.log(restaurants);
  url = window.location.href;
  curRestaurantIdx = url.split("?")[1].split("=")[1];
  curRestaurant = restaurants[curRestaurantIdx]["restaurant"];

  var data = '<div id="back" >';
  data += "<h4>" + curRestaurant["name"] + "</h4>";
  data +=
    "Cost For Two : " + curRestaurant["average_cost_for_two"] + "</br><hr>";
  data += "Cuisines : " + curRestaurant["cuisines"] + "</br><hr>";
  //data += '<br/>  Rating :' + "<span class='textmain'><img src='https://cdn2.iconfinder.com/data/icons/universal-signs-symbols/128/star-yellow-512.png' class='star'/>"+curRestaurants['user_rating']['aggregate_rating'] + "</span><hr>";
  data +=
    "Rating : " +
    "<span class='textmain'>" +
    JSON.stringify(curRestaurant["user_rating"]["aggregate_rating"]) +
    "</br><hr>";
  data += "</div>";
  data += "<br/> <h2> Reviews </h2> ";

  reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  user_reviews = reviews["user_reviews"];

  data += '<div class="review">';
  for (var i = 0; i < user_reviews.length; i++) {
    review = user_reviews[i]["review"];
    data += JSON.stringify(review);
    data += "<hr>";
  }
  data += "</div>";

  var holder = document.getElementById("container");
  holder.innerHTML = data;
}

function displayRestaurants() {
  restaurants = JSON.parse(localStorage.getItem("restaurant") || "[]");
  console.log(restaurants);

  var data = '<div class="mainHolder">';

  for (var i = 0; i < restaurants.length; i++) {
    console.log(restaurants[i]);
    data += "<a href= restdisplay.html?id=" + i + ">";
    data +=
      '<div onclick="getRestaurantDetails(' +
      restaurants[i]["restaurant"]["id"] +
      ')" class="secondMain">';
    data +=
      '<div class="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 tach">';
    data += "<div class='holder'>";
    data +=
      '<img src="' +
      restaurants[i]["restaurant"]["thumb"] +
      "\"/ class='card-img-top' alt='...'><br/>";
    data +=
      "<span class='textmain'>" +
      restaurants[i]["restaurant"]["name"] +
      "</span>";
    data +=
      "<br/> " +
      "<span class='textmain'><img src='https://cdn2.iconfinder.com/data/icons/universal-signs-symbols/128/star-yellow-512.png' class='star'/>" +
      restaurants[i]["restaurant"]["user_rating"]["aggregate_rating"] +
      "</span>";
    data +=
      " <br/>" +
      "<span class='textmain'><img src='https://image.flaticon.com/icons/png/512/25/25423.png' class='vote'/>" +
      restaurants[i]["restaurant"]["user_rating"]["votes"] +
      "</span>";
    //data += '<br/> Location : ' + JSON.stringify(restaurants[i]['restaurant']['location']);

    data += "</div>";
    data += "</div>";
    data += "</div>";
    data += "</a>";
  }

  data += "</div>";
  var holder = document.getElementById("container");
  holder.innerHTML = data;
}

function myFun(lat, lon) {
  $.ajax({
    url:
      "https://developers.zomato.com/api/v2.1/geocode?lat=" +
      lat +
      "&lon=" +
      lon +
      "",
    dataType: "json",
    type: "Get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("user-key", "2551a90683ce16b6665e6c8e89587a62");
    },
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      restaurants = response["nearby_restaurants"];
      for (var i = 0; i < restaurants.length; i++) {
        console.log(restaurants[i]["restaurant"]);
      }
      localStorage.setItem("restaurant", JSON.stringify(restaurants));
      window.location.href = "./restaurants.html";
    },
    error: function(errormessage) {},
    complete: function() {}
  });
}
//$( document ).ready(function() {
//});

function getReviews(res_id) {
  $.ajax({
    url: "https://developers.zomato.com/api/v2.1/reviews?" + res_id,
    dataType: "json",
    type: "Get",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("user-key", "2551a90683ce16b6665e6c8e89587a62");
    },
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      localStorage.setItem("reviews", JSON.stringify(response));
    },
    error: function(errormessage) {},
    complete: function() {}
  });
}
