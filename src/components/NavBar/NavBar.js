import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

import "./NavBar.sass";

function NavBar({
  user,
  handleLogout,
  setSearchTerm,
  handleSearch,
  searchType,
  handleSearchType
}) {
  return (
    <div className="navbar">
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">myFlixDb</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline onSubmit={handleSearch} className="mr-auto ml-auto">
            <FormControl
              id="search-input"
              type="text"
              placeholder={`Search ${searchType.toLowerCase()}...`}
              required={true}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <DropdownButton
              title={searchType}
              id="basic-nav-dropdown"
              variant="light outline-primary"
            >
              {/* <NavDropdown.Item onClick={event => handleSearchType(event)}>
                ALL
              </NavDropdown.Item> */}
              <Dropdown.Item onClick={event => handleSearchType(event)}>
                Movies
              </Dropdown.Item>
              <Dropdown.Item onClick={event => handleSearchType(event)}>
                TV Shows
              </Dropdown.Item>
              {/* <NavDropdown.Item onClick={event => handleSearchType(event)}>
                PEOPLE
              </NavDropdown.Item> */}
            </DropdownButton>
            <Button
              variant="light outline-primary"
              id="search-button"
              type="submit"
            >
              <i className="fa fa-search"></i>
            </Button>
            {/* <Form.Check
              type="checkbox"
              label="Include Adult"
              className="ml-2"
            /> */}
          </Form>
          <Nav.Link href="/movies" id="nav-link">
            MOVIES
          </Nav.Link>
          <Nav.Link href="/shows" id="nav-link">
            TV SHOWS
          </Nav.Link>
          {user ? (
            <DropdownButton
              alignRight
              title={user && user.name.toUpperCase()}
              id="dropdown-menu-align-right"
              variant="link"
            >
              {/* <NavDropdown.Item>PROFILE</NavDropdown.Item> */}
              <NavDropdown.Item href="/collection">COLLECTION</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={handleLogout}>
                LOG OUT
              </NavDropdown.Item>
            </DropdownButton>
          ) : (
            <Nav.Link href="/login" id="nav-link">
              LOG IN
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
