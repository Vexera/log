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
  doNotBroadcastFields: [] as string[],
};

// Detects tests and filter out everything
if (process.env.NODE_ENV === 'test') graylog.setConfig({ filter: [() => false] });

export { default as Module } from './Module';
export { constants };
