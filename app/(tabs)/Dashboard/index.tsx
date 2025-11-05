import Navbar from "@/components/Navbar";
import { Dimensions, ScrollView, Text, View } from "react-native";
// import { height } from "react-native-dimensions-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const height = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { user } = useSelector((state:any) => state.info);
  return (
    <View
      style={{
        flex: 0,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom+height*.1,
      }}>
      <Navbar />
      <ScrollView
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <Text key={i}>Welcome to Dashboard {i}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
