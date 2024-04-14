import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddProject from "./components/AddProject/AddProject";
import ListProduct from "./components/ListProjects/ListProjects";
import "./App.css";
import Login from "./components/login/Login";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/dashboard",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: <AddProject />,
      },
      {
        path: "list",
        element: <ListProduct />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
