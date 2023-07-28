import Cookies from 'js-cookie';

const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/puestos/';

export async function newPosition(data) {
  const url = serverPath;
  const {
    anyo, ciclo, descrip, horario, vacantes, cifEmpresa,
  } = data;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        anyo, ciclo, descrip, horario, vacantes, cifEmpresa,
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

export async function updatePositionFromApi(data) {
  const url = serverPath;
  console.log('data', data);
  const {
    anyo, ciclo, descrip, horario, vacantes, cod,
  } = data;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        anyo, ciclo, descrip, horario, vacantes, cod,
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

export async function deletePositionFromApi(data) {
  const url = serverPath + data;
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
