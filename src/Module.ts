import graylog from 'gelf-pro';
import { levels } from './constants';

export default class Module {
  public readonly module: string;

  constructor(module: string) {
    this.module = module;
  }

  public message(message: graylog.Message, level: levels, extra: any = {}) {
    if (this.module && !extra.modules) {
      extra.module = this.module;
    }

    if (message instanceof Error && !extra.full_message) {
      extra.full_message = message.stack;
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
