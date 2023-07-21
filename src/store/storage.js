import profesoresStore from './profesores';
import userStore from './user';
import companyStore from './empresas';

export function getLocalData(params) {
  console.log('getLocalData', params);
  const profesoresStored = profesoresStore();
  const userStored = userStore();
  const companyStored = companyStore();

  if (params === 'teachers') return profesoresStored.getProfesores;

  if (params === 'companys') {
    return companyStored.getEmpresas;
  }

  if (params === 'user') return userStored.getUser;

  return false;
}

export function updateLocalData(params, data) {
  const profesoresStored = profesoresStore();
  const userStored = userStore();
  const companyStored = companyStore();

  if (params === 'teachers') profesoresStored.updateProfesor(data);
  if (params === 'user') userStored.setUser(data);
  if (params === 'companys') companyStored.updateEmpresa(data);
}

export function setLocalData(params, data) {
  const profesoresStored = profesoresStore();
  const userStored = userStore();
  const companyStored = companyStore();

  if (params === 'teachers') profesoresStored.setProfesores(data);
  if (params === 'user') userStored.setUser(data);
  if (params === 'companys') companyStored.setEmpresas(data);
}

export function deleteLocalData(params, data) {
  const profesoresStored = profesoresStore();
  const companyStored = companyStore();

  if (params === 'teachers') profesoresStored.deleteProfesor(data);
  if (params === 'companys') companyStored.deleteEmpresa(data);
}
