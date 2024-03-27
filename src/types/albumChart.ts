export interface AlbumCharts {
    pageDescription:string,
    pageKeywords:string,
    pageTitle:string,
    reviews: AlbumReview[],
    top5Albums:Top5Album[],
    uniqueAlbumsArray :UniqueAlbum[]
}
export interface AlbumReview {
    albumId:string,
    albumRating:number,
    albumReleaseDate:string,
    albumTitle:string,
    artistGenre : string[],
    body : string,
    comments : string[],
    createdAt : string,
    isFavorite:string,
    status:string,
    thumbnail:string,
    title :string,
    tracks : ReviewTracks[],
    user:string,
    view:number,
    __v:number,
    _id : string
}



export interface ReviewTracks {
    discNumber:number,
    trackRating : number[],
    trackTitle : string[],
    _id : string,
}

export interface Top5Album {
    albumId:string,
    albumTitle:string,
    averageRating : number,
    ratings :number[],
    thumbnail : string,
    weightedAverage : number
}
export interface UniqueAlbum {
    albumId:string,
    albumTitle:string,
    albumRating : number
}