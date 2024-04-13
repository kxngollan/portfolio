// App.js
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import Project from "./components/project/Project";
import Home from "./components/home/Home";
import Footer from "./components/navbar/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
