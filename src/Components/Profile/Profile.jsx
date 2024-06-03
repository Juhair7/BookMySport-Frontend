import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import { apiConfig } from "../../Constants/ApiConfig";
import PlayerView from "./playerView";
import SPView from "./SPView";
import EditProfileForm from "./EditProfileForm";


// Profile component for managing user profile data and rendering appropriate views
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
          role: Cookies.get("role"),
        };
        const profileResponse = await axios.get(
          `${apiConfig.auth}/getuserdetailsbytoken`,
          { headers }
        );
        setProfile(profileResponse.data);
        const avatarResponse = await axios.get(`${apiConfig.auth}/getavatar`, {
          headers,
        });
        setAvatarUrl(avatarResponse.data.avatar);
        console.log(avatarUrl);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (formData) => {
    try {
      const headers = {
        //"Content-Type": "multipart/form-data",
        token: Cookies.get("token"),
        role: Cookies.get("role"),
      };
      await axios.post(`${apiConfig.auth}/uploadavatar`, formData, { headers });
      setIsEditing(false);
      const avatarResponse = await axios.get(`${apiConfig.auth}/getavatar`, {
        headers,
      });
      console.log(avatarResponse.data);
      setAvatarUrl(avatarResponse.data.avatar);
      
    } catch (error) {
      console.error(
        "Error updating profile data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      {profile.userName ? (
        isEditing ? (
          <EditProfileForm
            onImageChange={(newImage) => console.log(newImage)} // handle image change
            onSave={handleSave}
          />
        ) : Cookies.get("role") === "user" ? (
          <PlayerView
            profile={profile}
            avatarUrl={avatarUrl}
            onEdit={handleEdit}
          />
        ) : (
          <SPView profile={profile} avatarUrl={avatarUrl} onEdit={handleEdit} />
        )
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
};

export default Profile;
