import Button from "@/components/Button";
import renderStars from "@/components/ratingStar";
import Review from "@/components/review";
import { setBusinessId, setIsClosed } from "@/redux/slices/Info";
import getHours from "@/utils/hours";
import closed, { getDay } from "@/utils/isClosed";
import { url } from "@/utils/url";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function Business() {
    const router = useRouter();
    const { businessId } = useLocalSearchParams();
    const dispatch = useDispatch();
    const { isClosed, user } = useSelector((state: any) => state.info);
    const [day, setDay] = useState('');
    const [hours, setHours] = useState<any>({});
    const [start, setStart] = useState('Closed');
    const [end, setEnd] = useState('Closed');
    
    console.log(user.user.user_id);

    async function handleBookmark() {
        try {
          await axios.post(
            `${url}/api/bookmark/create`,
            {
              businessId: businessId,
              userId: user.user.user_id
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            }
          );
      
          console.log("Bookmarked Successfully");
      
        } catch (error) {
          console.log("Bookmark Error:", error.response?.data || error.message);
        }
      }
    useEffect(() => {
        dispatch(setBusinessId(businessId));
    }, [businessId, dispatch]);

    async function getData() {
        const response = await axios.get(`${url}/api/search/${businessId}`);
        const data = await response.data;
        return data.data;
    }

   

    const { isLoading, data } = useQuery({
        queryKey: ['business', businessId],
        queryFn: getData,
    });    
    async function rando(businessData: any) {
            const currentDay = getDay();
            const todayHours = businessData.hours?.[currentDay] || {};
            setDay(currentDay);
            dispatch(setIsClosed(closed(businessData.hours)));
            setHours(todayHours);
            
            const startTime = todayHours?.open ? getHours(todayHours.open) : "Closed";
            const endTime = todayHours?.close ? getHours(todayHours.close) : "Closed";
            setStart(startTime);
            setEnd(endTime);
    }
    useEffect(() => {
        if (data) {
            rando(data);
        }
    }, [data]);    

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    if (!data) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No business data found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <Image 
                    source={{ uri: data.url?.[0] }} 
                    style={{
                        width: Dimensions.get("window").width, 
                        height: 200, 
                        resizeMode: "cover" 
                    }} 
                />
                <View style={{ position: 'absolute', top: 100, padding: 10, gap: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                        {data.businessName}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        {renderStars(data.reviews)}
                        <Text style={{ color: 'white', marginLeft: 6, fontSize: 14 }}>
                            {data.reviews?.length || 0}
                        </Text>
                    </View>
                </View>
                <MaterialIcons 
                    name="bookmark" 
                    size={34} 
                    color="white" 
                    style={{ position: 'absolute', top: 10, right: 20 }} 
                />
            </View>

            <View style={{ padding: 10, gap: 10 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                    {data.shortDescription}
                </Text>
                <Text style={{ fontSize: 16, color: 'black' }}>
                    {data.locationName?.slice(0, 20)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Text style={{ color: isClosed ? 'red' : 'green', fontSize: 14, fontWeight: 'bold' }}>
                        {isClosed ? 'Closed' : 'Open'}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 14 }}>
                        {start} - {end}
                    </Text>
                </View>
                <Text style={{ fontSize: 16, color: 'black' }}>
                    {data.description}
                </Text>
            </View>
            <View>

           
            <ScrollView 
            
            horizontal={true}>
                <View style={{padding:10,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}>

                    {user.user.user_id !== data.userId &&
                    <Button Teext={styles.teext} view={styles.thi} icon={<MaterialIcons name="rate-review" size={24} color="white" />} text="Add A Review" onPress={()=>{
                        router.push(`/(tabs)/Dashboard/business/AddReview`)
                    }} />}
                    <Button Teext={styles.teext} view={styles.thi} icon={<MaterialIcons name="link" size={24} color="white" />} text="Website" onPress={() => {}} />
                    <Button Teext={styles.teext} view={styles.thi} icon={<MaterialIcons name="bookmark" size={24} color="white" />} text="Save" onPress={handleBookmark} />
                    <Button Teext={styles.teext} view={styles.thi} icon={<MaterialIcons name="share" size={24} color="white" />} text="Share" onPress={() => {}} />
                    { user.user.user_id === data.userId && <Button Teext={styles.teext} view={styles.thi} icon={<MaterialIcons name="edit" size={24} color="white" />} text="Edit" onPress={() => {}} />
                    }
                </View>
            </ScrollView>
            <View>
            <MapView
    style={styles.map}
    initialRegion={{
        latitude: Number(data?.coordinates?.latitude) || 27.7172, 
        longitude: Number(data?.coordinates?.longitude) || 85.3240, 
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
}}
>
    {data?.coordinates?.latitude && data?.coordinates?.longitude && (
        <Marker
            coordinate={{
                latitude: Number(data.coordinates?.latitude),
                longitude: Number(data.coordinates?.longitude),
            }}
            title={data.businessName}
            description={data.shortDescription}
        />
    )}
</MapView>
            </View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'black',fontWeight:'bold',margin:10}}>
                    Reviews
                </Text>
                <View style={{flexDirection:'column',alignItems:'center',gap:10}}>
                {
                    data.reviews.map((review,index)=>{
                        return(
                            <Review key={index} dataa={review} />
                        )
                    })
                }
                </View>
            </View>

         </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width, 
        height: 200, 
        resizeMode: "cover" 
    },
    thi:{
        flex:0,
        backgroundColor:'red',
        flexDirection:'row',
        alignSelf: 'flex-start',
        padding:10,
        gap:6,
        alignItems:'center',
        justifyContent:'center',
    },

    teext:{
        color:'white',
    },
    button: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    textt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
});

export default Business;