import React from 'react';
import './Main.css';
import { useData } from './Data';
import { useState, useEffect } from 'react';

export default function Main() {
  const [{ top_tracks, user }, dispatch] = useData();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState('');
  const [time, setTime] = useState('');
  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    const test = new Date().getHours();
    setTime(test);
  }, [time]);

  return (
    <div className="main">
      <div className="main_container">
        <input
          type="search"
          className="searchBar"
          placeholder="Artists, songs, or podcasts"
          value={searchResults}
          onChange={handleChange}
        />
        <div className="main_intro">
          <div className="intro_header">
            {time &&
              user &&
              `Good ${time < 12 ? 'morning' : time < 18 ? 'day' : 'evening'}, ${
                user?.display_name
              }`}
          </div>
          <div className="top20_header">Your top tracks</div>
          <div className="intro_top20">
            {top_tracks &&
              top_tracks.items.map((element, i) => {
                return (
                  <div key={i} className="top20_track">
                    <img
                      className="top20_track_img"
                      src={element.album.images[1].url}
                      alt=""
                    />
                    <div className="top20_track_title">{element.name}</div>
                    <div className="top20_track_artist">
                      {element.artists.map((artist) => artist.name).join(', ')}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
