export type AccessTokenRO = {
  data: {
    access_token: string;
  };
};

export type TokensRO = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};
