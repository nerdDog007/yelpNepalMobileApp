import Navbar from "@/components/Navbar";
import { setCurrentIndex } from "@/redux/slices/Info";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
// import { height } from "react-native-dimensions-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const height = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { user ,currentIndex} = useSelector((state:any) => state.info);
   useEffect(() => {
      dispatch(setCurrentIndex("Profile"));
    }, []);
  return (
  <View
    style={{
      flex: 0,
      backgroundColor: "black",
      paddingBottom: insets.bottom+height*.1,
      height: '100%',
    }}>
    <Navbar />
  </View>
  );
}
