import { createAsyncThunk } from "@reduxjs/toolkit";
import { OffersStorage } from "./store";
import { AxiosInstance, AxiosError } from "axios";
import { changeAuthStatus, fillByOffers, setLoadingStatus, setUserData } from "./action";
import { APIRoutes } from "../api/api";
import { AuthData, Offer, UserInfo } from "../types/types";
import { AuthorizationStatus } from "../const";

const fetchOffersAction = createAsyncThunk<void, undefined, {
  state: OffersStorage,
  extra: AxiosInstance,

}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {

    dispatch(setLoadingStatus(true))
    const { data } = await api.get<Offer[]>(APIRoutes.Offers)

    dispatch(setLoadingStatus(false))
    dispatch(fillByOffers(data))
  },
)



const fetchAuthAction = createAsyncThunk<void, undefined, {
  state: OffersStorage,
  extra: AxiosInstance,

}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserInfo>(APIRoutes.Login)
      dispatch(changeAuthStatus(AuthorizationStatus.Auth))
      dispatch(setUserData(data))

    } catch (e) {

      const error = e as AxiosError;
      if (error.response?.status === 401) {
        dispatch(changeAuthStatus(AuthorizationStatus.NoAuth))
      }

    }
  },
)


const logInAction = createAsyncThunk<void, AuthData, {
  state: OffersStorage,
  extra: AxiosInstance,

}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserInfo>(APIRoutes.Login, { email, password })
      dispatch(changeAuthStatus(AuthorizationStatus.Auth))
      dispatch(setUserData(data))

      localStorage.setItem('six-cities-token', data.token)

    } catch (e) {

      const error = e as AxiosError;
      if (error.response?.status === 400) {
        dispatch(changeAuthStatus(AuthorizationStatus.NoAuth))
        console.log('data:', error.response?.data)

      }

    }
  },
)

export {
  fetchOffersAction,
  fetchAuthAction,
  logInAction
}