import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavBar.sass";

function NavBar({
  user,
  handleLogout,
  setSearchTerm,
  searchTerm,
  handleSearch
}) {
  return (
    <div className="navbar">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/home" onClick={() => console.log("click")}>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/movies">MOVIES</Nav.Link>
            <Nav.Link href="/shows">TV SHOWS</Nav.Link>
            {user ? <Nav.Link href="/collection">COLLECTION</Nav.Link> : null}
          </Nav>
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search your flick..."
              className="mr-sm-2"
              required={true}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {/* <Button variant="outline-light">Search</Button> */}
          </Form>
          <Nav>
            {user ? (
              <>
                <Nav.Link href="/home" onClick={handleLogout}>
                  LOGOUT
                </Nav.Link>
                <Nav.Link>{user.name.toUpperCase()}</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">LOGIN</Nav.Link>
                <Nav.Link href="/signup">SIGNUP</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
