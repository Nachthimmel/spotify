import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useData } from './Data';
import useAuth from './useAuthentication';
import Sidebar from './Sidebar';
import Main from './Main';
import Footer from './Footer';

const spotify = new SpotifyWebApi();

export default function Home(code) {
  useAuth(code);
  const [{ user, token, item, playing }, dispatch] = useData();

  useEffect(() => {
    if (!token) return;
    spotify.setAccessToken(token.access_token);
  }, [token]);

  useEffect(() => {
    if (!spotify.getAccessToken()) return;

    dispatch({
      type: 'SET_SPOTIFY',
      spotify: spotify,
    });

    spotify.getMyCurrentPlaybackState().then((data) => {
      console.log('PLAYBACK STATE: ');
      console.log(data);
      console.log(data.item);
      dispatch({
        type: 'SET_PLAYING',
        playing: data.is_playing,
      });

      dispatch({
        type: 'SET_ITEM',
        item: data.item,
      });
    });

    spotify.getMe().then((user) => {
      dispatch({
        type: 'SET_USER',
        user,
      });
    });

    spotify.getMyDevices().then((data) => {
      //console.log('DEVICES:');
      //console.log(data.devices);
      dispatch({
        type: 'SET_DEVICES',
        devices: data.devices,
      });
    });

    spotify.getUserPlaylists().then((playlists) => {
      //console.log('PLAYLISTS:');
      //console.log(playlists);
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists,
      });
    });

    spotify.getMyTopTracks().then((data) => {
      //console.log('TOP TRACKS:');
      //console.log(data);
      dispatch({
        type: 'SET_TOP_TRACKS',
        top_tracks: data,
      });
    });
  }, [token, dispatch]);

  return (
    <div className="home">
      <div className="home_container">
        <Sidebar />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
