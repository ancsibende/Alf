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

const RegContainer = styled.div`
  height: relative;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(4,54,80,1) 0%, rgba(0,212,255,1) 100%);
`;

const RegWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  //background-color: #444;
  color: black;
`;

const RegTitle = styled.p`
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

const RegCard = styled.div`
  background-color: #406882;
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 350px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  border: 0px solid;
  box-shadow: 2px 2px 2px #1A374D;
  padding: 30px 25px 20px 25px;
  border-radius: 15px;
  margin-bottom: 70px;
`;

const RegCardTitle = styled.div`
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

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        username:"",
        password: "",
        confirmpassword: "",
    });

    const handleSubmit = async () => {
        if(formData.password===formData.confirmpassword){
            const newFormData = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            confirmdata: formData.confirmpassword,
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
                    `http://localhost:8080/api/register`,
                    body,
                    config
                );
                clear();
            } catch (error) {
                console.error(error.data);
            }
        }else{
            window.alert("Passwords do not match! Try again");
        }
    };

    const clear = () => {
        setFormData({ email: "", username:"", password: "" , confirmpassword: ""});
    };

    return (
        <RegContainer>
            Register
            <RegWrapper>
                <RegTitle>Register</RegTitle>
                <RegCard>
                    <RegCardTitle>Email:</RegCardTitle>
                    <InputStyle
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        required
                    />
                    <RegCardTitle>Username:</RegCardTitle>
                    <InputStyle
                        type="username"
                        value={formData.username}
                       
                       onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        required
                        
                        
                    />
                    <RegCardTitle>Password:</RegCardTitle>
                    <InputStyle
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        required
                    />
                    <RegCardTitle>Confirm password:</RegCardTitle>
                    <InputStyle
                        type="password"
                        value={formData.confirmpassword}
                        onChange={(e) =>
                            setFormData({ ...formData, confirmpassword: e.target.value })
                        }
                        required
                    />
                    <ButtonHolder>
                        <NiceButton to="/register" onClick={handleSubmit}>
                            Register
                        </NiceButton>
                    </ButtonHolder>
                </RegCard>
            </RegWrapper>
        </RegContainer>
    );
};

export default Register;