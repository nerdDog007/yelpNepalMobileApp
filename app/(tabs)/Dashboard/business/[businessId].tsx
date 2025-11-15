import renderStars from "@/components/ratingStar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Business({params}){
    const {businessId}=useLocalSearchParams()
    async function getData(){
        const response = await axios.get(`http://192.168.1.146:3000/api/search/${businessId}`)
        const data = await response.data;
        return data.data
    }
    const {isLoading,data}=useQuery({
        queryKey:['business',businessId],
        queryFn:getData,
    })
    if(isLoading){
        return(
            <ActivityIndicator size="large" color="red" />
        )
    };
    console.log(data);
    
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
        </View>
        </>
    )
}
export default Business;    