import { Navigate, Route, Routes } from "react-router-dom";
import MyProjects from "../body-comp/MyProjects";
import ProjElements from "../body-comp/ProjElements";

function PortFolio() {
  return (
    <Routes>
      <Route path="project/:id" element={<ProjElements />} />
      <Route index element={<MyProjects titleAs="h1" />} />
      <Route path="*" element={<Navigate to="/portfolio" replace />} />
    </Routes>
  );
}

export default PortFolio;
