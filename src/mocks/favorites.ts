import { Location, City } from "./offer"

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

const favoriteOffersMock: FavoriteOffer[] = [
    {
        id: '1a2b3c4d-1111-4a2b-9c3d-e0b462a27f01',
        title: 'Cozy apartment near the canal',
        type: 'apartment',
        price: 95,
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 52.3909553943508,
                longitude: 4.85309666406198,
                zoom: 8,
            },
        },
        location: {
            latitude: 52.3676,
            longitude: 4.9041,
            zoom: 12,
        },
        isFavorite: true,
        isPremium: false,
        rating: 5,
        previewImage: 'https://url-to-image/image.png',
    },
    {
        id: '2b3c4d5e-2222-4b3c-8d4e-e0b462a27f02',
        title: 'Modern room in the city center',
        type: 'room',
        price: 65,
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 52.3609553943508,
                longitude: 4.85309666406198,
                zoom: 8,
            },
        },
        location: {
            latitude: 52.3600,
            longitude: 4.8850,
            zoom: 14,
        },
        isFavorite: true,
        isPremium: true,
        rating: 4,
        previewImage: 'https://url-to-image/image.png',
    },
]

export {
    type FavoriteOffer,
    favoriteOffersMock
}