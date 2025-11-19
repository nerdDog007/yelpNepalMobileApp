import Button from "@/components/Button";
import renderStars from "@/components/ratingStar";
import { setBusinessId, setIsClosed } from "@/redux/slices/Info";
import getHours from "@/utils/hours";
import closed, { getDay } from "@/utils/isClosed";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
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
    
    useEffect(() => {
        dispatch(setBusinessId(businessId));
    }, [businessId, dispatch]);

    async function getData() {
        const response = await axios.get(`http://192.168.1.146:3000/api/search/${businessId}`);
        const data = await response.data;
        return data.data;
    }

    const { isLoading, data } = useQuery({
        queryKey: ['business', businessId],
        queryFn: getData,
    });

    // Fixed rando function
    async function rando(businessData: any) {
        
            const currentDay = getDay();
            ;
            
            const todayHours = businessData.hours?.[currentDay] || {};
            
            
            setDay(currentDay);
            // dispatch(setIsClosed(closed(businessData.hours)));
            dispatch(setIsClosed(closed({thursday:{open:'10:00',close:'12:00'}})));
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                    size={28} 
                    color="black" 
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
            {user?.user?.user_id !== data.userId && (
                <View style={{ padding: 10, position: 'absolute', bottom: 20, left: 0, right: 0 }}>
                    <Button 
                        Teext={styles.textt} 
                        view={styles.button}  
                        icon={<MaterialIcons name="rate-review" size={24} color="white" />} 
                        text="Add A Review" 
                        onPress={() => {
                            router.push(`/(tabs)/Dashboard/business/AddReview`);
                        }} 
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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