import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const NiceButton = styled.button`
  background-color: white;
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.2s;
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px #406882;
  box-shadow: 5px 20px 30px #1A374D;
  border-radius: 15px;
  display: block;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 20px #eee;
    cursor: pointer;
  }
`;

const ModContainer = styled.div`
  height: 100vh;
  background: rgb(2,0,36);  
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;

const ModifyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const ModifyTitle = styled.p`
  text-align: center;
  position: relative;
  font-size: 40px;
  font-weight: 600;
  font-style: italic;
  color: black;
`;

const ButtonHolder = styled.div`
  justify-content: center;
  display: flex;
`;

const ModifyCard = styled.div`
  background-color: #406882;
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 150px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  border: 0px solid;
  box-shadow: 2px 2px 2px #1A374D;
  padding: 30px 25px 20px 25px;
  border-radius: 15px;
`;

const ModifyCardTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
`;

const InputStyle = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

const Modify = () => {
  const [formData, setFormData] = useState({
    price: "",
  });

  const handleSubmit = async () => {

    try {
      var config = {
        headers:{'Content-Type': 'application/json; charset=utf-8'}
      };
      var token = localStorage.getItem('modifyItemID');
      var price = formData.price
      const response = await axios.put(
        `http://localhost:8080/api/item/update/${token}`,price,config
      );

      clear();
      window.location = '/products';
    } catch (error) {
      console.error(JSON.stringify(error.data));

    }
  };

  const clear = () => {
  setFormData({ price:""});
};

return (
    <ModContainer>
      Modify
      <ModifyWrapper>
        <ModifyTitle>Modify</ModifyTitle>       
        <ModifyCard>
          <ModifyCardTitle>Price:</ModifyCardTitle>
          <InputStyle
              type="number"
              value={formData.price}
              onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
              }
              required
          />
          <ButtonHolder>
            <NiceButton to="/login" onClick={handleSubmit}>
              Modify price
            </NiceButton>
          </ButtonHolder>
        </ModifyCard>
      </ModifyWrapper>
    </ModContainer>
);
};

export default Modify;
