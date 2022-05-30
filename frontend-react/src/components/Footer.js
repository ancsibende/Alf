import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #1A374D;
  display: flex;
  flex-direction: column;
  color: #AAEBF2;
  font-family: "Poppins", sans-serif;
`;

const Text = styled.h4`
  padding-left: 20px;
  padding-bottom: 5px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Text>Creators: Team Bubblegum - ALF - 2022</Text>
    </FooterContainer>
  );
};

export default Footer;
