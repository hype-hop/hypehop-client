import { User } from "./user";


export interface Review {
    _id: string;
    title: string;
    body: string;
    thumbnail: string;
    createdAt: string; 
    user: User;
    isFavorite: Array<string>; 
    comments: Array<Comment>; 
    albumRating:number
}

  export interface Comment {
    _id: string;
    text: string;
    createdAt: string; 
    user: User;
  }
  