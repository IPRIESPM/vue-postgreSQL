import Cookies from 'js-cookie';

export async function getAllContactsFromApi(version) {
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/contacto';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
        version,
        table: 'contactos',
      },
    });

    if (response.status === 304) {
      return 304;
    }

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
}

export async function newContact(data) {
  const {
    dni, nombre, correo, telefono, contrasena,
  } = data;
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/contacto';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        dni, nombre, correo, telefono, contrasena,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
}

export async function updateTeacherFromApi(data) {
  const {
    n, nombre, correo, telefono, dni, tipo, principal, funciones,
  } = data;

  const url = `http://vps-3258627-x.dattaweb.com:8084/api/contacto/${n}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        nombre, correo, telefono, dni, tipo, principal, funciones,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
}

export async function deleteTeacherFromApi(n) {
  const url = `http://vps-3258627-x.dattaweb.com:8084/api/contacto/${n}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    });

    if (!response.ok) {
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
}

export async function formatContactoData(oldData, newData) {
  const updatedData = [...oldData];

  const oldDataIndex = updatedData.findIndex((item) => item.n === newData.n);
  if (oldDataIndex !== -1) {
    updatedData[oldDataIndex] = newData;
  } else {
    updatedData.push(newData);
  }

  return updatedData;
}

export async function deleteLocalContactoData(oldData, n) {
  // copiamos todos los docentes en un nuevo array
  const updatedData = [...oldData];

  console.log('Todos los docentes', oldData);
  // Buscamos el indice del docente que queremos eliminar
  const oldDataIndex = await oldData.findIndex((item) => item.n === n);
  console.log('Indice del docente a eliminar', oldDataIndex);

  // Si el indice es distinto de -1, es decir, si existe el docente
  if (oldDataIndex !== -1) {
    updatedData.splice(oldDataIndex, 1);
  }

  return updatedData;
}
