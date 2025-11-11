import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import renderStars from './ratingStar';
import Searchh from './search';
const getAverageRating = (ratingArray) => {
    if (!ratingArray || ratingArray.length === 0) return 0;
    const sum = ratingArray.reduce((a, b) => a + b, 0);
    return sum / ratingArray.length;
  };
function Search(){    
    const { user } = useSelector((state: any) => state.info);
    const fetchData = async () => {
        const response = await fetch(`http://192.168.1.146:3000/api/business/search`);
        const data = await response.json();
        return data;
    };
    const { data, isLoading } = useQuery({
        queryKey: ['search'],
        queryFn:fetchData
    }) 
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
            <Searchh/>  
            {
                data?.map((business:any)=>{
                    return(
                        <>
                        <View style={{marginTop:20}} key={business.businessId}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>
                                {business.businessName}
                            </Text>
                            <Text style={{fontSize:12,color:'white'}}>
                                {business.locationName.substring(0,40)}
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
                                {renderStars(getAverageRating(business.rating))}
                                <Text style={{ color: "white", marginLeft: 6, fontSize: 12 }}>
                                    {getAverageRating(business.rating).toFixed(1)}
                                </Text>
                            </View>
                            
                            <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            style={{ marginVertical: 10 }}
                            >
                            {business.url.map((image, index) => (
                                <Image 
                                source={{ uri: image }} 
                                style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} 
                                key={index} 
                                />
                            ))}
                            </ScrollView>
                        </View>
                        </>
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