export interface UserResp {
  id: string;
  name: string;
  email: string;
}

export interface IAuthResp {
  access_token: string;
  user: UserResp
}
