import { useQuery } from "react-query";
import { getAPI } from "../apiClient";
import { get } from "lodash";
import { queryKeys } from "../../utils/constant/query";

export const API_PRODUCT = "/products";

export const useGetProduct = (limit = 6, skip = 0) => {
  const queryParams = `?limit=${limit}&skip=${skip}`;
  const url = `${
    import.meta.env.VITE_APP_BASE_API_URL
  }${API_PRODUCT}${queryParams}`;
  const fetcher = async () => {
    const result = await getAPI(url);
    return get(result, "data", []);
  };

  return useQuery([queryKeys.product], fetcher, {
    // cache upload data
    // cacheTime: 100,
  });
};
