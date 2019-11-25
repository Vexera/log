import graylog from 'gelf-pro';
import * as constants from './constants';
import * as callbacks from './callbacks';
import * as utils from './utils';

export function setup(service: string, customConf: Partial<graylog.Settings> = {}) {
  graylog.setConfig(utils.deepMerge({
    adapterName: 'udp',
    adapterOptions: {
      host: process.env.GRAYLOG_HOST || 'localhost',
      port: parseInt(process.env.GRAYLOG_PORT || '12201'),
    },
    fields: { service },
    transform: [callbacks.transform],
    broadcast: [callbacks.broadcast],
  }, customConf));
}

export const config = {
  sensitive: [] as string[],
  field_aliases: {
    guildID: 'guild_id',
    channelID: 'channel_id',
    roleID: 'role_id',
    userID: 'user_id',
    caseID: 'case_id',
    messageID: 'message_id',
  } as { [alias: string]: string },
};

// Detects tests and filter out everything
if (process.env.NODE_ENV === 'test') graylog.setConfig({ filter: [() => false] });

export { default as Module } from './Module';
export { constants };
