function hideAll() {
  $('#frontPage').hide();
  $('#newsPage').hide();
  $('#photosPage').hide();
  $('#tourPage').hide();
  $('#contactPage').hide();
  $('#musicVideo').hide();
};

function pageLoad() {
  hideAll();
  $('#frontPage').show();
}
pageLoad();

//TRACK LOOKUP
// $.ajaxPrefilter(function (options) {
//   if (options.crossDomain && jQuery.support.cors) {
//     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//   }
// });

function displayLyrics() {
  var artist = $("#artistDiv").html();
  var song = $("#songDiv").html();
  var queryURL_lyrics = "https://private-anon-1e650a5c58-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + song;
  $.ajax({
    url: queryURL_lyrics,
    method: "GET",
  }).then(function (response) {
    // console.log(response.body);
    var lyrics = response.lyrics;
    $("#lyrics-div").html(lyrics);
  });
};
displayLyrics();

function displayPhotos() {
  // var artist = $('#artistDiv').html();
  $.ajax({
    type: 'POST',
    url: 'curl -H "Authorization: 563492ad6f91700001000001404ed7fc9dba4294b7d85af8737e84e5" "https://api.pexels.com/v1/search?query=people"',
    dataType: 'json',
    success: function (data) {
      console.log('PHOTOS: ' + data);
    }

  })
};
displayPhotos();

// IP LOOKUP
function displayEvents() {
  var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
  var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
  var response_ip;
  $.ajax({
    url: queryURL_IP,
    method: "GET",
  }).then(function (response) {

    response_ip = response.ip;
    console.log('User IP: ' + response_ip);

    //SONGKICK EVENT LOOKUP
    var apikey_localEvents = "926QLoynaFfTnoup"
    var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
    $.ajax({
      url: queryURL_localEvents,
      method: "GET",
    }).then(function (response) {

      console.log('SongKick: ' + response);
    })
  });
};

function displayOtherEvents() {
  var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
  var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
  var response_ip;
  $.ajax({
    url: queryURL_IP,
    method: "GET",
  }).then(function (response) {

    response_ip = response.ip;

    console.log("User IP: " + response_ip)
    // console.log(response);


    //SONGKICK NEARBY EVENT LOOKUP
    var apikey_localEvents = "926QLoynaFfTnoup"
    var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
    $.ajax({
      url: queryURL_localEvents,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var upcomingEvents = response.resultsPage.results.location[0].metroArea.uri;
      console.log("local upcoming events: " + upcomingEvents);

      var subHeader = $("<a class=tour-link href=" + upcomingEvents + ">Find out if " + $('#searchInput').val().trim() + " is on tour near you!</a>");
      $('#localTourLink').empty();
      $('#localTourLink').append(subHeader);

      response_ip = response.ip;
      console.log("User IP: " + response_ip)
      console.log(response);

    })
  });
};

function artistLookup() {
  //SONGKICK SIMILAR ARTIST LOOKUP
  var artist = $('#searchInput').val().trim();
  var apikey_localEvents = "926QLoynaFfTnoup"
  var queryURL_artistEvents = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + apikey_localEvents + "&query=" + artist;
  console.log('ARTIST LOOKUP', artist)
  $.ajax({
    url: queryURL_artistEvents,
    method: "GET",
  }).then(function (response) {

    console.log("artist upcoming events");
    console.log(response);
    console.log(artist);

    var artistName = response.resultsPage.results.artist[0].displayName;
    var tourDate = response.resultsPage.results.artist[0].uri;
    var subHeader = $("<a class=tour-link href=" + tourDate + ">Find out where " + artist + " is currently touring by clicking here</a>");
    var onTour = response.resultsPage.results.artist[0].onTourUntil;
    $('#tourLink').empty();
    $('#artistNameTour').text(artistName);
    $('#tourDate').text('On Tour Until: ' + onTour);
    $('#tourLink').append(subHeader);

    console.log('LINK TO TOUR INFO: ' + tourDate);
  })
};

