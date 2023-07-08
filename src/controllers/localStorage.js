export function getLocalStorage(params) {
  const storageName = `${params}Data`;
  console.log('getLocalStorage');
  console.log('params', params);
  // obtener datos de local storage
  const localData = JSON.parse(localStorage.getItem(storageName));
  console.log('localData', localData);
  console.log('------------------------------------');
  return localData;
}

export function createLocalStorageFromApi(params, name) {
  console.log('createLocalStorageFromApi');
  console.log('params', params);
  console.log('name', name);

  const storageName = `${name}Data`;
  console.log('storageName', storageName);

  const { data, version } = params;
  console.log('datos', data);
  console.log('version', version);
  let validData = data;

  if (!data) validData = [];

  const newLocalData = {
    date: new Date(),
    version,
    data: [...validData],
  };

  console.log('newLocalData', newLocalData);
  localStorage.setItem(storageName, JSON.stringify(newLocalData));
}

export function createLocalStorage(name) {
  const storageName = `${name}Data`;
  const localData = {
    date: new Date(),
    version: 0,
    data: [],
  };
  console.log('createLocalStorage');
  localStorage.setItem(storageName, JSON.stringify(localData));
  return localData;
}

export function addLocalStorage(params, name) {
  console.log('addLocalStorage');
  console.log('params', params);

  const storageName = `${name}Data`;
  console.log('storageName', storageName);

  const oldLocalStorage = getLocalStorage(name);

  console.log('datos', oldLocalStorage);

  oldLocalStorage.data.push(params);
  console.log('datos', oldLocalStorage.data);
  const newLocalStorage = {
    date: new Date(),
    version: oldLocalStorage.version,
    data: [...oldLocalStorage.data],
  };

  console.log('newLocalStorage', newLocalStorage);

  localStorage.setItem(storageName, JSON.stringify(newLocalStorage));
}

export function deleteLocalStorage(params, name) {
  console.log('deleteLocalStorage');
  console.log('params', params);

  const storageName = `${name}Data`;
  console.log('storageName', storageName);

  const oldLocalStorage = getLocalStorage(name);

  console.log('datos', oldLocalStorage);

  const newLocalStorage = {
    date: new Date(),
    version: oldLocalStorage.version,
    data: oldLocalStorage.data.filter((item) => item.id !== params),
  };

  console.log('newLocalStorage', newLocalStorage);

  localStorage.setItem(storageName, JSON.stringify(newLocalStorage));
}
