export interface AccessTokenRO {
  data: {
    access_token: string;
  };
}

export interface TokensRO {
  data: {
    id: number;
    access_token: string;
    refresh_token: string;
  };
}
