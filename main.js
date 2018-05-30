var client_id = "Insert Client ID";
var redirect_uri = 'http://localhost:4000/';
var authURL = 'https://instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token';
var access_token = null;

(function(){
  if (window.location.hash) {
    access_token = window.location.hash.split('=')[1];
  }

  if (!access_token) {
    $('.auth-container').addClass('show');
  } else {
    $('.search-container').addClass('show');
  }
})();

$('.auth').on('click', function () {
  window.location = authURL;
});

$('#search-button').click(function (e) {
  e.preventDefault();
  if ($('#hashtag').val() == "") {
    swal ({
      title: "Error!",
      text: "Enter a hashtag!",
      type: "error",
      showConfirmButton: false,
      allowOutsideClick: true
    });
  }
  else {
    fetch();
  }
})

function displayPics(data) {
  for (var i = 0; i < data.data.length; i++) {
    var imageDiv = document.createElement("div");
    imageDiv.style.position = "relative";
    imageDiv.style.display = "inline-block";
    imageDiv.style.margin = "0 auto";
    imageDiv.style.width = "30%";
    $(imageDiv).append('<img src="' + data.data[i].images.low_resolution.url + '" >');
    $('#content').append(imageDiv);
  }
  $('#content').addClass('show');
}

var fetch = function () {
  $.ajax({
    method: "GET",
    url: "https://api.instagram.com/v1/tags/" + $('#hashtag').val() + "/media/recent?access_token=Insert Access Token",
    dataType: "jsonp",
    jsonp: "callback",
    success: function(data) {
      displayPics(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};
