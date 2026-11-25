import { Offer, Review } from '../types/types';
import { apiAxios } from '../store';

const getData = async <T>(url: string): Promise<T> => {
  const { data } = await apiAxios.get<T>(url)
  
  return data
}

const getOffer = (id: string) => getData<Offer>(`/offers/${id}`)
const getNearbyOffers = (id: string) => getData<Offer[]>(`/offers/${id}/nearby`)
const getReviews = (id: string) => getData<Review[]>(`/comments/${id}`)

export {
    getOffer,
    getNearbyOffers,
    getReviews
}