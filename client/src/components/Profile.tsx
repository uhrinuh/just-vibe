import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";
import { Link } from 'react-router-dom';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
    bio: "",
    image: "",
  });

  const loadPage = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteProfile = () => {
    let answer = prompt("enter your username to delete:");
    const delUser = {
      id: 0,
      googleId: "",
      location: "",
      name: "",
      username: "",
      bio: "",
      image: "",
    };
    if (answer === user.username) {
      axios.delete(`/api/user/${user.id}`).then(() => setUser(delUser));
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <img src={user.image} />
        <h3>@{user.username}</h3>
        <h4>{user.name}</h4>
        <p>{user.bio ? user.bio : "Add a bio"}</p>
        <Link to={`/user/edit/${user.id}`}>Edit Profile</Link>
        <button onClick={() => deleteProfile()}>Delete profile</button>
      </div>
      {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
      {user.id > 0 && <TopArtistsComponent userId={user.id} />}
    </div>
  );
};

export default Profile;
