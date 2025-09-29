import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

//COMPONENTS
import Navbar from "./components/Navbar";
import Noteform from "./components/Noteform";
//PAGES
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="bg-gray-800 h-[100vh] w-[101vw]">
        <BrowserRouter>
          <Navbar />
          <div className="Pages">
            <Routes>
              <Route path="/" element={<Noteform />} />
              <Route path="/notes" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
