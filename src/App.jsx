import { Route, Routes } from "react-router";
import BodyComponent from "./components/body-comp/BodyComponent";
import VerticleHeader from "./components/header/VerticleHeader";
import SachinBoy from "./components/model/SachinBoy";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./components/pages/HomePage";
import Services from "./components/pages/Services";
import WorkHistory from "./components/pages/WorkHistory";

function App() {
  return (
    <div className="flex h-screen">
      <div className="fixed z-50 hidden md:block lg:block">
        <Sidebar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/workhistory" element={<WorkHistory />} />
        </Routes>
      </div>
      <div className="right-0 fixed  z-50">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
