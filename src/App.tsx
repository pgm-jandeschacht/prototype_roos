import React from 'react';
import { Home } from './pages';
import GlobalStyle from './globalStyle';

function App() {
  return (
      <>
        <GlobalStyle />
        
        <div className="App">
            <Home/>
        </div>
      </>
  );
}

export default App;
