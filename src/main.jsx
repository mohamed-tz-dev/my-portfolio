import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProjectDetails from "./pages/ProjectDetails";


import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "projects/:id", element: <ProjectDetails /> },

    ],
  },
]);
children: [
  { index: true, element: <Home /> },
  { path: "projects", element: <Projects /> },
  { path: "projects/:id", element: <ProjectDetails /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
],

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
