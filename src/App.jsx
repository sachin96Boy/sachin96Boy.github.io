import BodyComponent from "./components/body-comp/BodyComponent";
import VerticleHeader from "./components/header/VerticleHeader";
import NoSSr from "./components/model/NoSSR";
import SachinBoy from "./components/model/SachinBoy";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="overflow-y-scroll flex-1">
        <SachinBoy />
        <BodyComponent />
      </div>
      <div className="right-0">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
