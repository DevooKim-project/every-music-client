import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Menu } from "@material-ui/core";

import { Context } from "../../context";
import { logout, signOut } from "../../modules/actions";

const Dashboard = ({ dialogOpen, handleDialog }) => {
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false);
  const {
    state: { payload },
  } = useContext(Context);

  const logoutHandler = async () => {
    await logout();
    window.location = "/";
  };

  const signOutDialogHandler = () => {
    // handleDialog();
    setOpenSignOutDialog((prev) => {
      return !prev;
    });
  };

  const signOutHandler = () => {
    signOut().then(() => {
      signOutDialogHandler();
      window.location = "/";
    });
  };
  return (
    <div>
      <Menu
        open={dialogOpen}
        onClose={handleDialog}
        // className={classes.root}
      >
        <DialogContent>
          <button onClick={logoutHandler}>로그아웃</button>
          <button onClick={signOutDialogHandler}>회원탈퇴</button>
        </DialogContent>
      </Menu>
      <Dialog open={openSignOutDialog} onClose={signOutDialogHandler}>
        <DialogContent>test</DialogContent>
        <DialogActions>
          <Button onClick={signOutDialogHandler}>취소</Button>
          <Button onClock={signOutHandler}>회원탈퇴</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
