import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

import { updatePlaylistOptions } from "../../modules/actions";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  input: {
    margin: theme.spacing(1),
  },
}));

const UpdateForm = ({ playlist, playlistInfoHandler, openUpdate, updateDialogHandler }) => {
  const classes = useStyles();
  const [update, setUpdate] = useState(playlist);
  const { title, description, visible } = update;

  const updatePlaylistHandler = () => {
    updatePlaylistOptions(update).then((response) => {
      playlistInfoHandler(response.playlist);
      updateDialogHandler();
    });
  };

  const closeUpdateDialog = () => {
    setUpdate(playlist);
    updateDialogHandler();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };

  const onRadioChange = (e) => {
    const { value, name } = e.target;
    setUpdate({
      ...update,
      [name]: value === "public" ? true : false,
    });
  };

  return (
    <Dialog open={openUpdate} onClose={closeUpdateDialog} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>정보 수정</DialogTitle>
      <div className={classes.form}>
        <TextField
          className={classes.input}
          name="title"
          label="title"
          variant="outlined"
          fullWidth
          size="small"
          placeholder={playlist.title}
          onChange={onChange}
          defaultValue={title}
        />
        <TextField
          className={classes.input}
          name="description"
          label="description"
          variant="outlined"
          fullWidth
          size="small"
          placeholder={playlist.description}
          onChange={onChange}
          defaultValue={description}
        />
        <FormControl component="fieldset">
          <RadioGroup
            className={classes.input}
            name="visible"
            value={update.visible ? "public" : "private"}
            onChange={onRadioChange}
          >
            <FormControlLabel value="public" control={<Radio />} label="public" />
            <FormControlLabel value="private" control={<Radio />} label="private" />
          </RadioGroup>
        </FormControl>
      </div>

      <DialogActions>
        <Button onClick={updatePlaylistHandler}>save</Button>
        <Button color="secondary" onClick={closeUpdateDialog}>
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateForm;
