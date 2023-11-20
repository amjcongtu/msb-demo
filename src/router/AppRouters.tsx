import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { AuthProvider } from "../context/authContext";
import { Layout } from "../components/Layout";
import AuthRouter from "./AuthRouter";

const AppRouters = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<AuthRouter />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};
export default AppRouters;
