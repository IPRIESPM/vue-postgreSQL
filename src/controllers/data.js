import getAllCompanysFromApi from './api/companys';
import getAllTeachersFromApi from './api/teachers';
import { getLocalStorage, remplaceLocalStorage } from './localStorage';

export default async function getAllData(section) {
  console.log(section);
  const localData = await getLocalStorage(section);
  if (!localData) return;
  const { version } = localData;
  const date = new Date(localData.date);
  console.log('localData date:', date);

  const now = new Date();
  console.log('now', now);
  const diff = now - date;
  console.log('diff', diff);
  const minutes = Math.floor(diff / 1000 / 60);
  console.log('minutes', minutes);

  if (minutes < 5) return localData;

  let data;
  if (section === 'teachers') data = await getAllTeachersFromApi(version);
  if (section === 'companys') data = await getAllCompanysFromApi(version);

  if (data === 304) return localData;
  if (!data) return localData;

  remplaceLocalStorage(data, section);
  return data;
}
