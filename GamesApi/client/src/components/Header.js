import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const baseURL = "http://localhost:3001/api";
  
  const fetch = () => {
     const token =  localStorage.getItem("token")
    axios
      .get(baseURL + "/account/admin", {validateStatus: (num) => num >= 200,headers: {
        authorization: `Bearer ${JSON.parse(token)}`,   
      }})
      .then((response) => {
        if(response.status === 200)
        {
            console.log(response.data);
            setIsAdmin(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetch();
    
  }, []);

  const handleDisconnect = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img src="../../logo2.png" style={{ width: 100,height:70 }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard" style={{color:'#fff',fontSize:25}}>Home</Nav.Link>
            {isAdmin && <Nav.Link href="/manager" style={{color:'#fff',fontSize:25}}>Management</Nav.Link>}
            <Nav.Link href="/cart" style={{color:'#fff',fontSize:25}}>Cart</Nav.Link>
          </Nav>
          
          <Button
            style={{ marginLeft: 10 }}
            onClick={handleDisconnect}
            variant="outline-info"
          >
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
