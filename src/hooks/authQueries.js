import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data) {
        dispatch(setUser(data));
      }
    },
  });
};
