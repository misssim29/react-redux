import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/:id" element={<Detail />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
