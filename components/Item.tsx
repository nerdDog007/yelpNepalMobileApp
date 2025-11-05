import { Link } from "expo-router";
import { Text, View } from "react-native";

 export default function Item({icon,text,href='https://www.google.com'}:{icon:JSX.Element,text:string,href?:string})
{
    return(
        <Link href={href} style={{ textDecorationLine: 'none' }}>
            <View style={{ width:'100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 4, borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                {icon}
                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 10 }}>{text}</Text>
            </View>
        </Link>
    )
}