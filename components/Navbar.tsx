import { setCurrentIndex } from '@/redux/slices/Info';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';

const { height } = Dimensions.get('window');
export default function Navbar() {

  const insets = useSafeAreaInsets();
  const {currentIndex} = useSelector((state:any)=>state.info)

  return (
    <View style={{...styles.topContainer,bottom:0}}>
    <View style={styles.container}>
      <Navitem Icon={<MaterialIcons name="search" size={30} color={currentIndex==='Search'?"red":"black"} />} text={'Search'} />
      <Navitem Icon={<MaterialIcons name="person" size={30} color={currentIndex==='Profile'?"red":"black"} />} text={'Profile'} />
      <Navitem Icon={<MaterialIcons name="bookmark" size={30} color={currentIndex==='Collections'?"red":"black"} />} text={'Collections'} />
      <Navitem Icon={<EvilIcons name="navicon" size={30} color={currentIndex==='More'?"red":"black"} />} text={'More'} />
    </View>
    </View>
  );
}
function Navitem({Icon,text}:{Icon:JSX.Element,text:string})
{
  const router = useRouter()
  const {currentIndex} = useSelector((state:any)=>state.info)
   function handlePress(){
          router.push(`/(tabs)/Dashboard/${text}`);
  }
  return(
    <Pressable style={{flex:1,justifyContent:'center',alignItems:'center'}}
    onPress={handlePress}>
      {Icon}
      <Text style={{fontSize: 10,color: currentIndex===text?"red":"black"}}
      >{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {           
    width: '100%',
    height: height *.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topContainer: {
    position: 'absolute',
    // bottom: 0,
    // height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10,
  },
});
