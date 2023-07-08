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
      return false;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return false;
  }
}

export async function updateCompanyFromApi(data) {
  const {
    cif,
    nombre,
    localidad,
    comunidad,
    direccion,
    telefono,
  } = data;

  const url = `http://vps-3258627-x.dattaweb.com:8084/api/empresa/${cif}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        cif, nombre, localidad, comunidad, direccion, telefono,
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

export async function deleteCompanyFromApi(cif) {
  const url = `http://vps-3258627-x.dattaweb.com:8084/api/empresa/${cif}`;

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

export async function formatCompanyData(oldData, newData) {
  const updatedData = [...oldData];

  const oldDataIndex = await oldData.findIndex((item) => item.cif === newData.cif);
  if (oldDataIndex !== -1) {
    updatedData[oldDataIndex] = newData;
  } else {
    updatedData.push(newData);
  }

  return updatedData;
}
export async function deleteLocalCompanyData(oldData, cif) {
  const updatedData = [...oldData];
  const oldDataIndex = await oldData.findIndex((item) => item.cif === cif);

  if (oldDataIndex !== -1) {
    updatedData.splice(oldDataIndex, 1);
  }
  return updatedData;
}