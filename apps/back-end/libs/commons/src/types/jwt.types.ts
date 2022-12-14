export type JwtPayloadWithToken = {
  email: string;
  sub: number;
  refreshToken: string;
};

export type JwtPayload = Omit<JwtPayloadWithToken, 'refreshToken'>;

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
