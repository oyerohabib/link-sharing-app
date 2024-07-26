export interface User {
  uid?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  email?: string;
  links?: Array<any>;
}
export interface Link {
  platform: string;
  url: string;
}

export interface UserData {
  uid?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  email?: string;
  links?: Array<Link>;
}