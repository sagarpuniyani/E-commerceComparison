import React , {Suspense} from 'react';
import './App.css';
import { Container } from '@mui/material';
const  Searchdata =  React.lazy(() => import('./modules/searchData/pages/Searchdata'));

function App() {
  return (
    <>
    <Container >
      <Suspense >
      <Searchdata />
      </Suspense>
    </Container>
    </>
  );
}

export default App;
