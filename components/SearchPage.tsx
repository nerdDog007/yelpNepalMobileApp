import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BusinessCard from './business.card';
import Searchh from './search';
const getAverageRating = (ratingArray) => {
    if (!ratingArray || ratingArray.length === 0) return 0;
    const sum = ratingArray.reduce((a, b) => a + b, 0);
    return sum / ratingArray.length;
  };
function Search(){    
    const router = useRouter();
    const { user } = useSelector((state: any) => state.info);
    const fetchData = async () => {
        const response = await fetch(`http://192.168.1.146:3000/api/business/searchAll`);
        const data = await response.json();
        return data;
    };
    const { data, isLoading } = useQuery({
        queryKey: ['search'],
        queryFn:fetchData
    }) 
     const onpress=()=>{
        router.push(`/(tabs)/Dashboard/Search/Search`)
    }
    if (isLoading) {
        return <ActivityIndicator size="large" color="red" />
    }
    return(
        <ScrollView style={{paddingHorizontal:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Ap Icon={<MaterialIcons name="local-restaurant" size={20} color="white" />} text="Restaurant" />
                <Ap Icon={<AntDesign name="car" size={20} color="white" />} text="Auto Repair" />
                <Ap Icon={<AntDesign name="truck" size={20} color="white" />} text="Movers" />
                <Ap Icon={<MaterialIcons name="plumbing" size={20} color="white" />} text="Plumbers" />
            </View>
            <Searchh onPress={onpress}/>  
            {
                data?.map((business:any)=>{
                    return(
                        <Link key={business.businessId} href={`/Dashboard/business/${business._id}`}>
                        <BusinessCard key={business.businessId} data={business}/>
                        </Link>
                    )
                })
            }
        </ScrollView>
    )
}
function Ap({Icon,text}:any)
{
    return(
        <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'black',padding:10,borderRadius:10}}>
                {Icon}

            <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>
                {text}
            </Text>
        </View>
    )
}
export default Search;