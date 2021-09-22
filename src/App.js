import "./App.css";
import Table from "./components/Table";
import JSONData from "./data";

function App() {
  return (
    <div className="App">
      <Table JSONData={JSONData} />
    </div>
  );
}

export default App;