function displayYouTubeVideo() {
  var searchTerm = $('#searchInput').val().trim();

  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBr3fLPLRTVvMQovAL5Xi3pv4txQWnBZDA&q=' + searchTerm + '+official+music+video';


  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response);

    var firstVideoTitle = response.items[0].snippet.title;
    console.log('Video Title: ' + firstVideoTitle);

    firstVideoId = response.items[0].id.videoId;
    console.log('Video ID: ' + firstVideoId);

    // This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function onYouTubeIframeAPIReady(firstVideoId) {
      player = new YT.Player('musicVideoPlayer', {
        height: '240',
        width: '380',
        videoId: firstVideoId,
        events: {
          // 'onReady': onPlayerReady,
          // 'onStateChange': onPlayerStateChange
        }
      });
    }
    onYouTubeIframeAPIReady(firstVideoId);
  });
};

// YOUTUBE EMBED MUSIC VIDEO TRIAL CODE from https://developers.google.com/youtube/iframe_api_reference
// ====================================
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}


function displayLastFmInfo() {
  var searchTerm = $('#searchInput').val().trim();
  var queryURL = 'http://ws.audioscrobbler.com/2.0/?api_key=8479819dada681d1b1ca61c575bdb802&method=artist.getinfo&artist=' + searchTerm + '&format=json'

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log('LastFM: ' + response.artist.name);
    var artistName = JSON.stringify(response.artist.name);
    var results1 = JSON.parse(JSON.stringify(response.artist.bio.summary));
    // $('#artistName').text(artistName);
    $('#results1').text(results1);
  });

}

function hideAll() {
  $('#frontPage').hide();
  $('#newsPage').hide();
  $('#photosPage').hide();
  $('#tourPage').hide();
  $('#contactPage').hide();
}

function newsTab() {
  hideAll();
  $('#newsPage').show();
};

function photosTab() {
  hideAll();
  $('#photosPage').show();
}

function tourTab() {
  hideAll();
  $('#tourPage').show();
}

function mainPage() {
  hideAll();
  $('#frontPage').show();
};

function contactTab() {
  hideAll();
  $('#contactPage').show();
};

var newMusicVideo = $('<img>').attr('id', 'musicVideoPlayer');

$('#submitButton').on('click', function () {
  event.preventDefault();
  $('#frontPage').css('opacity', 1);
  $('.homeTransition').css('height', 0);
  mainPage();
  artistLookup();
  displayOtherEvents();
  $('#musicVideoContainer').empty();
  $('#musicVideoContainer').append(newMusicVideo);
  displayYouTubeVideo();
  displayLastFmInfo();
});

$('#newsTab').on('click', function () {
  newsTab();
});

$('#homeTab').on('click', function () {
  mainPage();
});

$('#photosTab').on('click', function () {
  photosTab();
});

$('#tourDatesTab').on('click', function () {
  tourTab();
});

$('#contactTab').on('click', function () {
  contactTab();
});

$('#returnToMainPage').on('click', function () {
  mainPage();
});

$(function () {
  $('.jumbotron').css('opacity', 0);
  $('.navbar').css('opacity', 0);
  $('#frontPage').css('opacity', 0);
  $('#photosPage').css('opacity', 0);
  $('#tourPage').css('opacity', 0);
  $('#newsPage').css('opacity', 0);
  $('#contactPage').css('opacity', 0);
  $('.homeTransition').css('opacity', 0);
  $('#spotifyBtn').css('opacity', 0)
  let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000,
  })

  tl.add({
    targets: 'section .transition',
    translateY: 1000,
    direction: 'reverse',
    delay: anime.stagger(100, { from: 'center' }),
  })

  tl.add({
    targets: 'section .transition',
    translateY: -1000,
    backgroundColor: 'rgb(242, 149, 89)',
    delay: anime.stagger(100, { from: 'center' }),
  })

  tl.add({
    targets: '.transition',
    height: 0,
  })

  tl.add({
    targets: '#spotifyBtn',
    opacity: 1,
    duration: 500,
  })

  tl.add({
    targets: '.jumbotron',
    opacity: 1,
    duration: 4000,
  })

  tl.add({
    targets: '.navbar',
    opacity: 1,
    duration: 4000,
  })




  /* tl.finished.then(function() {
    $('section').hide();
    $('.navbar').css('opacity', 1);
    $('#frontPage').css('opacity', 1);
    $('#photosPage').css('opacity', 1);
    $('#tourPage').css('opacity', 1);
    $('#newsPage').css('opacity', 1);
    $('#contactPage').css('opacity', 1);
    $('.footer').css('opacity', 1);
  }); */
});

