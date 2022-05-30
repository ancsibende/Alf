import React, { useState, useId } from "react";
import styled from "styled-components";
import bubblegum_pic from "../images/bubble-gum-ico.png";
import { AiOutlineDelete, AiOutlineMore, AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  width: 250px;
  height: 400px;
  background: black;
  margin: auto;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  color: #edf7d2;
  &:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Top = styled.div`
  height: 80%;
  width: 100%;
  background: url(${bubblegum_pic}) no-repeat center center;
  background-size: 100%;
`;
const Bottom = styled.div`
  width: 100%;
  height: 20%;
  transition: transform 0.5s;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const BottomLeft = styled.div`
  height: 100%;
  width: 40%;
  background-color: #0f0c24;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const BottomRight = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #0f0c24;
  color: white;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Name = styled.h3`
  margin: 0;
  padding: 0 0 0 10px;
`;
const Price = styled.p`
  margin: 0;
  padding: 0 0 0 10px;
`;
const Image =styled.img`

`;

const ShoppingCart = styled(AiOutlineShoppingCart)`
  width: 30px;
  height: 30px;
  color: #f8e71c;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    color: #edf7d2;
  }
`;

const WishList = styled(AiOutlineHeart)`
  width: 30px;
  height: 30px;
  color: #e9a8c3;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    color: #edf7d2;
  }
`;

const Delete = styled(AiOutlineDelete)`
  width: 50px;
  height: 50px;
  color: #6e6d6b;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    color: #edf7d2;
  }
`;

const Modify = styled(AiOutlineMore)`
  width: 50px;
  height: 50px;
  color: #6e6d6b;
  cursor: pointer;
  padding: 5px;
  margin-right: 5px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    color: #edf7d2;
  }
`;

const InputStyle = styled.input`
  width: 50px;
  padding: 2px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

const ProductCard = ({ product }) => {
  const [quantityForm, setData] = useState({
    quantity: '1'
  });
  const id = useId(); 

  const handleDeleteProduct = async() =>{
    const response = await axios.delete(
        `http://localhost:8080/api/item/delete/${product.itemID}`
      );
      window.location.reload();
  };

  const handleModifyProduct = async() =>{
      var config = {
        headers:{'Content-Type': 'application/json; charset=utf-8'}
      };
      localStorage.setItem('modifyItemID', product.itemID);
      window.location ='/modify';
  };

  const handleAddToCart = async () => {
    var body={
      "token": localStorage.getItem('actualUser'),
      "itemID": product.itemID,
      "quantity": quantityForm.quantity
     };
    const response = await axios.post(
      `http://localhost:8080/api/cart/add`,
      body
    );
   localStorage.setItem("itemIDCart", response.productId);
  };
  const handleAddToWishlist = async () => {
    var body2={
      "token": localStorage.getItem('actualUser'),
      "itemID": product.itemID, 
      "quantity":1
    };
    
    const response = await axios.post(
     `http://localhost:8080/api/wishlist/add`,
      body2 
    );
    localStorage.setItem("itemIDWishlist", product.itemID);
  };

  let history = useNavigate();

  const handleNameClick = (e) => {
    history.push({
      pathname: "/product",
      state: {
        id: e,
      },
    });

  };

  if(localStorage.getItem('actualRole')!=="ADMIN"){
    return (
    <CardContainer>
      <CardWrapper>
        <Top onClick={(e) => handleNameClick(product.productId)}></Top>
        <Bottom>
          <BottomLeft>
            <Details>
              <Name>{product.name}</Name>
              <Image>{product.img}</Image>
              <Price>{product.price}$</Price>
            </Details>
          </BottomLeft>
          <BottomRight>
            <InputStyle
                id={id}
                type="number"
                onChange={(e) => 
                  setData({ ...quantityForm, quantity: e.target.value })
                }
                defaultValue="1"
                keyboardType="numeric"
            />
            <ShoppingCart onClick={handleAddToCart} />
            <WishList onClick={handleAddToWishlist} />
          </BottomRight>
        </Bottom>
      </CardWrapper>
    </CardContainer>
  );
  }else{
    return(
    <CardContainer>
      <CardWrapper>
        <Top onClick={(e) => handleNameClick(product.productId)}></Top>
        <Bottom>
          <BottomLeft>
            <Details>
              <Name>{product.name}</Name>
              <Image>{product.img}</Image>
              <Price>{product.price}$</Price>
            </Details>
          </BottomLeft>
          <BottomRight>
            <Delete onClick={handleDeleteProduct} />
            <Modify onClick= {handleModifyProduct} />
          </BottomRight>
        </Bottom>
      </CardWrapper>
    </CardContainer>
    );
  }
  
};

export default ProductCard;
