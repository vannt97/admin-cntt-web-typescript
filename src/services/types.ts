export interface RequestLogin {
  email: string;
  password: string;
}

export interface ResponseData {
  success: boolean;
  status: number;
  data: [] | {} | string;
}
