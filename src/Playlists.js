import React from 'react';
import { useData } from './Data';

import image1 from './images/fe1.jpg';
import image2 from './images/fe2.png';
import image3 from './images/fe3.jpg';
import image4 from './images/fe4.jpg';
import image5 from './images/fe5.jpg';

export default function Playlists() {
  const [{ playlists }, dispatch] = useData();
  return (
    <div className="playlists">
      <div className="playlists_container">
        {playlists?.items?.map((playlist, i) => {
          return (
            <div className="playlist" key={i}>
              <img
                className="playlist_img"
                src={playlist?.images[1]?.url}
                alt={playlist.name}
              />
              <p className="playlist_p">{playlist.name}</p>
            </div>
          );
        })}
        <div className="playlist">
          <img className="playlist_img" src={image1} />
          <p className="playlist_p">Intense Studying</p>
        </div>
        <div className="playlist">
          <img className="playlist_img" src={image2} />
          <p className="playlist_p">Bass to Blow Out Your Car Speaker</p>
        </div>
        <div className="playlist">
          <img className="playlist_img" src={image3} />
          <p className="playlist_p">mode:hyperpop&lt3</p>
        </div>
        <div className="playlist">
          <img className="playlist_img" src={image4} />
          <p className="playlist_p">aceu</p>
        </div>
        <div className="playlist">
          <img className="playlist_img" src={image5} />
          <p className="playlist_p">random burst of energy at 2am</p>
        </div>
      </div>
    </div>
  );
}
