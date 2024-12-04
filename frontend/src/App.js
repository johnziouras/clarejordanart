import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Artwork from "./pages/Artwork";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Publications from "./pages/Publications";
import Update from "./pages/Update";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/updateArtwork" element={<Update />} />
            <Route path="/artwork" element={<Artwork type="artwork" />} />
            <Route path="/albums" element={<Artwork type="album" />} />
            <Route
              path="/photography"
              element={<Artwork type="photograph" />}
            />
            <Route path="/publications" element={<Publications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
