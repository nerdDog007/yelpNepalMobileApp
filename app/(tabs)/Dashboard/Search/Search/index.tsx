import BusinessCard from "@/components/business.card";
import Navbar from "@/components/Navbar";
import Search from "@/components/search";
import { setSearchIndex } from "@/redux/slices/SearchResult";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "expo-router";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function Searchh(){
    const dispatch = useDispatch()
    const {searchResult ,searchIndex}=useSelector((state:any)=>state.searchResult)
    async function getData(){
         const response = await axios.get(`http://192.168.1.146:3000/api/search?data=${searchIndex}`)
         const data = await response.data;
         return data
    }
    const {isLoading,data,refetch} = useQuery({
        queryKey:['searchResult'],
        queryFn:getData,
        enabled:false
    })
    const onPressBtn=async ()=>{        
        refetch()
    }
    const onChangeText=(text:string)=>{
        dispatch(setSearchIndex(text))
    }
    return(
        <>
        <View style={{flex:1,backgroundColor:'black'}}>
            <Search onPressBtn={onPressBtn} onChangeText={onChangeText} value={searchIndex}/>
            {data && <View style={{marginTop:20,padding:10}}>
                    {data.data.map((business:any)=>{
                        
                        return(
                            <Link key={business.businessId} href={`/Dashboard/business/${business._id}`}>
                            <BusinessCard key={business.businessId} data={business}/>
                            </Link>
                        )
                    })}
                </View>}
        </View>
        <Navbar/>
        </>
    )
}
export default Searchh;