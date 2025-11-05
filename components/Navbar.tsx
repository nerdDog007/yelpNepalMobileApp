import { setCurrentIndex } from '@/redux/slices/Info';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
const { height } = Dimensions.get('window');
export default function Navbar() {
  const insets = useSafeAreaInsets();
  const {currentIndex} = useSelector((state:any)=>state.info)

  return (
    <View style={{...styles.topContainer,bottom:insets.bottom}}>
    <View style={styles.container}>
      <Navitem Icon={<MaterialIcons name="search" size={30} color={currentIndex==='Search'?"red":"white"} />} text={'Search'} />
      <Navitem Icon={<AntDesign name="project" size={30} color={currentIndex==='Projects'?"red":"white"} />} text={'Projects'} />
      <Navitem Icon={<MaterialIcons name="person" size={30} color={currentIndex==='Profile'?"red":"white"} />} text={'Profile'} />
      <Navitem Icon={<MaterialIcons name="bookmark" size={30} color={currentIndex==='Collections'?"red":"white"} />} text={'Collections'} />
      <Navitem Icon={<MaterialIcons name="more" size={30} color={currentIndex==='More'?"red":"white"} />} text={'More'} />
    </View>
    </View>
  );
}

function Navitem({Icon,text}:{Icon:JSX.Element,text:string})
{
  const dispatch = useDispatch()
  const {currentIndex} = useSelector((state:any)=>state.info)
  return(
    <Pressable style={{flex:1,justifyContent:'center',alignItems:'center'}}
    onPress={()=>{dispatch(setCurrentIndex(text))}}
    >
      {Icon}
      <Text style={{fontSize: 10,color: currentIndex===text?"red":"white"}}
      >{text}</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {           
    width: '100%',
    height: height *.1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topContainer: {
    position: 'absolute',
    // bottom: 0,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 10,
  },
});
