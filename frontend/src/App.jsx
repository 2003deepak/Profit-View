import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Page404 from "./Pages/Page404";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute"; 
import authStore from "./store/authStore"; // Zustand state for user authentication

function App() {

  const { role } = authStore((state) => state);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>

        <Route path="about" element={<About />} />

      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout role={role} />}>
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Add more role-based protected routes here */}
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;