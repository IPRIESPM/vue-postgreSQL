import Cookies from 'js-cookie';

export default async function getAllCompanysFromApi(version) {
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/empresa';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
        version,
        table: 'empresa',
      },
    });

    if (response.status === 304) {
      console.log('No hay cambios en las empresas');
      return 304;
    }

    if (!response.ok) {
      console.log('Error al obtener las empresas');
      return false;
    }

    console.log('Obteniendo las empresas');
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log('Error al obtener las empresas');
    return false;
  }
}

export async function newCompany(data) {
  const {
    cif, nombre, localidad, comunidad, direccion, telefono,
  } = data;
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/empresa';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        cif, nombre, localidad, comunidad, direccion, telefono,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error en la solicitud al crear una nueva empresa: ${error.message}`);
  }
}

export async function checkCompanies(version) {
  const url = `http://vps-3258627-x.dattaweb.com:8084/api/empresa/version/${version}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
        version,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log('error', error);
    throw new Error(`Error al comprobar las empresas: ${error.message}`);
  }
}
