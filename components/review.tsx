import { url } from "@/utils/url";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dimensions, Image, Text, View } from "react-native";
import singleStar from "./singleStar";

export default function Review({dataa}) {
    console.log(dataa.stars);
    
   async function getUser(){
        const response =await axios.get(`${url}/api/user/${dataa.userId}`);
        const data = await response.data;
        return data;
    }
    const{data,isLoading}=useQuery({
        queryKey:['user',dataa.userId],
        queryFn:getUser,
    })
    if(isLoading){
        return(
            <View style={{}}>
                <Text>Loading</Text>
            </View>
        )
    }        
    return (
        <View style={{padding:10,alignSelf:'center',gap:10,borderColor:'black',borderWidth:0.5,width:Dimensions.get('window').width-10}}>
            <View  style={{flexDirection:'row',alignItems:'center',gap:4}}>
            <MaterialIcons name="person" size={34} color="black" style={{borderColor:'black',borderWidth:1,borderRadius:100,opacity:0.5}} />
            <Text style={{fontSize:14}}>{data.name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:4}}>
            {singleStar(dataa.stars)}
            </View>
            <Text>
                {dataa.reviewText}
            </Text>
            <View style={{borderRadius:10,overflow:'hidden',flexDirection:'row',gap:4,alignItems:'center'}}>
            
            {
                dataa.images.map((image,index)=>{
                    return(
                            <Image key={index}  source={{uri:image}} style={{width:100,height:100,borderRadius:10}} />
                    
                    )
                })  
            }
            </View>
        </View>
    )
}   