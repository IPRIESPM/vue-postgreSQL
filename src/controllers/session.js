export default async function login(data) {
  const { dni, contrasena } = data;
  const url = 'http://vps-3258627-x.dattaweb.com:8084/api/logging';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ dni, contrasena }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error en la solicitud de inicio de sesión: ${error.message}`);
  }
}
