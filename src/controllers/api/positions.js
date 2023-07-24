import Cookies from 'js-cookie';

const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/puestos/';

export default async function newPosition(data) {
  const url = serverPath;
  const {
    anyo, ciclo, descripcion, horario, vacantes,
  } = data;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        anyo, ciclo, descripcion, horario, vacantes,
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
