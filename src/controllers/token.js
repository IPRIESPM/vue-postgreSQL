import Cookies from 'js-cookie';

export default async function createCookie(data) {
  Cookies.set('token', data.token, { expires: '5d' });
}

export function checkCookie() {
  return Cookies.get('token');
}
