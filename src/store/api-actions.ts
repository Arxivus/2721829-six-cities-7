import { createAsyncThunk } from "@reduxjs/toolkit";
import { OffersStorage } from "./store";
import { AxiosInstance } from "axios";
import { fillByOffers, setLoadingStatus } from "./action";
import { APIRoutes } from "../api/api";
import { Offer } from "../types/types";

const fetchQuestionAction = createAsyncThunk<void, undefined, {
  state: OffersStorage,
  extra: AxiosInstance,
  
}>(
  'data/fetchQuestions',
  async (_arg, {dispatch, extra: api}) => {

    dispatch(setLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoutes.Offers);

    dispatch(setLoadingStatus(false));
    dispatch(fillByOffers(data));
  },
)

export {
    fetchQuestionAction
}