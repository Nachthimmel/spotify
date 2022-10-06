import React from 'react';
import './Footer.css';

export default function FooterSong({ item }) {
  //console.log(item);
  return (
    <div className="footerSong">
      {item && (
        <img
          className="footer_albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
      )}
      {item ? (
        <div className="footer_songInfo">
          <h4>{item?.name}</h4>
          <p>{item?.artists.map((artist) => artist.name).join(', ')}</p>
        </div>
      ) : (
        <div className="footer_songInfo">
          <h4>No song is playing</h4>
        </div>
      )}
    </div>
  );
}
