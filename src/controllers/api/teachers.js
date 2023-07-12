import Cookies from 'js-cookie';

export async function getAllTeachersFromApi(version) {
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/profesor';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
        version,
        table: 'profesores',
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

export async function newTeacher(data) {
  const {
    dni, nombre, correo, telefono, contrasena,
  } = data;
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/profesor';

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
    dni, nombre, correo, telefono,
  } = data;

  const url = `http://vps-3258627-x.dattaweb.com:8084/api/profesor/${dni}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        dni, nombre, correo, telefono,
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

export async function deleteTeacherFromApi(dni) {
  const url = `http://vps-3258627-x.dattaweb.com:8084/api/profesor/${dni}`;

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

export async function formatTeacherData(oldData, newData) {
  const updatedData = [...oldData];

  const oldDataIndex = updatedData.findIndex((item) => item.dni === newData.dni);
  if (oldDataIndex !== -1) {
    updatedData[oldDataIndex] = newData;
  } else {
    updatedData.push(newData);
  }

  return updatedData;
}

export async function deleteLocalTeacherData(oldData, dni) {
  return updatedData;
}
