import { inspect } from 'util';
import * as constants from './constants';
import * as utils from './utils';

export function transform(message: any) {
  for (const [alias, target] of Object.entries(constants.fieldAliases)) {
    if (Object.prototype.hasOwnProperty.call(message, alias)) {
      message[target] = message[alias];
      delete message[alias];
    }
  }

  if (message.short_message instanceof Error) {
    if (!message.full_message) message.full_message = message.short_message.stack;
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

  console[level > 3 ? 'log' : 'error'](
    `${utils.getDateString()} [${module || 'Worker'}/${constants.levels[level].toUpperCase()}]:`,
    (level <= 3 && full_message) ? full_message : short_message,
    Object.keys(message).length ? inspect(message, { breakLength: Infinity }) : '',
  );
}