function photosTab() {
  hideAll();
  $('#photosPage').show();
}


function tourTab() {
  hideAll();
  $('#tourPage').show();
}

function mainPage() {
  hideAll();
  $('#frontPage').show();
};

function contactTab() {
  hideAll();
  $('#contactPage').show();
};

var newMusicVideo = $('<img>').attr('id', 'musicVideoPlayer');

$('#submitButton').on('click', function () {
  event.preventDefault();
  $('#musicVideoContainer').empty();
  $('#musicVideoContainer').append(newMusicVideo);
  displayYouTubeVideo();
  displayLastFmInfo();

});

$('#newsTab').on('click', function () {
  $('#newsPage').css('opacity', 1);
  newsTab();
  let tl = anime.timeline({
    duration: 1000,
  })
  tl.add({
    targets: '#newsSection .newsTransition',
    margin: '1em',
    height: '57vh',
    width: '90%',
    backgroundColor: 'rgb(150, 221, 255)',
    delay: anime.stagger(100, { from: 'center' }),
  })
  tl.add({
    targets: '#newsSection .newsTransition',
    height: 0,
    easing: 'easeInOutCirc',
  })
});

$('#homeTab').on('click', function () {
  $('#frontPage').css('opacity', 1);
  $('.homeTransition').css('opacity', 1);
  mainPage();

  let tl = anime.timeline({
    duration: 1000,
  })
  tl.add({
    targets: '#homeSection .homeTransition',
    margin: '1em',
    height: '57vh',
    width: '90%',
    backgroundColor: 'rgb(150, 221, 255',
    delay: anime.stagger(100, { from: 'center' }),
  })
  tl.add({
    targets: '#homeSection .homeTransition',
    height: 0,
    easing: 'easeInOutCirc',
  })
});

$('#photosTab').on('click', function () {
  $('#photosPage').css('opacity', 1);
  photosTab();

  let tl = anime.timeline({
    duration: 1000,
  })
  tl.add({
    targets: '#photosSection .photosTransition',
    margin: '1em',
    height: '57vh',
    width: '90%',
    backgroundColor: 'rgb(150, 221, 255)',
    delay: anime.stagger(100),
  })
  tl.add({
    targets: '#photosSection .photosTransition',
    height: 0,
    easing: 'easeInOutCirc',
  })

});

$('#contactTab').on('click', function () {
  $('#contactPage').css('opacity', 1);
  contactTab();

  let tl = anime.timeline({
    duration: 1000,
  })
  tl.add({
    targets: '#contactSection .contactTransition',
    margin: '1em',
    height: '57vh',
    width: '90%',
    backgroundColor: 'rgb(150, 221, 255)',
    delay: anime.stagger(100, { from: 'last' }),
  })
  tl.add({
    targets: '#contactSection .contactTransition',
    height: 0,
    easing: 'easeInOutCirc',
  })

})

$('#tourDatesTab').on('click', function () {
  tourTab();
});
//SPOTIFY Web Playback SDK

//   function displayLyrics() {
//     var cors = 'https://cors-anywhere.herokuapp.com/'
//     var artist = state.track_window.current_track.artists[0].name;
//     var song = state.track_window.current_track.name;
//     var queryURL_lyrics = "https://private-anon-1e650a5c58-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + song;
//     $.ajax({
//       url: cors + queryURL_lyrics,
//       method: "GET",
//     }).then(function (response) {
//       console.log('LYRICS', response.body);
//       var lyrics = response.lyrics;
//       $("#lyrics-div").html(lyrics);
//     });
//     console.log('SONG TITLE', song);
//     console.log('ARTIST NAME', artist);
//   };
//   displayLyrics();
// });

