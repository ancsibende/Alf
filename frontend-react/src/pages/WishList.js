import React,{useEffect,useState} from "react";
import styled from "styled-components";
import bubblegum_pic from "../images/bubble-gum-ico.png";
import axios from 'axios';

const WishContainer = styled.div`
  min-height: 100vh;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;

const WishWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  //background-color: #406882;
  color: white;
`;

const WishlistTitle = styled.p`
  text-align: center;
  position: relative;
  margin: 100px 0px 30px 0;
  font-size: 36px;
  font-weight: 600;
  font-style: italic;
  font-family: courier;
  color: black;
`;

const WishCardContainer = styled.div`
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



const WishList = () => {
  const [wishItems, setWishItems] = useState([]);
  
  useEffect(() => {
    const AxiosGetWishItems =  async () => {
       var body={"token" : localStorage.getItem('actualUser')};      
       console.log(body);
        const serverresponse = await axios.post(`http://localhost:8080/api/wishlist/`,body);
        setWishItems(serverresponse.data.cartItems);
     };
    AxiosGetWishItems();
  },[wishItems.itemID]);
  
  const handleProductDelete = async (e) => {
    var token= localStorage.getItem('actualUser');
    const response = await axios.delete(`http://localhost:8080/api/wishlist/delete/${JSON.stringify(e)}/${token}`);
    window.location.reload();
  }

  return (
    <WishContainer>
      Wishlist
      <WishWrapper> 
        <WishlistTitle>My Wishlist</WishlistTitle>

         {wishItems.map((wishItem,index) => (
          <WishCardContainer key={index}>
            <Left>
              <MyImage src={bubblegum_pic} />
            </Left>
            <Right>
              <RightUp>
                <ProductName>{wishItem.item.name}</ProductName>
                <ProductPrice>Price: {wishItem.item.price}$</ProductPrice>
              </RightUp>
              <RightDown>
                <DeleteButton onClick={e => handleProductDelete(wishItem.item.itemID)} >
                  Remove from WishList
                </DeleteButton>
              </RightDown>
            </Right>
          </WishCardContainer>
        ))}
        
      </WishWrapper>
      
    </WishContainer>
  );
};

export default WishList;


