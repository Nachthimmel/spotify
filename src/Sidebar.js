import React from 'react';
import Playlists from './Playlists';
import Profile from './Profile';
import './Sidebar.css';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <Profile />
        <div className="sidebar_between"></div>
        <div className="playlists_header">Public Playlists</div>
        <Playlists />
      </div>
    </div>
  );
}
