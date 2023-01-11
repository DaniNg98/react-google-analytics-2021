import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegQuestionCircle } from 'react-icons/fa';
import background from '../img/analyticswp.jpeg';

const InputField = ({ submitViewId }) => {
  const [viewID, setViewID] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitViewId(viewID);
  };
  return (
    <InputRow>
      <form>
        <input
          type='text'
          name='viewid'
          value={viewID}
          onChange={(e) => setViewID(e.target.value)}
          placeholder='Skriv inn viewID'
        />
        <button type='submit' onClick={handleSubmit}>
          Send Inn
        </button>
        <a
          href='https://stackoverflow.com/questions/36898103/what-is-a-viewid-in-google-analytics'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaRegQuestionCircle />
        </a>
      </form>
    </InputRow>
  );
};

export default InputField;

const InputRow = styled.div`
  background-image: url(${background});
  padding-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;

  form {
    border: 1px solid #415159;
    border-radius: 10px;
    background: #415159;
    padding: 50px;
  }

  input {
    line-height: 7vh;
    border-radius: 10px;
    border: 1px solid #4b2f57;
    font-size: 1.5rem;
    width: 15vw;
  }

  button {
    margin: 0 7px 0 20px;
    height: 7vh;
    border-radius: 20px;
    border: 1px solid #4b2f57;
    font-size: 1.5rem;
    background-color: #5b6e85;
    color: #d1d8e0;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
