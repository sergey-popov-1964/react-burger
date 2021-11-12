import api from "./Api";

export const fetchWithRefresh = async () => {
  try {
    await api.getCurrentUser(localStorage.getItem("accessToken"));
  } catch (err) {
    api.checkToken()
      .then((res) => {
        console.log(res)
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        api.getCurrentUser(localStorage.getItem("accessToken"))
      })
  }
};
