export type TUserStore = {
  isLoggedIn: boolean;
  token?: string;
  user: TUser | null;
  setUser: (user: TUser) => void;
  setIsLoggedIn: (status: boolean) => void;
};

export type TUser = {
  id: number | string;
  name: string;
  email: string;
  token?: string;
};
