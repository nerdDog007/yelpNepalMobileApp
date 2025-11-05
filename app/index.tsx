import { setToken, setUser } from "@/redux/slices/Info";
import { getUserData } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch();
  async function FetchFromStorage(){
    const { user, token } = await getUserData();
    console.log(user,token)
    if (user && token) {
      dispatch(setUser(user));
      dispatch(setToken(token))
    }
    setIsReady(true);
  }
  const router = useRouter();
  const user = useSelector((state: any) => state.info.user);
  const [isReady, setIsReady] = useState(false); 
  useEffect( () => {
    FetchFromStorage()
  }, []);

  useEffect(() => {
    if (!isReady) return; 

    console.log("Current user state:", user);
    if ( user && user.success) {
      router.replace("/(tabs)/Dashboard/Search");
    } else {
      router.push("/(tabs)/LandingPage");
    }
  }, [isReady, user]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
