import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Read from "./Pages/Read";
import Create from "./Pages/Create";
import NotFound from "./Pages/NotFound";
import Update from "./Pages/Update";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Read" element={<Read />} />
          <Route path="/Read/:id" element={<Read />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Update/:id" element={<Update />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
