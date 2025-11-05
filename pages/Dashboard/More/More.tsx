import { MaterialIcons } from '@expo/vector-icons';
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
        flex: 0,
        backgroundColor: "white",
        height: Dimensions.get("window").height,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        padding:'20'
      }}>
        <View style={{
        borderBottomWidth: 1,
        borderColor: 'red',
        paddingBottom:5,
        }}>  
          <Text style={{fontSize:24,fontWeight:'500',shadowColor: '#000',}}>
            More
          </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../../assets/images/ch.jpeg')} style={{justifyContent:'center',alignItems:'center',width:'100%',height:150,resizeMode:'contain',marginTop:5,marginBottom:10}} />
        </View>
        <Item icon={<MaterialIcons name="reviews" size={24} color="black" />} text={'Add Reviews'} />
    </ScrollView>
  );
}