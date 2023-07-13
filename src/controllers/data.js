import getAllCompanysFromApi, {
  updateCompanyFromApi,
  deleteCompanyFromApi,
} from './api/companys';

import {
  getAllTeachersFromApi,
  updateTeacherFromApi,
  deleteTeacherFromApi,
} from './api/teachers';

import {
  getLocalData, setLocalData, updateLocalData, deleteLocalData,
} from '../store/storage';

export async function getAllData(section, force = false) {
  const localData = getLocalData(section);

  const { version, listado } = localData;
  let update = false;
  if (!listado.length > 0) update = true;
  const date = new Date(localData.date);

  const now = new Date();

  const diff = now - date;

  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes < 5 && !force && !update) return localData;
  if (force) console.log('update forced');

  let data;
  if (section === 'teachers') data = await getAllTeachersFromApi(version);
  if (section === 'companys') data = await getAllCompanysFromApi(version);

  console.log('guardamos los datos en pinia', data);
  setLocalData(section, data);
  if (data === 304) return localData;

  if (!data) return localData;

  return true;
}

export async function editData(section, newData) {
  let apiResponse;

  if (section === 'companys') apiResponse = await updateCompanyFromApi(newData);
  if (section === 'teachers') apiResponse = await updateTeacherFromApi(newData);
  console.log('apiResponse', apiResponse);
  if (!apiResponse) {
    console.log('error al guardar los datos');
    return false;
  }
  console.log('apiResponse', apiResponse);
  updateLocalData(section, newData);
  return true;
}

export async function deleteData(section, data) {
  let apiResponse;

  if (section === 'companys') apiResponse = await deleteCompanyFromApi(data);
  if (section === 'teachers') apiResponse = await deleteTeacherFromApi(data);

  if (!apiResponse) {
    console.log('error al guardar los datos');
    return false;
  }
  deleteLocalData(section, data);
  return true;
}
