import { Navigate } from "react-router-dom";
import { useAuth } from "./assets/Components/context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
