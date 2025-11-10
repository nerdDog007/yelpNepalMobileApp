import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'

export default function Back({text}){
    const router = useRouter()
    return(
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'60%'}}>
            <MaterialIcons name='arrow-back' size={30} color='black' onPress={()=>{router.back()}} />
            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>{text}</Text>
        </View>
    )
}