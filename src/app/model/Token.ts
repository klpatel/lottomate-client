export interface Token {
  accessToken?: string;
  refreshToken?: string;
  expiration?: Date;
  username?: string;
  userId?: number;
  roles?: string[];
  clientId?: number;
  storeId?: number;
  userFullName?: string;
}