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
import graylog from 'gelf-pro';
import { inspect } from 'util';
import { levels } from './constants';

export default class Module {
  public readonly module: string;

  constructor(module: string) {
    this.module = module;
  }

  public message(message: graylog.Message, level: levels, extra: any = {}) {
    if (this.module && !extra.module) {
      extra.module = this.module;
    }

    if (message instanceof Error) {
      if (!extra.full_message) extra.full_message = inspect(message);
      if (!extra.short_message) extra.short_message = message.message;
    }

    graylog.message(message, level, extra);
  }

  public disableTrace() {
    this.trace = () => { /* noop */ };
  }

  // Define methods
  public emergency(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.emergency, extra);
  }

  public alert(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.alert, extra);
  }

  public critical(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.critical, extra);
  }

  public error(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.error, extra);
  }

  public warning(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.warning, extra);
  }

  public notice(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.notice, extra);
  }

  public info(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.info, extra);
  }

  public debug(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.debug, extra);
  }

  public trace(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.trace, extra);
  }

  // Define aliases
  public warn(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.warning, extra);
  }

  public log(message: graylog.Message, extra?: graylog.MessageExtra) {
    this.message(message, levels.debug, extra);
  }
}
