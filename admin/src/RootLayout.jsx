import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";

const RootLayout = () => {
  return (
    <ProtectedRoute>
      <main>
        <Sidebar />
        <Outlet />
      </main>
    </ProtectedRoute>
  );
};

export default RootLayout;
