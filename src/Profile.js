import React from 'react';
import { useData } from './Data';

export default function Profile() {
  const [{ user }, dispatch] = useData();
  return (
    <div className="profile">
      <div className="profile_container">
        {user && (
          <>
            <img className="profile_img" src={user?.images[0].url} alt="" />
            <h1 className="profile_name">{user?.display_name}</h1>
          </>
        )}
      </div>
    </div>
  );
}
