import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Wellness from "./pages/Wellness";
import HelpSomeone from "./pages/HelpSomeone";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />

          {/* Wellness */}
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/wellness" element={<Wellness />} />

          {/* Support */}
          <Route path="/help-someone" element={<HelpSomeone />} />

          {/* User */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}