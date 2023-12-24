import { User } from '../../features/user/types';

export function getUser() {
  try {
    const userString = localStorage.getItem('user');

    console.log('userString', userString);

    if (!userString) {
      // Якщо дані відсутні, можливо, повертати значення за замовчуванням або null
      return null;
    }

    const user: User = JSON.parse(userString);

    console.log('user', user);

    // Додаткова перевірка, чи отриманий об'єкт є типом User
    if (user && typeof user === 'object' && 'nickName' in user) {
      console.log(user && typeof user === 'object' && 'id' in user && 'nickName' in user);

      return user;
    }
    // Якщо дані не відповідають очікуваному формату
    throw new Error('Invalid user data format');
  } catch (error) {
    // Обробка можливих помилок парсингу JSON або інших помилок
    console.error('Error while retrieving user data:', error);

    return null;
  }
}
