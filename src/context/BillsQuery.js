import lofftApi from "../api/lofftApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetch_data = async () => {
  return AsyncStorage.getItem("token");
};

export const my_bills = async () => {
  const token = await fetch_data();
  // console.log(token);
  try {
    const response = await lofftApi.get("/api/user_bills", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
