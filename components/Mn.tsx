import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


function Mn({children}: {children: React.ReactNode}) {
    const insets = useSafeAreaInsets();
  return (
    <View style={{backgroundColor:'red',paddingTop: insets.top,width:'100%', height:Dimensions.get('window').height}}>
        {children}
    </View>
  );
}

export default Mn;