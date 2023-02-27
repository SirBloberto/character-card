import React from 'react';
import styled from 'styled-components';
import CharacterInput from './components/CharacterInput';

const StyledMain = styled.main`
    margin: auto;
    padding: 2rem;
    padding-top: 5rem;
    max-width: 1200px;
`;

const App = () => {
  return (
    <StyledMain>
      <CharacterInput/>
    </StyledMain>
  );
}

export default App;
