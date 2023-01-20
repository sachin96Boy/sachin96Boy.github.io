import { Navigate, Route, Routes } from "react-router";

import VerticleHeader from "./components/header/VerticleHeader";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./components/pages/HomePage";
import Services from "./components/pages/Services";
import WorkHistory from "./components/pages/WorkHistory";
import Contact from "./components/pages/Contact";
import NotFoundPage from "./components/body-comp/NotFoundPage";

function App() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row h-screen">
      <div className="fixed  z-50 overflow-auto">
        <Sidebar />
      </div>
      <div className="flex flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workhistory" element={<WorkHistory />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
      <div className="right-0 fixed  z-50">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
