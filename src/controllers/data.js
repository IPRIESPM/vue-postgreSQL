import getAllCompanysFromApi, {
  formatCompanyData,
  updateCompanyFromApi,
  deleteCompanyFromApi,
  deleteLocalCompanyData,
} from './api/companys';
import { getAllContactsFromApi } from './api/contacts';
import {
  getAllTeachersFromApi,
  updateTeacherFromApi,
  formatTeacherData,
  deleteTeacherFromApi,
  deleteLocalTeacherData,
} from './api/teachers';
import {
  createLocalStorage,
  getLocalStorage,
  createLocalStorageFromApi,

} from './localStorage';

export async function getAllData(section, force = false) {
  let localData = await getLocalStorage(section);
  if (!localData) localData = createLocalStorage(section);

  console.log('localData', localData);

  const { version } = localData;
  console.log('version', version);
  const date = new Date(localData.date);

  const now = new Date();

  const diff = now - date;

  const minutes = Math.floor(diff / 1000 / 60);

  // eslint-disable-next-line consistent-return
  if (minutes < 5 && !force) return localData;
  if (force) console.log('update forced');

  let data;
  if (section === 'teachers') data = await getAllTeachersFromApi(version);
  if (section === 'companys') data = await getAllCompanysFromApi(version);
  if (section === 'contacts') data = await getAllContactsFromApi(version);

  // eslint-disable-next-line consistent-return
  if (data === 304) return localData;
  // eslint-disable-next-line consistent-return
  if (!data) return localData;

  createLocalStorageFromApi(data, section);
  // eslint-disable-next-line consistent-return
  return data;
}

export async function editData(section, newData) {
  let apiResponse;
  console.log('newData', newData);

  if (section === 'companys') apiResponse = await updateCompanyFromApi(newData);
  if (section === 'teachers') apiResponse = await updateTeacherFromApi(newData);

  if (!apiResponse) {
    console.log('error al guardar los datos');
    return false;
  }

  const localData = await getLocalStorage(section);

  const { data: oldData } = localData;
  let newFormatData;

  if (section === 'companys') newFormatData = await formatCompanyData(oldData, newData);
  if (section === 'teachers') newFormatData = await formatTeacherData(oldData, newData);

  console.log('Esto es lo que debuelve la base de datos', newFormatData);

  const newLocalData = {
    date: new Date(),
    version: localData.version,
    data: newFormatData,
  };
  createLocalStorageFromApi(newLocalData, section);

  console.log('Esto es lo que devuelve deleteData', newLocalData);
  return newLocalData;
}

export async function deleteData(section, data) {
  let apiResponse;

  if (section === 'companys') apiResponse = await deleteCompanyFromApi(data);
  if (section === 'teachers') apiResponse = await deleteTeacherFromApi(data);

  if (!apiResponse) {
    console.log('error al guardar los datos');
    return false;
  }

  const localData = await getLocalStorage(section);
  console.log('localData', localData);
  const { data: oldData } = localData;

  console.log('oldData', oldData);
  let newFormatData = data;

  if (section === 'companys') newFormatData = await deleteLocalCompanyData(oldData, data);
  if (section === 'teachers') newFormatData = await deleteLocalTeacherData(oldData, data);

  console.log('Esto es lo que debuelve la base de datos', newFormatData);

  const newLocalData = {
    date: new Date(),
    version: localData.version,
    data: newFormatData,
  };
  createLocalStorageFromApi(newLocalData, section);

  console.log('Esto es lo que devuelve deleteData', newLocalData);
  return newLocalData;
}
