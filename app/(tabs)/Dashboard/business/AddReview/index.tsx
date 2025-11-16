import Back from "@/components/back";
import { setStars } from "@/redux/slices/reviewSlice";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function AddReview(){
    const m = [1,2,3,4,5]
    const dispatch = useDispatch()
    const {stars}=useSelector((state:any)=>state.review)
    const {businessId}=useSelector((state:any)=>state.info)
    const [height, setHeight] = React.useState(100);
    console.log(businessId)
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
    return(
        <>
    <KeyboardAvoidingView     
    style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
        <ScrollView
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
                <View style={{flex:1,backgroundColor:'white',justifyContent:'start',alignItems:'start',gap:18}}>
            <Back text={"Back"}/>
            <View style={{flexDirection:'row',alignItems:'center',gap:4}}>
                <Image source={{ uri: data.url[0] }} style={{ width: 80, height:80, resizeMode: "cover" }} />
                <View style={{gap:2}}>
                    <Text style={{fontSize:14,fontWeight:'bold',color:'black'}}>
                        {data.businessName}
                    </Text>
                    <Text style={{color:'black',marginLeft:6,fontSize:14}}>
                        {data.shortDescription}
                    </Text>
                </View>
            </View>
            <View style={{flexDirection:'column',alignItems:'center',flex:0,gap:6}}>
            <Text style={{fontSize:18,color:'black',fontWeight:'bold'}}>
                How would you rate your experience?
            </Text>
            <View style={{flexDirection:'row'}}>               
                {
                    m.map((item,index)=>{
                        return(
                            <Pressable  key={index} onPress={()=>{
                                dispatch(setStars(index+1))
                            }}>
                            <View style={{backgroundColor:'red',padding:2}}>
                                <FontAwesome
                                    name={stars >= index + 1 ? "star" : "star-o"}
                                    size={28} color="yellow" />
                            </View>
                            </Pressable>
                        )
                    })
                }
            </View>
            </View>
            <View>
                <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>
                    Tell us what you liked about this business?
                </Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 10,
                        padding: 10,
                        fontSize: 16,
                        color: "black",
                        minHeight: 100,
                        height,
                        textAlignVertical: "top",
                    }}
                    multiline
                    onContentSizeChange={(e) =>
                        setHeight(e.nativeEvent.contentSize.height)
                    }
                    />
            </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    )
}
export default AddReview;