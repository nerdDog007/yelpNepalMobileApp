import Back from '@/components/back'
import Search from '@/components/search'
import { Text, TouchableOpacity, View } from 'react-native'

export default function AddReview(){
    return(
        <View style={{flex:1,padding:12}}>
            <Back text={'Add Review'} />
            <Search />
            <View style={{flex:1,justifyContent:'center',alignItems:'center',gap:12}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                    No Results found
                </Text>
                <TouchableOpacity style={{backgroundColor:'red',padding:8,borderRadius:4}}>
                    <Text style={{color:'white'}}>Retry</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}