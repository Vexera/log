import { config } from './index';

export function getDateString() {
  const d = new Date();

  const hours = `0${d.getHours()}`.slice(-2);
  const minutes = `0${d.getMinutes()}`.slice(-2);
  const seconds = `0${d.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

export function replaceSensitive(message: any) {
  for (const field of Object.keys(message)) {
    if (typeof message[field] === 'object') replaceSensitive(message[field]);
    if (typeof message[field] !== 'string') continue;

    for (const text of config.sensitive) {
      if (typeof text !== 'string' || text === '') continue;
      message[field] = message[field].split(text).join('[CENSORED]');
    }
  }
}
