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

type Host = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

type Offer = {
    id: string
    title: string
    type: OfferType
    price: number
    city: City
    location: Location
    isFavorite: boolean
    isPremium: boolean
    rating: number
    description: string
    bedrooms: number
    goods: string[]
    host: Host
    images: string[]
    maxAdults: number
    previewImage: string
};

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

type Review = {
    id: string,
    date: string,
    user: User,
    comment: string,
    rating: number,
}

export {
    type User,
    type Review,
    type City,
    type Location,
    type Offer,
    type UserInfo,
    type AuthData
}