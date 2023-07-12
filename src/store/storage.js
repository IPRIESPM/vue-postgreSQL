import profesoresStore from './profesores';
import userStore from './user';

export function getLocalData(params) {
  const profesoresStored = profesoresStore();
  const userStored = userStore();

  if (params === 'teachers') {
    return profesoresStored.getProfesores.listado;
  }
  if (params === 'user') return userStored.getUser;

  return false;
}

export function updateLocalData(params, data) {
  const profesoresStored = profesoresStore();
  const userStored = userStore();

  if (params === 'teachers') profesoresStored.updateProfesor(data);
  if (params === 'user') userStored.setUser(data);
}

export function setLocalData(params, data) {
  const profesoresStored = profesoresStore();
  const userStored = userStore();

  if (params === 'teachers') profesoresStored.setProfesores(data);
  if (params === 'user') userStored.setUser(data);
}

export function deleteLocalData(params, data) {
  const profesoresStored = profesoresStore();

  if (params === 'teachers') profesoresStored.deleteProfesor(data);
}
