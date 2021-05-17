import React, { useState } from "react";
import { updatePlaylistOptions } from "../../modules/actions";
import Modal from "../Common/Modal";

const UpdateForm = ({ playlist, setPlaylist, openUpdate, openUpdateHandler }) => {
  const [update, setUpdate] = useState(playlist);
  const { title, description, visible } = update;

  const updatePlaylistHandler = () => {
    updatePlaylistOptions(update).then((response) => {
      setPlaylist((prev) => {
        return { ...prev, ...response.playlist };
      });
      openUpdateHandler();
    });
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
    <>
      <Modal
        open={openUpdate}
        successHandler={updatePlaylistHandler}
        successText={"save"}
        close={openUpdateHandler}
        header="Update Playlist"
      >
        <h3>This is Edit</h3>
        <input name="title" placeholder={title} onChange={onChange} value={title} />
        <p></p>
        <input
          name="description"
          placeholder={description}
          onChange={onChange}
          value={description}
        />
        <p></p>
        <input
          type="radio"
          name="visible"
          onChange={onRadioChange}
          checked={visible === "public" || visible}
          value={"public"}
        />
        <div>public</div>
        <input
          type="radio"
          name="visible"
          onChange={onRadioChange}
          checked={visible === "private" || !visible}
          value={"private"}
        />
        <div>private</div>
      </Modal>
    </>
  );
};

export default UpdateForm;
