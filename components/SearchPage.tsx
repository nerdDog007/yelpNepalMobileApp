import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Searchh from './search';
function Search(){
    return(
        <View style={{paddingHorizontal:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Ap Icon={<MaterialIcons name="local-restaurant" size={20} color="white" />} text="Restaurant" />
                <Ap Icon={<AntDesign name="car" size={20} color="white" />} text="Auto Repair" />
                <Ap Icon={<AntDesign name="truck" size={20} color="white" />} text="Movers" />
                <Ap Icon={<MaterialIcons name="plumbing" size={20} color="white" />} text="Plumbers" />

            </View>
            <Searchh/>
        </View>
    )
}

function Ap({Icon,text})
{
    return(
        <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'black',padding:10,borderRadius:10}}>
                {Icon}

            <Text style={{fontSize:12,fontWeight:'bold',color:'white'}}>
                {text}
            </Text>
        </View>
    )
}
export default Search;