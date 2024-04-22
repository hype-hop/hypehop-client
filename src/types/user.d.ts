export interface User {
  _id: string;
  name: string;
  displayName?: string;
  image: string;
  email: string;
  password: string;
  createdAt: string;
  favorites: { [key: string]: boolean };
  favoritesReview: { [key: string]: boolean };
}
