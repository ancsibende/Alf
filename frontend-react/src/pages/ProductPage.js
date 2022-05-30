import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ProductPageContainer = styled.div`
  height: 100vh;
  margin: 100px 100px 30px 0;
  background-color: #444;
`;

const ProductPageWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 60px 0;
  position: relative;
`;

const ProductTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 30px;
  color: white;
`;

const ProductPageData = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  color: #B1D0E0;
`;

const ProductPage = (e) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const AxiosGetProduct = async () => {
      
      const serverresponse = await axios.get(
        `http://localhost:8080/api/item/`
      );
      setProduct(serverresponse.data);
      console.log(product.id);
    };

    AxiosGetProduct();
  }, []);

  return (
    <ProductPageContainer>
      <ProductPageWrapper>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPageData>Price: {product.price}$</ProductPageData>
        <ProductPageData>Quantity: {product.quantity}</ProductPageData>
      </ProductPageWrapper>
    </ProductPageContainer>
  );
};

export default ProductPage;
