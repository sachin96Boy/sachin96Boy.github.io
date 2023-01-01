import VerticleHeader from "./components/header/VerticleHeader";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <h1>main</h1>
      </div>
      <div className="right-0">
        <VerticleHeader />
      </div>
    </div>
  );
}

export default App;
