import { Navigate, Route, Routes } from "react-router";
import { useState } from "react";

import VerticleHeader from "./components/header/VerticleHeader";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./components/pages/HomePage";
import Services from "./components/pages/Services";
import WorkHistory from "./components/pages/WorkHistory";
import Contact from "./components/pages/Contact";
import PortFolio from "./components/pages/PortFolio";
import Header from "./components/Header";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen font-roboto">
      <div
        className={
          isDark
            ? "fixed  z-50 overflow-auto bg-slate-900"
            : "fixed  z-50 overflow-auto"
        }
      >
        <Sidebar isDark={isDark} setIsDark={setIsDark} />
      </div>
      <div className="flex w-full lg:hidden">
        <Header />
      </div>
      <div className="flex flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio/*" element={<PortFolio />} />
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
