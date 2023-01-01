import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <div>
        <Sidebar />
      </div>
      <div>
        <h1>main</h1>
      </div>
      <div>
        <h1>sidebar-right</h1>
      </div>
    </div>
  );
}

export default App;
