import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

function Profile(){
    const {user}= useSelector((state:any)=>state.info)
    const router = useRouter();
    console.log(user);
    
    return (
        <View style={{alignItems: "center",padding:10}}>
            <MaterialIcons name="person" size={30} color="white" />
            <Text style={{fontSize: 20,color: "white"}}>{user.user.fullName}</Text>
            <Text style={{fontSize: 15,color: "white"}}>{user.user.email}</Text>
            <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 20,gap:10}}>
                <View style={{flexDirection: "row",alignItems: "center"}}>
                    <MaterialIcons name="person-pin-circle" size={20} color="white" />
                    <Text style={{color:'white'}}>0</Text>
                </View>
                <View  style={{flexDirection: "row",alignItems: "center"}}>
                    <MaterialIcons name="phone-android" size={20} color="white" />
                    <Text style={{color:'white'}}>0</Text>
                </View>
                <View   style={{flexDirection: "row",alignItems: "center"}}>
                    <MaterialIcons name="location-on" size={20} color="white" />
                    <Text   style={{color:'white'}}>0</Text>
                </View>
            </View>
            <View style={{marginTop: 20,alignItems: "center",flexDirection: "row",justifyContent: "space-between"}}>
                <In icon={<Octicons name="code-review" size={12} color="black" />} text="Add a Review" onPress={()=>{
                    router.push("/(tabs)/Dashboard/Search/Search")
                }} />
                <In icon={<MaterialIcons name="add-photo-alternate" size={12} color="black" />} text="Add a Photo" onPress={()=>{
                    router.push("/(tabs)/Dashboard/Search/Search")
                }}/>
                <In icon={<MaterialIcons name="check" size={12} color="black" />} text="Check In" 
                onPress={()=>{
                    router.push("/(tabs)/Dashboard/Search/Search")
                }}
                />
                <In icon={<MaterialIcons name="add-business" size={12} color="black" />} text="Add a business" onPress={()=>{
                    router.push("/(tabs)/Dashboard/More/addABusiness")
                }}/>
            </View>
        </View>
    )
}
function In({icon,text,onPress}:{icon:any,text:string,onPress:any}){
    return (
        <Pressable style={{alignItems: "center",padding:10,gap:10}} onPress={onPress}>
            <View style={{backgroundColor:'white',padding:10,borderRadius:100,opacity:0.9}}>
            {icon}
            </View>
            <Text style={{fontSize: 10,color: "white"}}>{text}</Text>
        </Pressable>
    )
}

export default Profile