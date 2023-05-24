import React from "react";
import { Route, Routes } from "react-router-dom";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import Dashboard from "../pages/dashboard/Dashboard";
import Mirrors from "../pages/mirrors/MirrorList";
import { AuthProvider } from 'qreal-auth-provider/src';
import Layout from "./Layout/Layout";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/mirror-list" element={<Mirrors />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );

  // #######################################################################

}
