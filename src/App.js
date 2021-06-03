import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./Login"
import Player from "./Player";
import { getTokenFromResponse } from "./spotify";
import './App.css';
import { useStateValue } from "./StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        })
      })

      spotify.getPlaylist('37i9dQZEVXcREedKL4Mkns').then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      })

    }

    //TODO getMyTopArtists
    
  }, [token, dispatch])
  // console.log(user)
  // console.log(token)
  
  return (
    <div className="app">
      {
        token ? (<Player spotify={ spotify }/>) : (<Login />)
      }
    </div>
  );
}

export default App;