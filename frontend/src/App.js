import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Busca from "./Pages/Busca";
import Cadastro from "./Pages/Cadastro";
import NotFound from "./Pages/NotFound";
import Alteracao from "./Pages/Alteracao";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Busca" element={<Busca />} />
          <Route path="/Busca/:id" element={<Busca />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Alteracao/:id" element={<Alteracao />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
