import { Pressable, Text, View } from "react-native";

function Button({icon,text,onPress,view,Teext}:any){
    return(
        <Pressable onPress={onPress}>
        <View style={view}>
            {icon}
            <Text style={Teext}>
                {text}
            </Text>
        </View>
        </Pressable>
    )
}
export default Button;