import { useMutation } from "react-query";
import { axiosClient } from "../apiClient";
import get from "lodash/get";
import { setTokenCookie } from "../../helper/storage";
import { useState } from "react";
import { message } from "antd";

const APIs = {
  login: "auth/login",
};
type RequestBody = { username: string; password: string };
export const useLoginMutation = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const loginMutation = useMutation((rqBody: RequestBody) => {
    return axiosClient.post<RequestBody, Response>(APIs.login, rqBody);
  });

  const login = async (username: string, password: string) => {
    try {
      const data = await loginMutation.mutateAsync({
        username,
        password,
      });
    

      const token = get(data, "data.token", "");
      setTokenCookie(token);

      setIsSuccess(true);
      message.success("Đăng nhập thành công!");

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSuccess(false);
      const err = get(error, "response", "");
      return err;
    }
  };
  return { login, isSuccess };
};
