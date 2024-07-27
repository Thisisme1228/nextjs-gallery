export interface UnsplashImage {
    description: string,
    user: {
        username: string,
    },
    urls: {
        raw: string,
    },
    witdth: number,
    height: number,
}

export interface UnsplashSearchResponse {
    results: UnsplashImage[],
}