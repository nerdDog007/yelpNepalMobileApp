import { setSearch, setSearchBtn } from '@/redux/slices/SearchPageSlice'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

export default function Search(){
    const dispatch = useDispatch()
    const search = useSelector((state:any)=>state.SearchPage.search)    
    return(
      <>
        <View style={{width:'100%',borderWidth:1,borderColor:'white',padding:6,marginTop:14,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <MaterialIcons name='search' size={30} color='white' />
            <TextInput style={{backgroundColor:'black', textDecorationColor: 'white',height:10,borderBottomWidth:0,borderColor:'green',width:'90%'}}
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
            value={search}
            textColor="white"
            onChangeText={(text)=>dispatch(setSearch(text))}
            placeholder="Search"
            onPressIn={()=>dispatch(setSearchBtn(true))}
            onPressOut={()=>dispatch(setSearchBtn(false))}
            />
        </View>
        {search.length>2&&<View
  style={{
    width: "40%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 6,
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