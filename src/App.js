import React, { useState, useEffect } from 'react';
import './App.css';
import { renderButton, checkSignedIn } from './GoogleAuth/authUtils';
import styled from 'styled-components';
import Dashboard from './Dashboard/dashboard';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load('auth2', init);
  });

  return (
    <div className='div'>
      {!isSignedIn ? (
        <>
          <FormContainer>
            <Title>Prosjekt D Analytics</Title>
            <ButtonContainer>
              <div id='signin-button'></div>
            </ButtonContainer>
          </FormContainer>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;

const FormContainer = styled.div`
  height: 60vh;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #415159;
  border-radius: 30px;
  background: hsl(200, 16%, 30%);
  width: 420px;
  height: 300px;
  margin-top: 270px;
`;

const ButtonContainer = styled.div`
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
