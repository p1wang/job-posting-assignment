import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePosting } from "../redux/postingsSlice";
import UpdatePosting from "./UpdatePosting";

export default function Posting({ posting }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState();

  const handleEdit = (event) => {
    setShowEditForm(true);
    event.stopPropagation();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deletePosting({ id: posting.job_id }));
  };

  return (
    <>
      <UpdatePosting
        posting={posting}
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
      />
      <Card
        border="primary"
        onClick={() => {
          navigate(`/postings/${posting.job_id}`);
        }}
      >
        <Card.Header className="fs-5">{`Company: ${posting.company_name}`}</Card.Header>
        <Card.Body style={{ height: "300px", overflow: "scroll" }}>
          <Card.Title className="pb-2">{posting.title}</Card.Title>
          <Card.Text
            className="px-2 py-1 bg-secondary text-white rounded"
            style={{ width: "fit-content", display: "inline-block" }}
          >{`$${posting.pay_rate}/ hour`}</Card.Text>
          <Card.Text
            className="ms-2 px-2 py-1 bg-secondary text-white rounded"
            style={{ width: "fit-content", display: "inline-block" }}
          >{`${posting.job_type}`}</Card.Text>

          <Card.Text>{posting.short_description}</Card.Text>
          <Card.Text>{posting.job_description}</Card.Text>
        </Card.Body>
        <div className="p-2">
          <small className="d-block text-muted text-end">
            {`Start Date: ${moment(posting.start_date).format("MMMM Do YYYY")}`}
          </small>
        </div>
        <Card.Footer
          className={"d-flex gap-2 align-items-center"}
          style={{ background: "none" }}
        >
          <Button
            onClick={handleEdit}
            variant="outline-info"
            style={{ width: "80px" }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline-danger"
            style={{ width: "80px" }}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}
