import { RawConfigService } from './core/config/raw-config.service';
import { getConnectionOptions } from './core/postgres/connection.options';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config = RawConfigService.getInstance();

export default getConnectionOptions(config.getDatabaseUrl());
