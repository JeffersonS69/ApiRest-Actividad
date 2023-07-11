import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3">
      <Link to="/patients">
        <img
          src=".\src\logo\logo.png"
          className="w-18 h-16 rounded-md shadow-lg"
        />
      </Link>
      <div className="grid grid-cols-2 grid-2">
        <div className="mx-5">
          <button className="bg-amber-900 text px-3 py-2 rounded-lg font-bold hover:bg-amber-700 hover:cursor-pointer uppercase">
            <Link to="/patients-create">Crear paciente</Link>
          </button>
        </div>
        <div>
          <button className="bg-amber-900 text px-3 py-2 rounded-lg font-bold hover:bg-amber-700 hover:cursor-pointer uppercase">
            <Link to="/diagnoses-create">Crear diagnóstico</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
