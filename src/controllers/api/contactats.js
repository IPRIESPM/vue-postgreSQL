import Cookies from 'js-cookie';

const serverPath = 'http://vps-3258627-x.dattaweb.com:8084/api/contacto/';
export default async function getContactsById(cif) {
  const url = `${serverPath}empresa/${cif}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
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
  const url = serverPath;
  const {
    dni, nombre, correo, telefono, tipo, principal, funciones, empresa,
  } = data;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        dni, nombre, correo, telefono, tipo, principal, funciones, empresa,
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

export async function updateContactFromApi(data) {
  const {
    n,
    nombre,
    correo,
    telefono,
    dni,
    tipo,
    principal,
    funciones,
    modificado,
  } = data;

  const url = serverPath;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        n,
        nombre,
        correo,
        telefono,
        dni,
        tipo,
        principal,
        funciones,
        modificado,
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
  const url = serverPath + cif;

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
