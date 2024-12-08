import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import TodoList from "./pages/TodoList";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;
