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
      <div className="flex-1">
        <NoSSr>
          <SachinBoy />
        </NoSSr>
      </div>
      <div className="right-0">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
