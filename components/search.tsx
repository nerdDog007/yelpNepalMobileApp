import { setSearch } from '@/redux/slices/SearchPageSlice'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

export default function Search({onPress}:any){
    const router = useRouter()
    const dispatch = useDispatch()
    const search = useSelector((state:any)=>state.SearchPage.search)    
    return(
      <>
        <View style={{width:'100%',borderWidth:1,borderRadius:100,borderColor:'white',padding:6,marginTop:14,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <MaterialIcons name='search' size={30} color='white' style={{}} />
            <TextInput style={{backgroundColor:'black', textDecorationColor: 'white',height:10,borderBottomWidth:0,borderColor:'green',width:'90%'}}
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
            value={search}
            textColor="white"
            onChangeText={(text)=>dispatch(setSearch(text))}
            placeholder="Search"
            onPress={onPress}
            />
        </View>
        {search.length>2&&<View
  style={{
    width: "40%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 6,
    borderRadius:100
  }}
>
  <Text style={{
      textAlign: "center",
      fontSize: 12,
      color: "white",
     
    }}>
    Search
  </Text>
</View>}
      </>
    )
}