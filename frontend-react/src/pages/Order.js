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
  height: 100%;
  display: block;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 20px #eee;
    cursor: pointer;
  }
`;

const OrderContainer = styled.div`
  min-height: 100%;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;

const OrderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const OrderTitle = styled.p`
    text-align: center;
    position: relative;
    margin: 100px 0 30px 0;
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

const OrderCard = styled.div`
  background-color: #406882;
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 110vh;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  border: 0px solid;
  box-shadow: 2px 2px 2px #1A374D;
  padding: 30px 25px 20px 25px;
  border-radius: 15px;
  margin-bottom: 5vh;
`;

const OrderCardTitle = styled.div`
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

const Order = () => {
    const [formData, setFormData] = useState({
        surname: "",
        name:"",
        houseNumber: "",
        city:"",
        country:"",
        zipcode:"",
        street:"",
        totalPrice: ""  
     });

    const handleSubmit = async () => {
        if(formData.name!==""&&formData.houseNumber!==""&&formData.city!==""&&formData.country!==""){
            var body = {
                "surname": formData.surname,
                "name": formData.name,
                "city": formData.city,
                "country": formData.country,
                "houseNumber:": formData.houseNumber,
                "zipcode": formData.zipcode,
                "street": formData.street,
                "totalPrice": localStorage.getItem('cartTotal')
            };
            
            try {
                var token=localStorage.getItem('actualUser');
                console.log(body);
                console.log(token);
                const response = await axios.post(
                    `http://localhost:8080/api/order/add/${token}`,
                    body
                );
                clear();
                window.location='/products';
            } catch (error) {
                console.error(error.data);
            }
        }else{
            window.alert("Order failed, missing arguments!");
        }
    };

    const clear = () => {
        setFormData({ surname: "", name:"", city: "" , country: "",zipcode:"", street:"", houseNumber:""});
    };

    return (
        <OrderContainer>
            Checkout   
            <OrderWrapper>
                <OrderTitle>Checkout</OrderTitle>
                <OrderCard>
                    <OrderCardTitle>Surname:</OrderCardTitle>
                    <InputStyle
                        type="text"
                        value={formData.surname}
                        onChange={(e) =>
                            setFormData({ ...formData, surname: e.target.value })
                        }
                        required
                    />
                    <OrderCardTitle>First name:</OrderCardTitle>
                   < InputStyle
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        required
                    />
                    <OrderCardTitle>Country:</OrderCardTitle>
                    <InputStyle
                        type="text"
                        value={formData.country}
                       
                       onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                        }
                        required

                    />
                    <OrderCardTitle>City:</OrderCardTitle>
                    <InputStyle
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                        }
                        required
                    />
                    <OrderCardTitle>Zipcode:</OrderCardTitle>
                    <InputStyle
                        type="number"
                        value={formData.zipcode}
                        onChange={(e) =>
                            setFormData({ ...formData, zipcode: e.target.value })
                        }
                        required
                    />
                    <OrderCardTitle>Street:</OrderCardTitle>
                    <InputStyle
                        type="text"
                        value={formData.street}
                        onChange={(e) =>
                            setFormData({ ...formData, street: e.target.value })
                        }
                        required
                    />
                    <OrderCardTitle>House number:</OrderCardTitle>
                    <InputStyle
                        type="number"
                        value={formData.houseNumber}
                        onChange={(e) =>
                            setFormData({ ...formData, houseNumber: e.target.value })
                        }
                        required
                    />
                    
                    <ButtonHolder>
                        <NiceButton to="/register" onClick={handleSubmit}>
                            Order
                        </NiceButton>
                    </ButtonHolder>
                </OrderCard>
            </OrderWrapper>
        </OrderContainer>
    );
};

export default Order;