import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const { height } = Dimensions.get('window');

export default function Navbar() {
  
  return (
    <View style={styles.topContainer}>
    <View style={styles.container}>
      <Navitem Icon={<MaterialIcons name="home" size={30} color="white" />} text={'Home'} />
      <Navitem Icon={<MaterialIcons name="search" size={30} color="white" />} text={'Search'} />
      <Navitem Icon={<MaterialIcons name="add" size={30} color="white" />} text={'Post'} />
      <Navitem Icon={<MaterialIcons name="notifications" size={30} color="white" />} text={'Notifications'} />
      <Navitem Icon={<MaterialIcons name="person" size={30} color="white" />} text={'Profile'} />
    </View>
    </View>
  );
}

function Navitem({Icon,text}:{Icon:JSX.Element,text:string})
{
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {Icon}
      <Text style={{fontSize: 9,color: 'white'}}>{text}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {           
    width: '100%',
    height: height * 0.1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  topContainer: {
    width: '100%',
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
