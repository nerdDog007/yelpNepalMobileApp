import { Text, View } from "react-native";

 export default function Item({icon,text}:{icon:JSX.Element,text:string})
{
    return(
        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:1,borderColor: 'rgba(0, 0, 0, 0.1)',paddingBottom:4}}>
            {icon}
            <Text style={{fontSize:16,fontWeight:'500',marginLeft:10}}>{text}</Text>
        </View>
    )
}