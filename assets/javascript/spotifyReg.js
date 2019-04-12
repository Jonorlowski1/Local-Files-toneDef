
// SPOTIFY Web Playback SDK

window.onSpotifyWebPlaybackSDKReady = () => {
	const play = ({
    spotify_uri,
    playerInstance: {
      _options: {
        getOAuthToken,
        id
      }
    }
  }) => {
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });
    });
  };
  
  play({
    playerInstance: new Spotify.Player({ name: "..." }),
    spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  });

  var player = new Spotify.Player({
    name: 'Carly Rae Jepsen Player',
    getOAuthToken: callback => {
      // Run code to get a fresh access token
  
      callback('access token here');
    },
    volume: 0.5
  });

  player.connect().then(success => {
    if (success) {
      console.log('The Web Playback SDK successfully connected to Spotify!');
    }
  })
  	
  player.addListener('ready', ({ device_id }) => {
    console.log('The Web Playback SDK is ready to play music!');
    console.log('Device ID', device_id);
  })

  player.getCurrentState().then(state => {
    if (!state) {
      console.error('User is not playing music through the Web Playback SDK');
      return;
    }
  
    let {
      current_track,
      next_tracks: [next_track]
    } = state.track_window;
  
    console.log('Currently Playing', current_track);
    console.log('Playing Next', next_track);
  });

  player.setName("My New Player Name").then(() => {
    console.log('Player name updated!');
  });
};
