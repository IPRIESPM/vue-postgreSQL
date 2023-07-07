export default async function addLocalStorage(data, section) {
  const name = `${section}Data`;
  const result = {
    version: 0,
    date: new Date(),
    datos: [],
  };
  if (data !== null) {
    result.datos.push(data);
  }
  localStorage.setItem(name, JSON.stringify(result));
  return result;
}

function createLocalStorage(section, data) {
  const name = `${section}Data`;
  const result = {
    version: 0,
    date: new Date(),
    datos: data,
  };
  localStorage.setItem(name, JSON.stringify(result));
  return result;
}

export async function getLocalStorage(section) {
  const name = `${section}Data`;
  const localData = localStorage.getItem(name);
  if (localData) return JSON.parse(localData);
  console.log('no local data');

  return addLocalStorage(null, section);
}

export async function remplaceLocalStorage(data, section) {
  const name = `${section}Data`;
  if (localStorage.getItem(name)) {
    localStorage.removeItem(name);
  }
  console.log('remplaceLocalStorage', data.datos[0]);
  createLocalStorage(section, data.datos);
}
