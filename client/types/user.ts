export interface CurrentUser {
  id: string;
  email: string;
}

export interface CurrentUserResponse {
  currentUser: CurrentUser | null;
}
