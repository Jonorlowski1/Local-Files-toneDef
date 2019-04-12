
//TRACK LOOKUP
// $.ajaxPrefilter(function (options) {
//   if (options.crossDomain && jQuery.support.cors) {
//     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//   }
// });
// function displayLyrics() {
//   var artist = $("#artistDiv").html();
//   var song = $("#songDiv").html();
//   var queryURL_lyrics = "https://private-anon-1e650a5c58-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + song;
//   $.ajax({
//     url: queryURL_lyrics,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response.body);
//     var lyrics = response.lyrics;
//     $("#lyrics-div").html(lyrics);
//   });
// };
// displayLyrics();

// // IP LOOKUP
// function displayEvents() {
//   var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
//   var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
//   var response_ip;
//   $.ajax({
//     url: queryURL_IP,
//     method: "GET",
//   }).then(function (response) {

//     response_ip = response.ip;
//     console.log('User IP: ' + response_ip);

//     //SONGKICK EVENT LOOKUP
//     var apikey_localEvents = "926QLoynaFfTnoup"
//     var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
//     $.ajax({
//       url: queryURL_localEvents,
//       method: "GET",
//     }).then(function (response) {

//       console.log('SongKick: ' + response);
//     })
//   });
// };

// This wasn't in a function, and it almost looks like a duplicate, so I put it in it's own function
// function displayOtherEvents () {
// var apikey_IP = "7f3b94deee23a7b7e8c0d6d6355a33cf";
// var queryURL_IP = "http://api.ipstack.com/check?access_key=" + apikey_IP + "&output=json";
// var response_ip;
// $.ajax({
//   url: queryURL_IP,
//   method: "GET",
// }).then(function (response) {

//   response_ip = response.ip;
//   console.log("User IP: " + response_ip)
//   console.log(response);

//   //SONGKICK NEARBY EVENT LOOKUP
//   var apikey_localEvents = "926QLoynaFfTnoup"
//   var queryURL_localEvents = "https://api.songkick.com/api/3.0/search/locations.json?location=ip:" + response_ip + "&apikey=" + apikey_localEvents;
//   $.ajax({
//     url: queryURL_localEvents,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     var upcomingEvents = response.resultsPage.results.location[0].metroArea.uri;
//     console.log("local upcoming events: " + upcomingEvents);
//   })
// });
// };
// displayOtherEvents();

// function artistLookup () {
//   //SONGKICK SIMILAR ARTIST LOOKUP
//   var artist = "John Mayer";
//   var apikey_localEvents = "926QLoynaFfTnoup"
//   var queryURL_artistEvents = "https://api.songkick.com/api/3.0/search/artists.json?apikey=" + apikey_localEvents + "&query=" + artist;
//   $.ajax({
//     url: queryURL_artistEvents,
//     method: "GET",
//   }).then(function (response) {

//     console.log("artist upcoming events");
//     console.log(response);
//   })
// };
// artistLookup();

// function displayYouTubeVideo() {
//   var searchTerm = $('#searchInput').val().trim();

//   var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBr3fLPLRTVvMQovAL5Xi3pv4txQWnBZDA&q=' + searchTerm + '+official+music+video';

//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     // console.log(response);

//     var firstVideoTitle = response.items[0].snippet.title;
//     console.log('Video Title: ' + firstVideoTitle);
    
//     firstVideoId = response.items[0].id.videoId;
//     console.log('Video ID: ' + firstVideoId);

//     // This function creates an <iframe> (and YouTube player)
//     //    after the API code downloads.
//     function onYouTubeIframeAPIReady(firstVideoId) {
//       player = new YT.Player('musicVideoPlayer', {
//         height: '240',
//         width: '380',
//         videoId: firstVideoId,
//         events: {
//           // 'onReady': onPlayerReady,
//           // 'onStateChange': onPlayerStateChange
//         }
//       });
//     }
//     onYouTubeIframeAPIReady(firstVideoId);
//   });
// };

// ====================================
// YOUTUBE EMBED MUSIC VIDEO TRIAL CODE from https://developers.google.com/youtube/iframe_api_reference
// // ====================================
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// // The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// function displayWikiInfo() {
//   var searchTerm = $('#searchInput').val().trim();
//   var cors = 'https://cors-anywhere.herokuapp.com/'
//   var queryURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json';
//   console.log(searchTerm);

