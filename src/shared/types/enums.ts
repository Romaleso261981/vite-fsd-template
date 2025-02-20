export enum DatabasePaths {
  USERS = 'users',
  ADMIN = 'admin',
}
export enum RoutersPaths {
  MAIN = '/',
  ADMIN = '/admin',
  USERBYID = '/admin/:id',
  AUTH = '/auth',
  NOFOUND = '*',
}
export enum Direction {
  DESC = 'desc',
  ASC = 'asc',
}
export enum UserDataEnum {
  ID = 'id',
  RULE = 'rule',
  EMAIL = 'email',
  NAME = 'name',
}
export enum LocalStorageDataEnum {
  USER = 'user',
  ISAUTH = 'isAuth',
  EN = 'en',
}
