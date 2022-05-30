import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductContainer = styled.div`
min-height: 80vh;
background: rgb(2,0,36);
background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;
const ProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;
const ProductsGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 80px;
  max-width: 1750px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
        const AxiosGetProducts = async () => {
        const serverresponse = await axios.get(`http://localhost:8080/api/item/`);
        setProducts(serverresponse.data);
        console.log(serverresponse.data);
      
    };
    AxiosGetProducts();
  }, []);
  return (
    <ProductContainer>
      <ProductWrapper>
        <ProductsGridContainer>
          {products.map((products) => (
            <ProductCard key={products.itemID} product={products} />
          ))}
        </ProductsGridContainer>
      </ProductWrapper>
    </ProductContainer>
  );
};

export default Products;
