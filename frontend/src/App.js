import React  from 'react';
import './App.css';
import { Container } from '@mui/material';
// const  Searchdata =  React.lazy(() => import('./modules/searchData/pages/Searchdata'));
import Searchdata from './modules/searchData/pages/Searchdata';

function App() {
  return (
    <>
    <Container >
      {/* <Suspense >
      </Suspense> */}
      <Searchdata />
    </Container>
    </>
  );
}

export default App;
