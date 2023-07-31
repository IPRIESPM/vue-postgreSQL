import Cookies from 'js-cookie';

const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/anotaciones/';

export async function getAnnotationsFromApi() {
  // eslint-disable-next-line no-unused-vars
  const url = serverPath;
  // todo: annotations
}
export async function newAnnotation(data) {
  const url = serverPath;
  const {
    anyo, fecha, tipo, confirmado, anotacion: anotación, profesorDni, contactoN,
  } = data;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        anyo, fecha, tipo, confirmado, anotacion: anotación, profesorDni, contactoN,
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

export async function updateAnnotationFromApi(data) {
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
