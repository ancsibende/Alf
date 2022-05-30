import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const NiceButton = styled.button`
  background-color: white;
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.2s;px #1A374D;
  border-radius: 15px;
  display: block;
  &:hover {
    transform: scale(1);
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px #406882;
  box-shadow: 5px 20px 30
    box-shadow: 0 0 20px #eee;
    cursor: pointer;
  }
`;

const AddContainer = styled.div`
  height: relative;
  background: rgb(2,0,36);  
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;


const AddWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const AddTitle = styled.p`
    text-align: center;
    position: relative;
    margin: 30px 0 30px 0;
    font-size: 36px;
    font-weight: 600;
    font-style: italic;
    font-family: courier;
    color: black;
`;

const ButtonHolder = styled.div`
  justify-content: center;
  display: flex;
`;

const AddCard = styled.div`
  background-color: #406882;
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 250px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  border: 0px solid;
  box-shadow: 2px 2px 2px #1A374D;
  padding: 30px 25px 20px 25px;
  border-radius: 15px;
`;

const AddCardTitle = styled.div`
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

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: ""
    });

    const handleSubmit = async () => {
        
        const newFormData = {
            name: formData.name,
            price: formData.price,
            quantity: 0
        };
            
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = JSON.stringify(newFormData);
                console.log(JSON.stringify(body));
                const response = await axios.post(
                    `http://localhost:8080/api/item/add`,
                    body,
                    config
                );
                console.log(response.data);
                
                clear();
            } catch (error) {
                console.error(error.data);
            }
    };

    const clear = () => {
        setFormData({ name: "", imageURL:"", price: ""});
    };

    return (
        <AddContainer>
            Add Product
            <AddWrapper>
                <AddTitle>Add Product</AddTitle>
                <AddCard>
                    <AddCardTitle>Product name:</AddCardTitle>
                    <InputStyle
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />

                    <AddCardTitle>Price:</AddCardTitle>
                    <InputStyle
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                        }
                        required
                    />
                    <ButtonHolder>
                        <NiceButton to="/product" onClick={handleSubmit}>
                            Add Product
                        </NiceButton>
                    </ButtonHolder>
                </AddCard>
            </AddWrapper>
        </AddContainer>
    );
};

export default AddProduct;