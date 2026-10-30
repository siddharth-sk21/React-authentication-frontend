import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <div>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  <Route element={<ProtectedRoute />}>
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>
    </div>
  );
}

export default App;