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
    dni,
    name: nombre,
    email: correo,
    phone: telefono,
    type: tipo,
    principal,
    functions: funciones,
    company: empresa,
  } = data;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        dni,
        nombre,
        correo,
        telefono,
        tipo,
        principal,
        funciones,
        empresa,
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
    name: nombre,
    email: correo,
    phone: telefono,
    dni,
    type: tipo,
    principal,
    functions: funciones,
    company: empresa,
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
        empresa,
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

export async function deleteContactFromApi(n) {
  const url = serverPath + n;

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
