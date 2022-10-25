import React from "react";
import AppBar from "./AppBar";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Container className="my-5">{children}</Container>
    </>
  );
}
