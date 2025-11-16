import Button from "@/components/Button";
import renderStars from "@/components/ratingStar";
import { setBusinessId } from "@/redux/slices/Info";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function Business({params}){
    const router = useRouter()
    const {businessId}=useLocalSearchParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setBusinessId(businessId))
    },[businessId])
    async function getData(){
        const response = await axios.get(`http://192.168.1.146:3000/api/search/${businessId}`)
        const data = await response.data;
        return data.data
    }
    const {isLoading,data}=useQuery({
        queryKey:['business',businessId],
        queryFn:getData,
    })    
    const {user} = useSelector((state: any) => state.info);
    if(isLoading){
        return(
            <ActivityIndicator size="large" color="red" />
        )
    };    
    return(
        <>
        <View style={{flex:1,backgroundColor:'black'}}>
            <Image source={{ uri: data.url[0] }} style={{ width: Dimensions.get("window").width-20, height:200, resizeMode: "cover" }} />
            <View
             style={{position:'absolute',top:100,padding:10,gap:5}}
            >
                <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>
                    {data.businessName}
                </Text>
                <View>
                    <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                    {renderStars(data.reviews)}
                    <Text style={{color:'white',marginLeft:6,fontSize:14}}>
                        {data.reviews.length}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{padding:10,gap:10}}>
                    <Text style={{fontSize:14,color:'white',fontWeight:'bold'}}>
                        {data.shortDescription}
                    </Text>
            </View>
            {
                user.user.user_id !== data.userId &&
                <View style={{padding:10,gap:10}}>
                    <Button Teext={styles.textt} view={styles.button}  icon={<MaterialIcons name="rate-review" size={24} color="white" />} text="Add A Review" onPress={()=>{
                        router.push(`/(tabs)/Dashboard/business/AddReview`)
                    }} />
                </View>
            }
        </View>
        </>
    )
}
const styles = StyleSheet.create({
  button:{
    backgroundColor:'red',
    padding:10,
    borderRadius:100,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  textt:{
    color:'white',
    fontSize:16,
    fontWeight:'400'
  }
});

export default Business;    