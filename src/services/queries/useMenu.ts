import { useQuery } from "react-query";
import axios from "axios";
import { get } from "lodash";
import { queryKeys } from "../../utils/constant/query";

export const useMenu = () => {

  const fetcher = async () => {
    const moduleURL = new URL(import.meta.url);
    const jsonPath = new URL("../../data/menu.json", moduleURL).pathname;
    const result = await axios.get(jsonPath);
    return get(result, "data", []);
  };

  return useQuery([queryKeys.menu], fetcher, {
    // cacheTime: 5000
  });
};
