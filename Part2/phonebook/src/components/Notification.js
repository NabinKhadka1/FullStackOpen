import React from "react";

const Notification = ({ message, onClose }) => {
  if (message === "") {
    return "";
  } else {
    return (
      <div className="success">
        <p>{message} to phonebook</p>
      </div>
    );
  }
};

export default Notification;
