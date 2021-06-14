import React, { useState } from "react";
import {
  Avatar,
  makeStyles,
  Menu,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GoTriangleDown } from "react-icons/go";

import { logout, signOut } from "../../modules/actions";
import Login from "../Login";

const useStyles = makeStyles((theme) => ({
  user: {
    color: "black",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#929C4E",
      borderColor: "#929C4E",
      color: "white",
      boxShadow: "none",
    },
    background: "#DDE88B",
  },
  avatar: {
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: "0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: "0.5rem",
    },
    background: "#6BB55B",
    color: "#2D821A",
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  cancelBtn: {
    backgroundColor: "lightBlue",
  },
  signOutBtn: {
    backgroundColor: "red",
    color: "white",
  },
  menu: {
    position: "absolute",
  },
}));

const index = ({ payload }) => {
  const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = async (menu) => {
    setAnchorEl(null);
    if (menu === "Logout") {
      await logoutHandler();
    }
    if (menu === "SignOut") {
      handleSignOutDialog();
    }
  };

  const handleLoginDialog = () => {
    setLoginDialogOpen((prev) => {
      return !prev;
    });
  };

  const handleSignOutDialog = () => {
    setOpenSignOutDialog((prev) => {
      return !prev;
    });
  };

  const logoutHandler = async () => {
    await logout();
    window.location = "/";
  };

  const SignOutHandler = () => {
    signOut().then(() => {
      handleSignOutDialog();
      window.location = "/";
    });
  };

  return (
    <div>
      {payload ? (
        <Button className={classes.user} onClick={handleClickMenu}>
          <Avatar className={classes.avatar} alt={payload.name[0]} src={payload.image}>
            {!payload.image && payload.name[0]}
          </Avatar>
          {payload.name}
          <GoTriangleDown className={classes.icon} />
        </Button>
      ) : (
        <Button className={classes.user} onClick={handleLoginDialog}>
          {/* <ExitToAppIcon className={classes.icon} onClick={handleLoginDialog} /> */}
          <ExitToAppIcon className={classes.icon} />
        </Button>
      )}
      <Login dialogOpen={loginDialogOpen} handleDialog={handleLoginDialog} />
      <Menu className={classes.menu} anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            handleCloseMenu("Logout");
          }}
        >
          로그아웃
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu("SignOut");
          }}
        >
          회원탈퇴
        </MenuItem>
      </Menu>
      <Dialog open={openSignOutDialog} onClose={handleSignOutDialog}>
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent>
          모든 정보(회원정보, 업로드한 플레이리스트)를 복구할 수 없습니다.
        </DialogContent>
        <DialogActions>
          <Button className={classes.cancelBtn} onClick={handleSignOutDialog}>
            취소
          </Button>
          <Button className={classes.signOutBtn} onClick={SignOutHandler}>
            회원탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default index;
