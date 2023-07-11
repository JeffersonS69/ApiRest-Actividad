import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PatientsPage } from "./pages/PatientsPage";
import { PatientsFormPage } from "./pages/PatientsFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import DiagnosesFormPage from "./pages/DiagnosesFormPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Navigate to="/patients" />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients-create" element={<PatientsFormPage />} />
          <Route path="/patients/:id" element={<PatientsFormPage />} />
          <Route path="/diagnoses-create" element={<DiagnosesFormPage/>}/>
          <Route path="/diagnoses/:id" element={<DiagnosesFormPage/>}/>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
