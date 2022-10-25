import React from "react";
import { Modal } from "react-bootstrap";

import CreatePost from "./CreatePost";

const UpdatePosting = ({ posting, showEditForm, setShowEditForm }) => {
  return (
    <Modal centered show={showEditForm} onHide={() => setShowEditForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreatePost
          posting={posting}
          isUpdate={true}
          setShowEditForm={setShowEditForm}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePosting;
