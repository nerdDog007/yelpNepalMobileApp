import { prevIdex } from "@/redux/slices/business";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
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
            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>Back</Text>
        </View>
        <View style={{marginTop:20}}>
        {/* <Ap day="Monday" /> */}
        {
          days.map((day)=>{
            return(
              <Ap key={day} day={day} />
            )
          })
        }
        </View>
        {/* <DateTimePicker
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
        /> */}
    </View>
  )
}

function Ap({day}:{day:string})
{
  const [opened, setOpened] = useState(true);
  return(
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // width: '60%',
      marginBottom: 20,
      gap: 10
    }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' ,width:'50'}}>
          {day.slice(0, 3)}
        </Text>
      </View>
      
      <View>
        <Text style={{
          backgroundColor: 'green',
          paddingHorizontal: 15,
          paddingVertical: 8,
          borderRadius: 100,
          color: 'white',
          
        }}
        onPress={()=>setOpened(!opened)}
        >
          {opened ? 'Open' : 'Closed'}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text>10:00 AM</Text>
        <Text>-</Text>
        <Text>10:00 PM</Text>
      </View>
    </View>
  )
}
export default WorkingHours;