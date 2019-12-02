import _ from 'lodash';
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
    if (typeof message[field] === 'object' && message[field] !== null) replaceSensitive(message[field]);
    if (typeof message[field] !== 'string') continue;

    for (const text of config.sensitive) {
      if (typeof text !== 'string' || text === '') continue;
      message[field] = message[field].split(text).join('[CENSORED]');
    }
  }
}

/**
 * Like _.merge(), but will also merge arrays
 */
export function deepMerge(object: object, ...source: object[]) {
  return _.mergeWith(object, ...source, (objValue: object, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
}
