// src/data-source.ts
import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
  const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}');

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: 'mssql',
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "1433"),
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database",
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
    "options": {"trustServerCertificate": true}
  };
  
};

export const AppDataSource = new DataSource(dataSourceConfig());