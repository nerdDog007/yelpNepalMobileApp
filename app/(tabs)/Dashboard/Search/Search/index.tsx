import Navbar from "@/components/Navbar";
import Search from "@/components/search";
import { View } from "react-native";

function Searchh(){
    return(

        <>
        <View style={{flex:1,backgroundColor:'black'}}>
            <Search/>
        </View>
        <Navbar/>
        </>
    )
}
export default Searchh;