
import React, { useState } from "react";
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

const EditProfileForm = ({  onSave }) => {
  const [newImage, setNewImage] = useState(null);

  const handleSave = () => {
    const formData = new FormData();
    if (newImage) {
      formData.append("avatar", newImage);
    }
    onSave(formData);
  };

  return (
    <Container maxWidth="md">
      <Card elevation={3}>
        <CardHeader
          title={<Typography variant="h5">Edit Profile Picture</Typography>}
        />
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} align="center">
              <Avatar
                alt="New Avatar"
                src={newImage ? URL.createObjectURL(newImage) : null}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  setNewImage(e.target.files[0]);
                }}
                id="avatar-input"
              />
              <label htmlFor="avatar-input">
                <Button variant="contained" component="span" size="large">
                  Upload Profile Picture
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="large"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditProfileForm;
