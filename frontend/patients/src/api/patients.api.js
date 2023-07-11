"use strict";

import axios from 'axios'

const apisRestPatients = axios.create({
    baseURL: 'http://127.0.0.1:8000/patients/api/patients/patient/'
})

const apiRestDiagnoses = axios.create({
    baseURL: 'http://127.0.0.1:8000/patients/api/diagnoses/diagnose/'
})

export const getAllPatients = () => apisRestPatients.get('/').catch((err)=> {axios.AxiosError(err)})

export const getPatientById = (id) => apisRestPatients.get(`/${id}/`)

export const createPatients = (patient) => apisRestPatients.post("/", patient).catch((err)=> {axios.AxiosError(err)})

export const deletePatients = (id) => apisRestPatients.delete(`/${id}/`).catch((err)=> {axios.AxiosError(err)})

export const updatePatients = (id, patient) => apisRestPatients.put(`/${id}/`, patient).catch((err)=> {axios.AxiosError(err)})

export const getAllDiagnoses = () => apiRestDiagnoses.get('/').catch((err)=> {axios.AxiosError(err)})

export const getDiagnoses = () => apiRestDiagnoses.get(`/${id}/`).catch((err)=> {axios.AxiosError(err)})

export const createDiagnoses = (diagnose) => apiRestDiagnoses.post('/', diagnose).catch((err)=> {axios.AxiosError(err)})

export const deleteDiagnoses = () => apiRestDiagnoses.delete(`/${id}/`).catch((err)=> {axios.AxiosError(err)})

export const updateDiagnoses = () => apiRestDiagnoses.put(`/${id}/`, patient).catch((err)=> {axios.AxiosError(err)})
