/**
 * @Vexera/log npm package
 * Copyright (C) Zoddo <discord-bots@zoddo.fr>
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation, either version
 * 3 of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */
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
