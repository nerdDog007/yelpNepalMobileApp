import BusinessCard from "@/components/business.card";
import Navbar from "@/components/Navbar";
import { setCurrentIndex } from "@/redux/slices/Info";
import { url } from "@/utils/url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const height = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { user ,currentIndex} = useSelector((state:any) => state.info);
  async function getData(){
    const response = await axios.get(`${url}/api/bookmark/getAll/${user.user.user_id}`)
    const data = await response.data;
    return data
  }
  const {data,isLoading}=useQuery({ queryKey:['bookmarks'],queryFn:getData })
   useEffect(() => {
      dispatch(setCurrentIndex("Collections"));
    }, []);
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="red" />
            </View>
        )
    }
        
  return (
  <View
    style={{
      flex: 0,
      backgroundColor: "black",
      paddingBottom: insets.bottom+height*.1,
      height: '100%',
      padding:10,
    }}>
      {
        data.map((business:any,index)=>{
            return(
                <Link key={index} href={`/Dashboard/business/${business._id}`}>
                <BusinessCard data={business}/>
                </Link>
            )
        })
      }
    <Navbar />
  </View>
  );
}