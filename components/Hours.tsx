import { prevIdex, setHoursForDay } from "@/redux/slices/business";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function WorkingHours() {
  const dispatch = useDispatch()
  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
  const {hours}=useSelector((state:any)=>state.business)
  console.log(hours[days[6]]);
  const [time, setTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState("sunday");
  return(
    <View style={{padding:10}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'60%'}}>
            <MaterialIcons name='arrow-back' size={30} color='black' onPress={()=>dispatch(prevIdex())} />
            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>back</Text>
        </View>
        <Ap day="Monday" open="9:00 AM" close="5:00 PM" />
        <DateTimePicker
          mode="time"
          value={time}
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          // onChange={onTimeChange}
          onChange={(event, selectedTime) => {
            const hours= selectedTime.getHours();
            const minutes= selectedTime.getMinutes();
            dispatch(setHoursForDay({
              day:currentDay,
              open:`${hours}:${minutes}`,
              close:`${hours}:${minutes}`,
              closed:false
            }))
          }}
        />
    </View>
  )
}

function Ap({day,open,close}:any)
{
  return(
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width:'60%',marginBottom:20}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>
        {day}
      </Text>
      <Text style={{alignSelf:'center'}}>Open</Text>
    </View>
  )
}
export default WorkingHours;