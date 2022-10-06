import React from 'react';
import { useData } from './Data';
import { useState, useEffect } from 'react';
import './Footer.css';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Slider } from '@mui/material';
import LyricsIcon from '@mui/icons-material/Lyrics';
import DevicesIcon from '@mui/icons-material/Devices';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FooterSong from './FooterSong';

export default function Footer() {
  const [{ token, item, playing, spotify, devices }, dispatch] = useData();
  const [vol, setVol] = useState(25);
  const [mute, setMute] = useState(true);
  const [additionalVol, setAdditionalVol] = useState(vol);

  // useEffect(() => {
  //   if (!token) return;
  //   console.log(spotify);
  //   let cancel = false;
  //   spotify.getMyCurrentPlaybackState().then((data) => {
  //     if (cancel) return;
  //     console.log('PLAYBACK STATE: ');
  //     console.log(data);

  //     dispatch({
  //       type: 'SET_PLAYING',
  //       playing: data.is_playing,
  //     });

  //     dispatch({
  //       type: 'SET_ITEM',
  //       item: data.item,
  //     });
  //   });
  //   return () => (cancel = true);
  // }, [token, dispatch]);

  useEffect(() => {
    if (!devices && !spotify) return;
    //console.log('DEVICES IN USE EFFECT');
    //console.log(devices);
    const temp =
      devices.length > 1 &&
      spotify &&
      devices?.filter((dev) => dev.is_active === true)[0].volume_percent;
    //console.log(temp);
    temp && setVol(temp);
    //console.log('VOLUME');
    //console.log(temp);
  }, [devices]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((data) => {
      dispatch({
        type: 'SET_ITEM',
        item: data.item,
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((data) => {
      dispatch({
        type: 'SET_ITEM',
        item: data.item,
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    });
  };

  const changeVolume = (e) => {
    e.target.value !== null &&
      e.target.value !== vol &&
      spotify.setVolume(e.target.value);
    setVol(e.target.value);
    setAdditionalVol(e.target.value);
    if (e.target.value === 0 || vol === 0) {
      setMute(true);
    }
    //else setMute(false);
  };

  const handleMute = (e) => {
    e.preventDefault();
    if (mute === true) {
      spotify.setVolume(0);
      setVol(0);
    } else {
      spotify.setVolume(additionalVol);
      setVol(additionalVol);
    }
    setMute(!mute);
  };

  const handleDevices = (e) => {
    e.preventDefault();
  };

  return (
    <div className="footer">
      <div className="footer_container">
        <FooterSong item={item} />
        <div className="footer_middle">
          <ShuffleIcon fontSize="small" className="footer_icon" />
          <SkipPreviousIcon onClick={skipPrevious} className="footer_icon" />
          {playing ? (
            <PauseCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer_pauseIcon"
            />
          ) : (
            <PlayCircleOutlineIcon
              onClick={handlePlayPause}
              fontSize="large"
              className="footer_playIcon"
            />
          )}
          <SkipNextIcon onClick={skipNext} className="footer_icon" />
          <RepeatIcon fontSize="small" className="footer_icon" />
        </div>

        <div className="footer_right">
          <LyricsIcon fontSize="small" className="footer_icon" />
          <PlaylistPlayIcon className="footer_icon" />
          <DevicesIcon fontSize="small" className="footer_icon" />
          {!mute ? (
            <VolumeOffIcon onClick={handleMute} className="footer_icon" />
          ) : vol === 0 ? (
            <VolumeOffIcon onClick={handleMute} className="footer_icon" />
          ) : (
            <VolumeDownIcon onClick={handleMute} className="footer_icon" />
          )}
          <Slider
            aria-labelledby="Volume"
            sx={{
              color: 'green',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                backgroundColor: '#fff',
                '&:before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
            value={vol}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
}
