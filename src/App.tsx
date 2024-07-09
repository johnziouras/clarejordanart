import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import ArtPage from "./pages/ArtPage/ArtPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import HomePage from "./pages/HomePage/HomePage";
import PubPage from "./pages/PubPage/PubPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paintings" element={<ArtPage />} />
        <Route path="/photography" element={<ArtPage />} />
        <Route path="/watercolors" element={<ArtPage />} />
        <Route path="/publications" element={<PubPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
