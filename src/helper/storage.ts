import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface DataStorage {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}
export const getCookieStorage = (key: string) => Cookies.get(key);
export const removeOneCookieStorage = (key: string) => {
  const domain = import.meta.env.REACT_APP_COOKIE_DOMAIN || "";
  Cookies.remove(key, { domain });
};
export const setOneCookieStorage = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: string | number | any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const domain = import.meta.env.REACT_APP_COOKIE_DOMAIN || "";
  Cookies.set(key, typeof data === "object" ? JSON.stringify(data) : data, {
    domain,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setAllCookieStorage = (data: DataStorage[]): any =>
  data.forEach((item) => setOneCookieStorage(item.key, item.value));

export const setTokenCookie = (access_token: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenDecoded : any= jwt_decode(access_token);
  const userId = tokenDecoded.id ;
	const expToken = tokenDecoded.exp ? parseFloat(tokenDecoded.exp) * 1000 : 0;
  setAllCookieStorage([
    { key: "accessToken", value: tokenDecoded },
		{ key: 'expireToken', value: expToken },
		{ key: 'userId', value: Number(userId) },

  ]);
};
export function removeStorageJwtToken() {
	removeOneCookieStorage("accessToken");
	removeOneCookieStorage("expireToken");
	removeOneCookieStorage("userId");
}

