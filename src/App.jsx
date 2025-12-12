import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemList from "./components/ItemList.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TestPage from "./pages/TestPage.jsx";

export default function App() {
  const storedUser = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex justify-center items-start p-10">
      <Routes>
        <Route
          path="/"
          element={storedUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/todos"
          element={storedUser ? <ItemList /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={storedUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/login"
          element={storedUser ? <Navigate to="/" /> : <LoginPage />}
        />
        
        <Route
          path="/test"
          element={<TestPage/>}
        />
      </Routes>
    </div>
  );
}
