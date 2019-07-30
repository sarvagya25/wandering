function displayHotels(hotels) {
  var data = '<div class="mainHolder">';

  for (var i = 0; i < hotels.length; i++) {
    console.log(hotels[i]);
    data += "<a href= restdisplay.html?id=" + i + ">";
    data +=
      '<div onclick="getRestaurantDetails(' +
      hotels[i]["hotel_name"] +
      ')" class="secondMain">';
    data +=
      '<div class="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 tach">';
    data += "<div class='holder'>";
    data +=
      '<img src=".' +
      hotels[i]["image"] +
      "\"/ class='card-img-top' alt='...'><br/>";
    data +=
      "<span class='textmain'>" + hotels[i]["hotel_name"] + "</span><br/>";
    data += "<span class='textmain'>Price: " + hotels[i]["price"] + "</span>";
    data +=
      "<br/> " +
      "<span class='textmain'><img src='https://cdn2.iconfinder.com/data/icons/universal-signs-symbols/128/star-yellow-512.png' class='star'/> Rating: " +
      hotels[i]["ratings"] +
      "</span>";
    data +=
      " <br/>" +
      "<span class='textmain'><img src='https://image.flaticon.com/icons/png/512/25/25423.png' class='vote'/> Reviews: " +
      hotels[i]["reviews"] +
      "</span>";
    //data += '<br/> Location : ' + JSON.stringify(hotels[i]['location']);

    data += "</div>";
    data += "</div>";
    data += "</div>";
    data += "</a>";
  }

  data += "</div>";
  var holder = document.getElementById("container");
  holder.innerHTML = data;
}

function hotelsearch() {
  var cityId = $("#city_id").val();

  $.ajax({
    url: "http://localhost:4000/hotel/getbycityid/" + cityId,
    dataType: "json",
    type: "Get",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      displayHotels(response);
    },
    error: function(errormessage) {},
    complete: function() {}
  });
}
