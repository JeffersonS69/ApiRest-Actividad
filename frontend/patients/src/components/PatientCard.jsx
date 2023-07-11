import { useNavigate } from "react-router-dom";

export function PatientCard({ patient }) {
  const navigate = useNavigate();
  
const {birthdate} = patient

const calcule_age = () => {
    let day = new Date()
    let birth_date = new Date(birthdate)
    let age = day.getFullYear() - birth_date.getFullYear()
    let diffmonths = day.getMonth() - birth_date.getMonth()
    if(diffmonths < 0 || (diffmonths === 0 && day.getDate() < birth_date.getDate()))
        age--
    return age
}

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer h-100 rounded-md "
      onClick={() => {
        navigate(`/patients/${patient.id}`);
      }}
    >
      <img src={patient.image} className="rounded-md"/>
      <h1 className="font-bold uppercase">
        Nombre completo: 
      </h1>
      <p>{patient.firtname} {patient.lastname}</p>
      <h1 className="font-bold uppercase">
        Edad: 
      </h1>
      <p>{calcule_age()}</p>
      <h1 className="font-bold uppercase">
        Género: 
      </h1>
      <p>{patient.gender}</p>
      <h1 className="font-bold uppercase">
        Dirección: 
      </h1>
      <p>{patient.address}</p>
      <h1 className="font-bold uppercase">
        Número de teléfono: 
      </h1>
      <p className="mb-3">{patient.phonenumber}</p>
      <hr />
    </div>
  );
}
