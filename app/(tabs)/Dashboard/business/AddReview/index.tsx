import Back from "@/components/back";
import { setInputReview, setStars } from "@/redux/slices/reviewSlice";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function AddReview(){
    const m = [1,2,3,4,5]
    const dispatch = useDispatch()
    const router = useRouter()
    const {stars,inputReview}=useSelector((state:any)=>state.review)
    const {businessId,user}=useSelector((state:any)=>state.info)
    const [sending,setSending]=useState(false)
    console.log(user.user.user_id);
    
    const [height, setHeight] = React.useState(100);
      const [images, setImages] = useState<string[]>([]);
    
     const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          alert("Permission required!");
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.7,
        });
    
        if (!result.canceled) {
          setImages(prev => [...prev, result.assets[0].uri]);
        }
      };
      async function handleSubmit(){
        if (!inputReview) {
            alert("Fill all fields & upload at least one image.");
            return;
          }
        const formData = new FormData();
        images.forEach((imgUri, index) => {
          formData.append('images', {
            uri: imgUri,
            type: 'image/jpeg',
            name: `image_${index}.jpg`,
          } as any);
        });

        formData.append('businessId', businessId);
        formData.append('stars', stars);
        formData.append('inputReview', inputReview);
        formData.append('userId', user.user.user_id);
        try {
            setSending(true)
          const response = await fetch("http://192.168.1.146:3000/api/review/create", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          dispatch(setInputReview(''))
          dispatch(setStars(0))
          setImages([])
          setSending(false)
          router.back()
        } catch (err) {
          alert("Upload failed.");
        }
      }
    async function getData(){
        const response = await axios.get(`http://192.168.1.146:3000/api/search/${businessId}`)
        const data = await response.data;
        return data.data
    }
    console.log(images);
    
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
        keyboardShouldPersistTaps="handled">
                <View style={{flex:1,backgroundColor:'white',justifyContent:'start',alignItems:'start',gap:28}}>
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
            <View style={{flexDirection:'row',gap:10}}>
                {
                    m.map((item,index)=>{
                        return(
                            <Pressable  key={index} onPress={()=>{
                                dispatch(setStars(index+1))
                            }}>
                            <View style={{backgroundColor:'gray',padding:2}}>
                                <FontAwesome
                                    name={stars >= index + 1 ? "star" : "star-o"}
                                    size={28} color="white" />
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
                    value={inputReview}
                    onChangeText={(text)=>dispatch(setInputReview(text))}
                    />
                    <Pressable onPress={pickImage}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,backgroundColor:'gray',opacity:.4,padding:5,borderRadius:10}}
                    >
                    <MaterialIcons name="enhance-photo-translate" size={24} color="black"/>
                    </View>
                </Pressable>
                <View style={{flexDirection:'row',gap:10,marginTop:10}}>
                {
                    images.map((uri, index) => (
                        <View key={index}>
                        <Image  source={{ uri }} style={{ width: 80, height:80, resizeMode: "cover" }} />
                        <MaterialIcons style={{position:'absolute',top:0,right:0}} name="delete" size={24} color="red" onPress={()=>{
                            setImages(prev => prev.filter((_, i) => i !== index))
                        }} />
                        </View>
                    ))
                }
                </View>
               
            </View>
            </View>
            <TouchableOpacity style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',borderRadius:100,backgroundColor:'red',position:'absolute',bottom:0,left:'40%'}}  onPress={handleSubmit}>
            <Text style={{flex:1,padding:10,textAlign:'start',fontSize:16,color:'white',backgroundColor:'red',fontWeight:'bold', borderRadius:100}}>
                Post Review
            </Text>
        </TouchableOpacity>
        </ScrollView>
                {sending===true&&<View>
                <ActivityIndicator size="large" color="red" />
            </View>}
        </KeyboardAvoidingView>
        </>
    )
}
export default AddReview;