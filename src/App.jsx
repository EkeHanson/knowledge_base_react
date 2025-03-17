import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Footer from "./components/Footer";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import CreatePost from "./components/Pages/CreatePost";
import PostDetail from "./components/Pages/PostDetail";
import Dashboard from "./components/Pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Post Detail Page */}
        <Route path="/post/:id" element={<PostDetail />} />

        {/* Create Post Page */}
        <Route path="/create-post" element={<CreatePost />} />

        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Dashboard Configurator */}
   
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;