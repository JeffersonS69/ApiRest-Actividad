import React, { useEffect, useState } from "react";
import { createDiagnoses, getAllPatients } from "../api/patients.api";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function DiagnosesFormPage() {
  const [patients, setPatients] = useState([])

  const {
    handleSubmit,
    register,
  } = useForm({});

  const navigate = useNavigate();

  useEffect(() => {
    async function loadPatients() {
      const res = await getAllPatients();
      setPatients(res.data);
    }
    loadPatients();
  }, []);


  const onSubmit = handleSubmit(async(data) => {
    const patientdagnos = {
      sugar_level: data.sugar_level,
      fat_level: data.fat_level,
      oxygen_level: data.oxygen_level,
      patient: data.patient
    }

    try {
      await createDiagnoses(patientdagnos);
      toast.success("Se ha creado los datos correctamente!", {
        position: "bottom-left",
        reverseOrder: true,
      });
      navigate("/patients");
    } catch (err) {
      toast.error("Hubo un error al crear los datos😥", {
        position: "bottom-left",
        reverseOrder: true,
      });
      console.log(err);
    }
  })

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-400 py-8">
          DIAGNÓSTICO DEL PACIENTE
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Paciente
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  {...register("patient", { required: true })}
                >
                  {patients.map((data) => (
                    <option key={data.id} value={data.id} >
                      {data.firtname} {data.lastname}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Nivel de azúcar
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                {...register("sugar_level", { required: true })}
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Nivel de grasa
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                {...register("fat_level", { required: true })}
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                Nivel de Oxigeno
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                {...register("oxygen_level", { required: true })}
              />
            </div>
          </div>
          <div>
            <button className="bg-amber-900 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
