import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';

import Error from './components/Errors/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={ <Home /> } ></Route>
          <Route path="*" element={ <Error /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
