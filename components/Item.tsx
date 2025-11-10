import { Link } from "expo-router";
import { Text, View } from "react-native";

 export default function Item({icon,text,href='https://www.google.com'}:{icon:JSX.Element,text:string,href?:string})
{
    return(
        <Link href={href} style={{ textDecorationLine: 'none' }}>

            {/* <TouchableOpacity></TouchableOpacity> */}
            <View style={{ width:'100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(255, 2555, 255, 0.4)' }}>
                {icon}
                <Text style={{ fontSize: 16,color:'white', fontWeight: '500', marginLeft: 10 }}>{text}</Text>
            </View>
        </Link>
    )
}