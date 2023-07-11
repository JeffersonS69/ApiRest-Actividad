import { useEffect, useState } from "react"
import { getAllPatients } from "../api/patients.api"
import { PatientCard } from "./PatientCard";

export function PatientsList() {
  const [patients, setPatients] = useState([]);

    useEffect(()=>{
        async function loadPatients(){
          const res = await getAllPatients();
          setPatients(res.data)
        }
        loadPatients();
    },[])
  return (
    <div className="grid grid-cols-3 gap-3">{patients.map(patient => (
      <PatientCard key={patient.id} patient={patient}/>
    ))}</div>
  )
}
