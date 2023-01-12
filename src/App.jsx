import { Route, Routes } from "react-router";
import BodyComponent from "./components/body-comp/BodyComponent";
import VerticleHeader from "./components/header/VerticleHeader";
import SachinBoy from "./components/model/SachinBoy";
import Sidebar from "./components/sidebar/Sidebar";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <div className="flex h-screen">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <div className="right-0 fixed  z-50">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
