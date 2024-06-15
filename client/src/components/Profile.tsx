import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbums } from "@prisma/client";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

//define the structure of a Album Object

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

//define the structure of a Album Object

interface Album {
  id: number;
  albumName: string;
  artistName: string;
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

  const editName = () => {
    let updateName = prompt("enter new name");
    axios
      .put(`/api/user/${user.id}`, {
        updateType: "name",
        updateVal: updateName,
      })
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const editUsername = () => {
    let updateName = prompt("enter new username");
    axios
      .put(`/api/user/${user.id}`, {
        updateType: "username",
        updateVal: updateName,
      })
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const editBio = () => {
    let updateBio = prompt('Edit Bio');
    axios
    .put(`/api/user/${user.id}`, {
      updateType: "bio",
      updateVal: updateBio,
    })
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
        <button onClick={() => editUsername()}>Edit Username</button>
        <h4>{user.name}</h4>
        <button onClick={() => editName()}>Edit Name</button>
        <p>{user.bio ? user.bio : "Add a bio"}</p>
        <button onClick={() => editBio()}>Edit Bio</button>
        <button onClick={() => deleteProfile()}>Delete profile</button>
      </div>
      {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
      {user.id > 0 && <TopArtistsComponent userId={user.id} />}
    </div>
  );
};

export default Profile;
