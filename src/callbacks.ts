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
import { inspect } from 'util';
import { levels } from './constants';
import { config } from './index';
import * as utils from './utils';

export function transform(message: any) {
  for (const [alias, target] of Object.entries(config.field_aliases)) {
    if (Object.prototype.hasOwnProperty.call(message, alias)) {
      message[target] = message[alias];
      delete message[alias];
    }
  }

  if (message.short_message instanceof Error) {
    if (!message.full_message) message.full_message = inspect(message.short_message);
    if (!message.short_message) message.short_message = message.short_message.message;
  }

  utils.replaceSensitive(message);
}

export function broadcast(message: any) {
  if (message.level > 7) return;

  const { short_message, full_message, level, module } = message;

  // We are working on a copy of the object, so we can freely change it
  delete message.short_message;
  delete message.full_message;
  delete message.level;
  delete message.module;
  delete message.service;

  for (const field of config.doNotBroadcastFields) {
    delete message[field];
  }

  console[level > 3 ? 'log' : 'error'](
    `${utils.getDateString()} [${module || '<none>'}/${levels[level].toUpperCase()}]:`,
    (level <= 3 && full_message) ? full_message : short_message,
    Object.keys(message).length ? inspect(message, { breakLength: Infinity }) : '',
  );
}
