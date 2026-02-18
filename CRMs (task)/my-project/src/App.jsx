import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DealsDashboard from "./pages/DealsDashboard";
import LeadsDashboard from "./pages/LeadsDashboard";
import ProjectsDashboard from "./pages/ProjectsDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/deals" replace />} />
          <Route path="deals" element={<DealsDashboard />} />
          <Route path="leads" element={<LeadsDashboard />} />
          <Route path="projects" element={<ProjectsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;