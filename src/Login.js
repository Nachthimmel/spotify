import React from 'react';
import { useState } from 'react';
import './Login.css';

const auth = 'https://accounts.spotify.com/authorize';
const clientId = '3e40423e2560425d8847d35e7a44f639';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-top-read',
];

const authUrl = `${auth}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&show_dialog=true`;

export default function Login() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="login">
      <div className="login_container">
        <a
          className={click ? 'btn login_btn clicked' : 'btn login_btn'}
          href={authUrl}
          onClick={handleClick}
        >
          Log in
        </a>
        <div className="test">SOME FUNCTIONS ARE PREMIUM ONLY</div>
      </div>
    </div>
  );
}
