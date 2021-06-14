import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const MoreButton = ({ updateModalHandler, deleteModalHandler }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menu) => {
    setAnchorEl(null);
    if (menu === "Edit") {
      updateModalHandler();
    }
    if (menu === "Delete") {
      deleteModalHandler();
    }
  };
  return (
    <div>
      <IconButton aria-label="more" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon style={{ color: "white" }} />
      </IconButton>
      <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose("Edit");
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Delete");
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MoreButton;
