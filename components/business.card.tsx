import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import renderStars from './ratingStar';

const BusinessCard = ({data}) => {  
  return (
    <View style={{gap:2}}>
        <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>
            {data.businessName}
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
        {renderStars(data.reviews)}
        <Text style={{color:'white',marginLeft:6,fontSize:12}}>
            {data.reviews.length}
        </Text> 
        </View>
        <Text style={{fontSize:12,color:'white'}}>
            {data.shortDescription}
        </Text>
        <Text style={{fontSize:12,color:'white'}}>{data.locationName.slice(0,20)}</Text>
        <ScrollView   style={{ width: 320, margin: 10,flex:0,gap:10}}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
        {
            data.url.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 10 , marginRight: index === data.url.length - 1 ? 0 : 10,}} 
               
                />
            ))
        }
        </ScrollView>
    </View>
  
  )
}

export default BusinessCard