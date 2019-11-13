import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import InputField from "./Inputfield";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  inputContainer: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    // alignItems: "flex-start",
    // minHeight: "400px"
    display: "grid",
    gridTemplateRows: "minmax(1fr, 400px)",
    gap: "20px"
  },
  input: {
    marginTop: "10px !important"
  }
}));

export default function InputWithIcon({
  name,
  setName,
  category,
  setCategory,
  email,
  setEmail,
  contact,
  setContact,
  address,
  setAddress,
  description,
  setDescription,
  id,
  location,
  setLocation,
  setMedia,
  media,
  handleDeleteImage
}) {
  const classes = useStyles();
  console.log(media)
  return (
    <div className={classes.container}>
      <div className={classes.margin}>
        <div className={classes.inputContainer}>
          <InputField
            className={classes.input}
            label="Name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <InputField
            className={classes.input}
            label="Category"
            onChange={e => setCategory(e.target.value)}
            value={category}
          />
          <InputField
            className={classes.input}
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <InputField
            className={classes.input}
            label="Contact"
            onChange={e => setContact(e.target.value)}
            value={contact}
          />
        </div>
        <div className={classes.inputContainer}>
          <InputField
            className={classes.input}
            label="Address"
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
          <InputField
            className={classes.input}
            label="Description"
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <div style={{ display: "flex" }}>
            <InputField
              className={classes.input}
              label="Latitude"
              onChange={e =>
                setLocation({
                  ...location,
                  latitude: e.target.value
                })
              }
              value={location.latitude}
            />
            <InputField
              className={classes.input}
              label="Longitude"
              onChange={e =>
                setLocation({
                  ...location,
                  longitude: e.target.value
                })
              }
              value={location.longitude}
            />
          </div>

          {id ? (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={e => {
                  setMedia(e.target.files);
                }}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="secondary"
                  component="span"
                  className={classes.input}
                >
                  Upload Images
                </Button>
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 80px)",
                  gridGap: "10px",
                  placeContent: "start"
                }}
              >
                {Object.keys(media).length > 0
                  ? media.src.map((image, index) => (
                      <div
                        key={index}
                        title={media.names[index]}
                        style={{
                          cursor: "pointer",
                          width: "80px",
                          height: "50px",
                          backgroundImage: `url('${image}')`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          boxShadow: "2px 2px 2px #333",
                          display: "grid",
                          placeItems: "center"
                          // margin: '2px'
                        }}
                      >
                        <IconButton
                          key={index}
                          aria-label="delete"
                          style={{
                            position: "relative !important",
                            bottom: "-40px",
                            left: "-30px"
                          }}
                          onClick={() => {
                            handleDeleteImage(media.names[index]);
                          }}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </div>
                    ))
                  : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
