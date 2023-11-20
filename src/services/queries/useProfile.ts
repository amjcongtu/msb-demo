import { useQuery } from "react-query";
import { getAPI } from "../apiClient";
import { get } from "lodash";
import { queryKeys } from "../../utils/constant/query";

export const API_USER = "/users";

export const useProfile = (userId: number) => {
  const queryParams = `/${userId}`;
  const url = `${
    import.meta.env.VITE_APP_BASE_API_URL
  }${API_USER}${queryParams}`;
  const fetcher = async () => {
    const result = await getAPI(url);
    return get(result, "data", []);
  };

  return useQuery([queryKeys.user], fetcher, {
    // cache upload data
    // cacheTime: 100,
  });
};
