import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const router = useRouter();
  const user = useSelector((state) => state.info.user);
  const [isReady, setIsReady] = useState(false); // Wait until first render

  // Mark component as mounted
  useEffect(() => {
    setIsReady(true);
  }, []);

  // Redirect when mounted and user state updates
  useEffect(() => {
    if (!isReady) return; // wait for mount
    // if (!user) return;    // wait for user to load

    console.log("Current user state:", user);

    if (user.success) {
      router.replace("/(tabs)/Dashboard"); // go to dashboard
    } else {
      router.replace("/(tabs)/LandingPage"); // go to landing page
    }
  }, [isReady, user]);

  // Loader while redirecting
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
