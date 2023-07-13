import Cookies from 'js-cookie';
const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/profesor/';
export async function getAllTeachersFromApi(version) {
  const url = serverPath;

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
  const url = serverPath;

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
    dni, nombre, correo, telefono, contrasena
  } = data;

  const url = serverPath + dni;
  console.log("estoy mandando datos aquí" + url)
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        dni, nombre, correo, telefono, contrasena
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
  const url = serverPath + dni;
  console.log("estoy mandando datos aqui" + url);
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
