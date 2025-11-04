import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";


function Mn({children}: {children: React.ReactNode}) {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top,width:'100%', height:'100%'}}>
        {children}
    </View>
  );
}

export default Mn;