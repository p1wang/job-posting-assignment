import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button
            onClick={() => {
              navigate("/create");
            }}
            className="m-2"
          >
            Create Post
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
