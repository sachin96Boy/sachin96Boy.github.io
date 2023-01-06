import BodyComponent from "./components/body-comp/BodyComponent";
import VerticleHeader from "./components/header/VerticleHeader";
import SachinBoy from "./components/model/SachinBoy";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <SachinBoy />
        <BodyComponent />
      </div>
      <div className="right-0 fixed z-50">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