var access_token = "";
var player = "";
var device_id = "";
(function () {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var params = getHashParams();
  var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
  console.log(access_token);

  if (error) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {

      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {

          $('#login').hide();
          $('#loggedin').show();
        }
      });
    } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
    }

    document.getElementById('obtain-new-token').addEventListener('click', function () {
      $.ajax({
        url: '/refresh_token',
        data: {
          'refresh_token': refresh_token
        }
      }).done(function (data) {
        access_token = data.access_token;
        return (access_token);
      });
    }, false);
  }
  window.onSpotifyWebPlaybackSDKReady = () => {

    var token = access_token;
    var player = new Spotify.Player({
      name: 'toneDef',
      getOAuthToken: cb => { cb(token); }
    });


    $(document).ready(function() {
      $(".track-body").on('click','.tracklist', function(){
        var newTrack = (this.getAttribute( "trackuri" ));
        console.log(newTrack);
        console.log("hot diggity");
        var trackuri = newTrack;
        var token = access_token;
        $.ajax({
          url: 'https://api.spotify.com/v1/me/player/play',
          method: 'PUT',
          data: JSON.stringify({
            "uris":
              [trackuri,],
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        }).then(function() {
          console.log("hot lead");
        });
      })
    });

    function playSelectedSong() {
      event.preventDefault();
      
    };

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      $.ajax({
        url: 'https://api.spotify.com/v1/me/player',
        method: 'PUT',
        data: JSON.stringify({
          "device_ids": [
            device_id
          ]
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token,
        },
      }).then(function () {
        console.log("Device ID: " + device_id + " now playing");
        return(device_id);
      });

      //   function displayLyrics() {
      //     var cors = 'https://cors-anywhere.herokuapp.com/'
      //     var artist = state.track_window.current_track.artists[0].name;
      //     var song = state.track_window.current_track.name;
      //     var queryURL_lyrics = "https://private-anon-1e650a5c58-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + song;
      //     $.ajax({
      //       url: cors + queryURL_lyrics,
      //       method: "GET",
      //     }).then(function (response) {
      //       console.log('LYRICS', response.body);
      //       var lyrics = response.lyrics;
      //       $("#lyrics-div").html(lyrics);
      //     });
      //     console.log('SONG TITLE', song);
      //     console.log('ARTIST NAME', artist);
      //   };
      //   displayLyrics();
      // });


    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    //CLICK TO PLAY A SONG

    // Connect to the player!
    player.connect();

    $("#playButton").click(function () {
      player.resume();
      playerStatus();
    });
    $("#pauseButton").click(function () {
      player.pause();
      playerStatus();
    });
    $("#previousButton").click(function () {
      player.previousTrack();
      playerStatus();
    });
    $("#nextButton").click(function () {
      player.nextTrack();
      playerStatus();
    });


    // ==============================
    // NEW SEARCH DISPLAY INFORMATION
    // ==============================

    //SEARCH FOR SONGS
    $("#submitButton").click(function () {
      event.preventDefault();
      $('.table tbody').empty();
      var track = $('#searchInput').val().trim()
      $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + track + '&type=track&limit=10',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var dataResponse = response.tracks.items;
        for (var i = 0; i < dataResponse.length; i++) {
          
          var trackID = dataResponse[i].uri;
          console.log('TRACK ID: ' + trackID);
          
          var trackName = dataResponse[i].name;
          console.log('TRACK: ' + trackName);
          
          var albumName = dataResponse[i].album.name;
          console.log('ALBUM: ' + albumName);
          
          var artistName = dataResponse[i].artists[0].name;
          console.log('ARTIST: ' + artistName);
          
          $('.track-body').append("<tr><td class='tracklist' trackuri ='" + trackID + "'>" + trackName + '</td><td>' + artistName + '</td></tr>');
          $('.album-body').append('<tr><td>' + albumName + '</td><td>' + artistName + '</td></tr>');
        }
      });

    })
    
    // Connect to the player!
    player.connect();

    $("#playButton").click(function () {
      player.resume();
      playerStatus();
    });
    $("#pauseButton").click(function () {
      player.pause();
      playerStatus();
    });
    $("#previousButton").click(function () {
      player.previousTrack();
      playerStatus();
    });
    $("#nextButton").click(function () {
      player.nextTrack();
      playerStatus();
    });

    function playerStatus() {
      player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        } let {
          current_track,
          next_tracks: [next_track]
        } = state.track_window;
        console.log(current_track.album.uri)

        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);

      });
    };
  };

})();