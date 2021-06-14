import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { getPlaylistFromPlatform } from "../../modules/actions";
import { catchError } from "../../modules/actions/errorActions";
import useAsync from "../../modules/useAsync";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    background: "#EBEBEB",
  },
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  formControl: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    background: "#E3EBDF",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "50vh",
    width: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      height: "70vh",
    },
  },
  formLabel: {
    color: "black",
    borderBottom: "1px solid black",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  formControlLabel: {
    borderBottom: "1px solid black",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  label: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  thumbnail: {
    [theme.breakpoints.down("xs")]: {
      height: 50,
      width: 50,
    },
    height: 70,
    width: 70,
    marginRight: theme.spacing(1),
  },
  button: {
    background: "#A2C5E8",
  },
}));

const buttonProps = {
  variant: "contained",
  size: "small",
};

const PlaylistForm = ({ source, initPlatform, playlistHandler }) => {
  const classes = useStyle();
  const [isActiveTrackBtn, setIsActiveTrackBtn] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [playlistState, refetchPlaylist] = useAsync(
    () => getPlaylistFromPlatform(source),
    [],
    true
  );
  const { loading, data: playlistData, error } = playlistState;

  useEffect(() => {
    if (error) {
      catchError(error, initPlatform);
    }
  }, [error]);

  //playlist check box handler
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    setIsActiveTrackBtn(checkedItems.size);
  };

  const checkedItemToPlaylist = async () => {
    await playlistHandler([]);
    const checkedPlaylists = [];
    checkedItems.forEach((idx) => {
      checkedPlaylists.push(playlistData.playlists[idx]);
    });
    playlistHandler(checkedPlaylists);
    setIsActiveTrackBtn(false);
  };

  if (loading) return <CircularProgress />;

  if (!playlistData)
    return (
      <Button {...buttonProps} className={classes.button} onClick={refetchPlaylist}>
        {source} 에서 플레이리스트 가져오기
      </Button>
    );

  return (
    <Paper className={classes.root} elevation={3}>
      <Paper className={classes.formWrapper} elevation={5}>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>플레이리스트를 선택하세요</FormLabel>
          <FormGroup className={classes.formGroup}>
            {playlistData.playlists.map((playlist, idx) => (
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    checked={checkedItems.has(idx)}
                    onChange={(e) => {
                      checkedItemHandler(idx, e.target.checked);
                    }}
                  />
                }
                label={
                  <div className={classes.label}>
                    <img className={classes.thumbnail} src={playlist.thumbnail} />
                    <div>{playlist.title}</div>
                  </div>
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </Paper>

      <Button
        {...buttonProps}
        className={classes.button}
        disabled={!isActiveTrackBtn}
        onClick={checkedItemToPlaylist}
      >
        다음단계
      </Button>
    </Paper>
  );
};

export default PlaylistForm;
