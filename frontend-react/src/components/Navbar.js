import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1A374D;
`;
const NavLogo = styled(Link)`
  color: #B1D0E0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%auto;
  cursor: pointer;
  text-decoration: none;
  font-style: oblique;
  flex: 1;
  margin-left: 25px;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 32px;
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const NavMenuLink = styled(Link)`
  color: #B1D0E0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  height: 60px;
  &:hover {
    background-color: #406882;
    color: white;
    border-bottom: 4px solid white;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user=localStorage.getItem('actualUser');
  const [isAdminLoggedIn,setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    if((localStorage.getItem('actualUser')) && localStorage.getItem('actualUser')!=="undefined") {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }

    if(localStorage.getItem('actualRole')==="ADMIN"){
      setIsAdminLoggedIn(true);
    }else{
      setIsAdminLoggedIn(false);
    }
    console.log(user);
  }, [user]);

  
  console.log(JSON.stringify(isLoggedIn));
  const handleLogout = () => {
    localStorage.clear();
    window.navigate("/");
    window.location.reload();
  }

  return (
    <Nav>
      <NavLogo to="/">
        Bubblegum Webshop
      </NavLogo>
        <NavMenu>
        {isLoggedIn
        ?
        <NavMenuLink to="/products">Products</NavMenuLink>
        :
        <React.Fragment></React.Fragment>
        }
        
        
        {isAdminLoggedIn 
        ?
        <NavMenuLink to ="/addproduct">
             Add Product
        </NavMenuLink>
        :
         <React.Fragment></React.Fragment>
         }

        {isLoggedIn 
        ?
        <React.Fragment></React.Fragment>
        :
        <NavMenuLink to ="/register">
             Register
        </NavMenuLink> 
         }

         {isLoggedIn&&!isAdminLoggedIn
        ?
        <NavMenuLink to ="/cart">
             Cart
        </NavMenuLink> 
        :
        <React.Fragment></React.Fragment>
         }
         </NavMenu>
         {isLoggedIn&&!isAdminLoggedIn 
        ?
        <NavMenuLink to ="/wishlist">
             WishList
        </NavMenuLink>  
        :
        <React.Fragment></React.Fragment>
         }
         {isLoggedIn 
        ?
        <NavMenuLink to="/" onClick={handleLogout}>
          Logout
        </NavMenuLink> 
        :
        <NavMenuLink to ="/login">
             LogIn
        </NavMenuLink> 
         }
        
       {}
      
    </Nav>
  );
};

export default Navbar;
