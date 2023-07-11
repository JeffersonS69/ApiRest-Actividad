import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createPatients,
  deletePatients,
  updatePatients,
  getPatientById,
  getAllDiagnoses,
} from "../api/patients.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function PatientsFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const [diagnoseall, setDiagnoseAll] = useState([]);

  useEffect(() => {
    async function loadPatients() {
      const res = await getAllDiagnoses();
      setDiagnoseAll(res.data);
    }
    loadPatients();
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  let count = 0;

  for (const valueDiagnose of diagnoseall) {
    if (valueDiagnose.patient == params.id) {
      count++;
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await updatePatients(params.id, data);
        toast.success("Los datos han sido actualizados!😁", {
          position: "bottom-left",
          reverseOrder: true,
        });
      } catch (err) {
        toast.error("Hubo un error al actualizar los datos😰", {
          position: "bottom-left",
          reverseOrder: true,
        });
        console.log(err);
      }
    } else {
      try {
        await createPatients(data);
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
    }
    navigate("/patients");
  });

  useEffect(() => {
    async function loadPatiet() {
      if (params.id) {
        const { data } = await getPatientById(params.id);
        setValue("firtname", data.firtname);
        setValue("lastname", data.lastname);
        setValue("birthdate", data.birthdate);
        setValue("gender", data.gender);
        setValue("address", data.address);
        setValue("phonenumber", data.phonenumber);
      }
    }
    loadPatiet();
  }, []);


  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-400 py-8">
          FORMULARIO DEL PACIENTE
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <form className="w-full max-w-lg ">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Nombre
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 borde rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="firtname"
                placeholder="firtname"
                {...register("firtname", { required: true })}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Apellido
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="lastname"
                placeholder="lastname"
                {...register("lastname", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Fecha de Nacimiento
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                name="birthdate"
                placeholder="birthdate"
                {...register("birthdate", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Dirección
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="address"
                placeholder="address"
                {...register("address", { required: true })}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Genéro
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option
                    name="gender"
                    placeholder="gender"
                    {...register("gender", { required: true })}
                  >
                    Masculino
                  </option>
                  <option
                    name="gender"
                    placeholder="gender"
                    {...register("gender", { required: true })}
                  >
                    Femenino
                  </option>
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
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                Número de teléfono
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="phonenumber"
                placeholder="phonenumber"
                {...register("phonenumber", { required: true })}
              />
            </div>
            <div>
              {!params.id && (
                <div className="w-50 md:w-2/3 px-3 mb-6 md:mb-0 pt-5">
                  <button
                    className="bg-amber-900 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onSubmit}
                  >
                    Crear
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-2">
        {params.id && (
          <div className="w-50md:w-1/3 px-2 mb-6 md:mb-0 pt-5 text-end">
            <button
              className="bg-amber-900 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
              onClick={onSubmit}
            >
              Guardar
            </button>
          </div>
        )}
        {params.id && (
          <div className="w-50 md:w-1/3 px-3 mb-6 md:mb-0 pt-5">
            <button
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                const accepted = window.confirm("¿Estás seguro?");
                if (accepted) {
                  try {
                    await deletePatients(params.id);
                    navigate("/patients");
                    toast.success("Los datos han sido eliminados!😁", {
                      position: "bottom-left",
                      reverseOrder: true,
                    });
                  } catch (err) {
                    toast.error("Hubo un error al eliminar los datos😥", {
                      position: "bottom-left",
                      reverseOrder: true,
                    });
                    console.log(err);
                  }
                }
              }}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
      {params.id && (
        <div>
          <h1 className="text-4xl font-bold text-left text-gray-400 py-8">
            DIAGNÓSTICO DEL PACIENTE
          </h1>
        </div>
      )}
      {params.id && count != 0 && (
        <TableContainer component={Paper} className="mb-5">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="uppercase ">
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Nivel de Azucar</TableCell>
                <TableCell align="right">Nivel de Grasa</TableCell>
                <TableCell align="right">Nivel de Oxígeno</TableCell>
                <TableCell align="right">Probabilidad a enfermar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diagnoseall.map(
                (row) =>
                  row.patient == params.id && (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.date_diagnosis}
                      </TableCell>
                      <TableCell align="right">{row.sugar_level}</TableCell>
                      <TableCell align="right">{row.fat_level}</TableCell>
                      <TableCell align="right">{row.oxygen_level}</TableCell>
                      <TableCell align="right">{row.risk_level}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {params.id && count == 0 && (
        <div>
          <h1 className="text-4xl font-bold text-center text-gray-400 py-8">
            NO CONTIENE NINGÚN DIAGNOSTICO
          </h1>
        </div>
      )}
    </div>
  );
}
