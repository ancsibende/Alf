import React from "react";
import styled from "styled-components";
import bear from "../images/bubblebear.png";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  height: 100vh;
  background: rgb(2,0,36);  
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;
const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const HImage =styled.img`
  position: absolute;
  top: 5%;
  left: 60%;
  height: 90vh;
  overflow-x: hidden;
  overflow: hidden;
`;

const HomeContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100% - 100px);
  color: white;

  h1 {
    font-size: clamp(1rem, 8vw, 2rem);
    font-weight: 400;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px black, 0 0 25px lightblue, 0 0 5px lightblue;
    text-align: left;
    margin-bottom: 0.8rem;
  }

  p {
    margin-bottom: 1.2rem;
    text-shadow: 1px 1px 2px black, 0 0 25px lightblue, 0 0 5px lightblue;
  }
`;

const MyButton = styled(Link)`
  white-space: nowrap;
  outline: none;
  border: none;
  min-width: 100px;
  max-width: 200px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  color: #B1D0E0;
  font-size: 20px;
  background-color: #406882;
  color: palegoldenrod;

  &:hover {
    transform: scale(1);
    box-shadow: 0 0 20px #eee;
    cursor: pointer;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeWrapper>
      <HImage src={bear} alt={"bear"} />
        <HomeContent>
          <h1>The teacher growls at Little Johnny, </h1>
          <h1>“Is that bubble gum in your mouth?! </h1>
          <h1>In the trash can! Right now!”</h1>
          <h3>Little Johnny, “The bubble gum too?”</h3>
          <MyButton to="/products">Order Now</MyButton>
        </HomeContent>
      </HomeWrapper>
    </HomeContainer>
  )
};

export default Home;
