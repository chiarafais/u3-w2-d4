import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import SubNavbar from "./components/SubNavbar";
import MyFooter from "./components/MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gallery from "./components/Gallery";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <SubNavbar />
        <Routes>
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Homepage" element={<Homepage />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
