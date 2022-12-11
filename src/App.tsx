import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/DashboardPage/Dashboard";
import FormPage from "./pages/FormPage/FormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:userId/edit" element={<FormPage />} />
        <Route path="/addUser" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
