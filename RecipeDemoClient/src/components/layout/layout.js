import React from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./layout.scss";

export const Layout = () => {
  return (
    <>
      <Navbar bg="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand><Link to={"/"} className="custom-navbar-brand">Recipe Demo Application</Link></Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5 custom-container">
        <Outlet />
      </Container>
    </>
  );
};
