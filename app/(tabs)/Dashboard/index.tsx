import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/logSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'red' }}>
      <Text>Welcome to Dashboard</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}