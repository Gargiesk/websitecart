import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateDetails from "./pages/TemplateDetails";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Request from "./pages/Request";



export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template/:id" element={<TemplateDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
// to login in admin http://localhost:5173/login
// later on https://websitecart.onrender.com