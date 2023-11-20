import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookieStorage, removeOneCookieStorage } from '../helper/storage';
const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API_URL,
});

axiosClient.interceptors.request.use(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async (config: any) => {
		const accessToken = getCookieStorage('accessToken');

		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	async (response) => {
		return response;
	},
	(error) => {
		if (!error.response || !error.response.data) {
			return Promise.reject(error);
		}

		switch (error.response?.status) {
			case 401:
				removeOneCookieStorage('accessToken');
				break;
			case 403:
				if (error.response.data?.code === 403) {
					removeOneCookieStorage('accessToken');
				}
				break;

			case 404:
				break;

			case 500:
				break;

			default:
				break;
		}

		return Promise.reject(error);
	}
);
export const getAPI = <T>(
	url: string,
	config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
	return axiosClient.get<T>(url, config);
  };

  export const postAPI = (
	url: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any,
	config?: AxiosRequestConfig
  ) => {
	return axiosClient.post(url, data, config);
  };
export { axiosClient };
