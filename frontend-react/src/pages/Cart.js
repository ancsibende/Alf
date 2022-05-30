import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bubblegum_pic from "../images/bubble-gum-ico.png";

const CartContainer = styled.div`
  min-height: 80vh;
  background: rgb(2,0,36);  
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;

const CartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const CartTitle = styled.p`
  text-align: center;
  position: relative;
  margin: 100px 0 30px 0;
  font-size: 36px;
  font-weight: 600;
  font-style: italic;
  font-family: courier;
  color: black;
`;

const CartCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 1rem 0;
  width: 650px;
  background: black;
  color: white;
  border: 2px solid black;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  border-radius: 15px;
`;

const Left = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyImage = styled.img`
  max-width: 100%;
  height: auto;
`;
const Right = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  height: 485px;
`;
const RightUp = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductName = styled.h2`
  padding: 20px 20px;
  text-align: center;
`;
const ProductPrice = styled.h3`
  padding: 20px 20px;
  text-align: center;
`;
const RightDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 20px;
`;

const DeleteButton = styled.button`
  background-color: red;
  margin: 10px;
  width: 250px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.2s;
  background-size: 200% auto;
  color: black;
  border-radius: 15px;
  display: block;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 10px #eee;
    cursor: pointer;
  }
`;

const AddToWishList = styled.button`
  background-color: green;
  margin: 10px;
  width: 250px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.2s;
  background-size: 200% auto;
  color: white;
  border-radius: 15px;
  display: block;
  &:hover {
    transform: scale(1);
    box-shadow: 0 0 10px #eee;
    cursor: pointer;
  }
`;

const SumContainer = styled.div`
    background-color: #0f0c24;
    overflow: hidden;
    width: 500px;
    height: 350px;
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    border: 2px solid #7d7c7a;
    box-shadow: 2px 2px 2px #406882;
    padding: 30px 25px 20px 25px;
    border-radius: 15px;
    margin: 50px 0 40px 0;
`;
const SumUp = styled.div`
  padding: 2px 2px;
`;
const Total = styled.h3`
    text-align:center;
    font-size: 20px;
    font-weight: 500;
    color: white;
`;
const SumDown = styled.div`
  padding: 10px 10px;
  justify-content: center;
  display: flex;
`;
const CheckOutButton = styled.button`
    background-color: white;
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.2s;
    background-size: 200% auto;
    color: black;
    box-shadow: 0 0 0px #406882;
    box-shadow: 5px 10px 20px #1A374D;
    border-radius: 15px;
    display: block;
    &:hover {
    transform: scale(1);
    box-shadow: 0 0 10px #eee;
    cursor: pointer;
            }
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const AxiosGetCartItems = async () => {
      var body={
       "token" : localStorage.getItem('actualUser')
      };
      const serverresponse = await axios.post(
        `http://localhost:8080/api/cart/`, body
      );
      setCartItems(serverresponse.data.cartItems);
      console.log(serverresponse.data.cartItems);
      console.log(JSON.stringify(serverresponse.data.cartItems[0].quantity));
    };
    const AxiosGetCartTotal = async () => {
      var body2={"token" : localStorage.getItem('actualUser')};
        const response = await axios.post(
        `http://localhost:8080/api/cart/`, body2
          );
        setCartTotal(response.data.totalPrice);
        localStorage.setItem('cartTotal', response.data.totalPrice);
    };

    AxiosGetCartItems();
    AxiosGetCartTotal();
  }, [cartItems.itemID]);

  const handleProductDelete = async (e) => {
    var token =localStorage.getItem('actualUser');
    console.log(e);
    const response = await axios.delete(
      `http://localhost:8080/api/cart/delete/${JSON.stringify(e)}/${token}`
    );
    window.location.reload();
  };

  const handleAddToWishlist = async (e) => {
    var body3={
      "token": localStorage.getItem('actualUser'),
      "itemID": JSON.stringify(e), 
      "quantity":1
    }
    const response = await axios.post(
      `http://localhost:8080/api/wishlist/add`, body3
    );
  };

  const handleContinue = () => {
    if (cartTotal !== 0) {
      window.location='/order';
    } else {
    }
  };

  return (
    <CartContainer>
      Cart
      <CartWrapper>
        <CartTitle>My Cart</CartTitle>
        {cartItems.map((cartItem, index) => (
          <CartCardContainer key={index}>
            <Left>
              <MyImage src={bubblegum_pic} />
            </Left>
            <Right>
              <RightUp>
                <ProductName>{cartItem.item.name}</ProductName>
                <ProductPrice>Price: {cartItem.item.price}$</ProductPrice>
                <ProductPrice>Quantity: {cartItem.quantity}</ProductPrice>
              </RightUp>
              <RightDown>
                <DeleteButton onClick={(e) => handleProductDelete(cartItem.item.itemID)}>
                  Remove from cart
                </DeleteButton>
                <AddToWishList onClick={(e)=>handleAddToWishlist(cartItem.item.itemID)}>
                  Add to Wishlist
                </AddToWishList>
              </RightDown>
            </Right>
          </CartCardContainer>
        ))}
        
        <SumContainer>
          <SumUp>
            <Total>Total price: {cartTotal.toFixed(2)}$</Total>
          </SumUp>
          <SumDown>
            <CheckOutButton onClick={handleContinue}>Checkout</CheckOutButton>
          </SumDown>
        </SumContainer>
      </CartWrapper>
      
    </CartContainer>
  );
};

export default Cart;
