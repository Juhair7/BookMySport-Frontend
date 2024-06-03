
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

// SPView component for displaying service provider profile information
const SPView = ({ profile, avatarUrl, onEdit }) => {
  console.log(avatarUrl);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ backgroundColor: "#f0f0f0" }}>
        <CardHeader
          avatar={
            <Avatar
              alt={profile.userName}
              src={avatarUrl.avatarUrl}
              sx={{ width: 120, height: 120 }}
            />
          }
          title={<Typography variant="h4">{profile.userName}</Typography>}
          subheader={
            <Typography variant="subtitle1">{profile.email}</Typography>
          }
          sx={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #ccc",
            py: 2,
          }}
        />
        <CardContent sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Centre Name:</strong> {profile.centreName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {profile.address}
          </Typography>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit Profile Picture
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SPView;