//   $.ajax({
//     url: cors + queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     console.log('WIKIPEDIA' + response);
//     var artistName = response[1][0];
//     var results1 = response[2][0];
//     var results2 = response[2][1];
//     var results3 = response[2][2];

//     $('#artistName').text(artistName);
//     $('#results1').text(results1);
//     $('#results2').text(results2);
//     $('#results3').text(results3);
//   });
// };

// function displayLastFmInfo() {
//   var searchTerm = $('#searchInput').val().trim();
//   var queryURL = 'http://ws.audioscrobbler.com/2.0/?api_key=8479819dada681d1b1ca61c575bdb802&method=artist.getinfo&artist=' + searchTerm + '&format=json'

//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     console.log('LastFM: ' + response.artist.name);
//     var artistName = JSON.stringify(response.artist.name);
//     var results1 = JSON.parse(JSON.stringify(response.artist.bio.summary));
//     $('#artistName').text(artistName);
//     $('#results1').text(results1);
//   });

// }


// function displayNewsInfo() {
//   var searchArtist = $('#searchInput').val().trim();
//   var queryURL = 'https://newsapi.org/v2/everything?q=' + searchArtist + '&from=2019-03-06&sortBy=publishedAt&apiKey=ad64dfb3904d4063bbc4193ffff9173f'

//   $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function (response) {
//     // console.log(response);
//   });
// };

// function hideAll() {
//   $('#frontPage').hide();
//   $('#newsPage').hide();
//   $('#photosPage').hide();
//   $('#tourPage').hide();
//   $('#contactPage').hide();
// }

// function newsTab() {
//   hideAll();
//   $('#newsPage').show();
// };

// function photosTab() {
//   hideAll();
//   $('#photosPage').show();
// }

// function tourTab() {
//   hideAll();
//   $('#tourPage').show();
// }

// function mainPage() {
//   hideAll();
//   $('#frontPage').show();
// };

// function contactTab () {
//   hideAll();
//   $('#contactPage').show();
// };

// var newMusicVideo = $('<img>').attr('id', 'musicVideoPlayer');

// $('#submitButton').on('click', function () {
//   event.preventDefault();
//   $('#musicVideoContainer').empty();
//   $('#musicVideoContainer').append(newMusicVideo);
//   displayYouTubeVideo();
//   // displayWikiInfo();
//   displayLastFmInfo();

// });

// $('#newsTab').on('click', function () {
//   newsTab();
// });

// $('#homeTab').on('click', function() {
//   mainPage();
// });

// $('#photosTab').on('click', function () {
//   photosTab();
// });

// $('#tourDatesTab').on('click', function() {
//   tourTab();
// });

// $('#contactTab').on('click', function () {
//   contactTab();
// });

// $('#returnToMainPage').on('click', function () {
//   mainPage();
// });

//SPOTIFY Web Playback SDK

var access_token = "";
var player;
var device_id = "";
(function() {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
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
        success: function(response) {
          
          $('#login').hide();
          $('#loggedin').show();
        }
      });
    } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
    }
    
    document.getElementById('obtain-new-token').addEventListener('click', function() {
      $.ajax({
        url: '/refresh_token',
        data: {
          'refresh_token': refresh_token
        }
      }).done(function(data) {
        access_token = data.access_token;
        return(access_token);
      });
    }, false);
  }
  window.onSpotifyWebPlaybackSDKReady = () => {
    
    var token = access_token;
    var player = new Spotify.Player({
      name: 'toneDef',
      getOAuthToken: cb => { cb(token); }
    });
    
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
      }).then(function() {
        console.log("hot lead");
        console.log(device_id);
      });

    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    
    // Connect to the player!
    player.connect();
    
    $("#playButton").click(function(){
      player.resume();
      playerStatus();
    });
    $("#pauseButton").click(function(){
      player.pause();
      playerStatus();
    });
    $("#previousButton").click(function(){
      player.previousTrack();
      playerStatus();
    });
    $("#nextButton").click(function(){
      player.nextTrack();
      playerStatus();
    });
    
    $("#submitButton").click(function(){
      var artist = $('#searchInput').val().trim()
      $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
    });

    function playerStatus(){
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