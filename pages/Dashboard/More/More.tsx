import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Item from '../../../components/Item';


export default function More() {
  const insets = useSafeAreaInsets();
  const { user } = useSelector((state: any) => state.info);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
        height: Dimensions.get("window").height,
        // height:'100%',
        // marginBottom,
        // paddingHorizontal:'20'
      }}>
        <View style={{
        paddingBottom:5,
        width:Dimensions.get('window').width,
        paddingHorizontal:'20',
        backgroundColor:'white',
        paddingTop: insets.top+10,
        elevation:10,
        }}>  
          <Text style={{fontSize:24,fontWeight:'500',shadowColor: '#000',}}>
            More
          </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
        }}>
          <Image source={require('../../../assets/images/ch.jpeg')} style={{justifyContent:'center',alignItems:'center',width:'100%',height:150,resizeMode:'contain',marginTop:5,marginBottom:10,}} />
        </View>
        <View style={{flexDirection:'column',padding:10,gap:20,backgroundColor:'white',
          paddingHorizontal:'20',elevation:10,
        }}>
        <Item icon={<MaterialIcons name="reviews" size={22} color="black" />} text={'Add Reviews'} href='/(tabs)/Dashboard/More/addReview' />
        <Item icon={<MaterialIcons name="camera-alt" size={22} color="black" />} text={'Add a photo or video'} href='/(tabs)/Dashboard/More/addPhoto' />
        <Item icon={<MaterialIcons name="check-circle-outline" size={22} color="black" />} text={'Check In'} href='/(tabs)/Dashboard/More/checkIn' />
        <Item icon={<MaterialIcons name="message" size={22} color="black" />} text={'Messages'} href='/(tabs)/Dashboard/More/messages' />
        <Item icon={<MaterialIcons name="circle-notifications" size={22} color="black" />} text={'Notifications'} href='/(tabs)/Dashboard/More/notifications' />
        <Item icon={<Feather name='activity'size={22} color="black" />}text='Activity Feed' href='/(tabs)/Dashboard/More/activity'/> 
        </View>
        <View style={{flexDirection:'column',padding:10,gap:20,backgroundColor:'white',
          paddingHorizontal:'20',elevation:10,marginTop:10,
        }}>
          <Text style={{fontSize:18,fontWeight:'500',shadowColor: '#000',}}>
            NepaliYelp for Business
          </Text>
          <Item icon={<MaterialIcons name="business-center" size={22} color="black" />} text={'Add a Business'} href='/(tabs)/Dashboard/More/addABusiness'/>
          <Item icon={<MaterialIcons name="explore" size={22} color="black" />} text={'Explore for Business'} 
          href='/(tabs)/Dashboard/More/explore'
          />
        </View>
        <View style={{flexDirection:'column',padding:10,gap:20,backgroundColor:'white',
          paddingHorizontal:'20',elevation:10,marginTop:10,
        }}>
          <Text style={{fontSize:18,fontWeight:'500',shadowColor: '#000',}}>
            Settings and Support
          </Text>
          <Item icon={<MaterialIcons name="settings" size={22} color="black" />} text={'Settings'} 
          href='/(tabs)/Dashboard/More/setting'
          />
          <Item icon={<MaterialIcons name="help" size={22} color="black" />} text={'Support Center'} 
          href='/(tabs)/Dashboard/More/support'
          />
        </View>
          
    </ScrollView>
  );
}