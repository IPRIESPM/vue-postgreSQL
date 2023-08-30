import Cookies from 'js-cookie';

const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/anotaciones/';

// eslint-disable-next-line import/prefer-default-export
export async function newAnnotation(data) {
  const {
    anyo, fecha, tipo, anotacion, confirmado, profesorDni, contactoN,
  } = data;

  const url = serverPath + contactoN;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        anyo, fecha, tipo, anotacion, confirmado, profesorDni,
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

export async function getContactAnnotationFromApi(contactN) {
  console.log('contactN: ', contactN);
  const url = serverPath + contactN;
  try {
    const response = await fetch(url, {
      method: 'get',
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

export async function getLastAnnotationFromApi() {
  const url = serverPath;
  try {
    const response = await fetch(url, {
      method: 'get',
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

export async function deleteAnnotationFromApi(id) {
  const url = serverPath + id;
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

    return true;
  } catch (error) {
    return false;
  }
}

export async function updateAnnotationFromApi(data) {
  const url = serverPath + data.cod;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
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
