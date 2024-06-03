
import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";

// PlayerView component for displaying player profile information
const PlayerView = ({ profile, avatarUrl, onEdit }) => {
  console.log(avatarUrl);
  return (
    <Container maxWidth="sm">
      <Card elevation={3} sx={{ backgroundColor: "#f0f0f0" }}>
        <CardHeader
          avatar={
            <Avatar
              alt={profile.userName}
              src={avatarUrl}
              sx={{ width: 100, height: 100 }}
            />
          }
          title={<Typography variant="h5">{profile.userName}</Typography>}
          subheader={
            <Typography variant="subtitle1">{profile.email}</Typography>
          }
          sx={{ backgroundColor: "#fff", borderBottom: "1px solid #ccc" }}
        />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </Typography>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit Profile Picture
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlayerView;
