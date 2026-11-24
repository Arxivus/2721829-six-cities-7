type User = {
    name: string,
    avatarUrl: string
    isPro: boolean
}

type Location = {
    latitude: number
    longitude: number
    zoom?: number
}

type City = {
    name: string
    location: Location
}

type Offer = {
    id: string
    title: string
    type: 'apartment' | 'room' | 'house' | 'hotel'
    price: number
    city: City
    location: Location
    isFavorite: boolean
    isPremium: boolean
    rating: number
    previewImage: string
}

type FavoriteOffer = {
    id: string
    title: string
    type: 'apartment' | 'room' | 'house' | 'hotel'
    price: number
    city: City
    location: Location
    isFavorite: boolean
    isPremium: boolean
    rating: number
    previewImage: string
}

type UserInfo = {
    name: string
    avatarUrl: string
    isPro: boolean
    email: string
    token: string
}

type AuthData = {
    email: string
    password: string
}

export {
    type User,
    type City,
    type Location,
    type Offer,
    type FavoriteOffer,
    type UserInfo,
    type AuthData
}