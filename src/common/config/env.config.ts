export interface EnvConfigurationModel {
  environment: 'development' | 'production' | 'local'
  db_uri: string
  jwt_secret: string
  port: number | string
}

export const EnvConfiguration = (): EnvConfigurationModel => ({
  environment: process.env.NODE_ENV as EnvConfigurationModel['environment'],
  port: process.env.PORT,
  db_uri : process.env.DB_URI,
  jwt_secret : process.env.JWT_SECRET
})
