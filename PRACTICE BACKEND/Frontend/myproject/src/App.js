
import logo from './logo.svg';
import './App.css';
import Signup from './signup'
import Home from './home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
<BrowserRouter>
<Routes>
<Route path="/register" element={<Signup />}></Route>
<Route path="/home" element={<Home />}></Route>
</Routes>
    </BrowserRouter>    
  );
}

export default App;

