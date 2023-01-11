import React from 'react';
import styled from 'styled-components';
import { signOut } from '../GoogleAuth/authUtils';

const Container = styled.div`
  background: #415159;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;

  h1 {
    padding-left: 20px;
    color: #d1d8e0;
  }

  .signout {
    padding-right: 20px;
    color: #e0d5d1;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <Container>
      <h1>Prosjekt D</h1>
      <div className='signout' onClick={signOut}>
        LOGG UT
      </div>
    </Container>
  );
};

export default Header;
