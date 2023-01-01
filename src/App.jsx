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
        <h1>sidebar-right</h1>
      </div>
    </div>
  );
}

export default App;
