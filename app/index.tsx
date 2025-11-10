import { setToken, setUser } from "@/redux/slices/Info";
import { getUserData } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch function for react-query
  async function FetchFromStorage() {
    const { user, token } = await getUserData();
    if (user && token) {
      dispatch(setUser(user));
      dispatch(setToken(token));
    }
    return { user, token};
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: FetchFromStorage,
  });

  const user = useSelector((state: any) => state.info.user);

  useEffect(() => {
    if (isLoading) return;

    if (data?.user && data?.token && data.user.success) {
      console.log("User found:", data.user);
      router.replace("/(tabs)/Dashboard/Search");
    } else {
      router.push("/(tabs)/LandingPage");
    }
  }, [data, isLoading, user]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
