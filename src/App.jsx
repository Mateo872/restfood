import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Administrador from "./pages/Administrador";

function App() {    
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio></Inicio>}/>
            <Route path="/administrador" element={<Administrador></Administrador>}/>
            
        </Routes>
    </BrowserRouter>
  );
}

export default App;
