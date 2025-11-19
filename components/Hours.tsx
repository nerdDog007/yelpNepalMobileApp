import { setHoursForDay, setIndex } from "@/redux/slices/business";
import getHours from "@/utils/hours";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function WorkingHours() {
  const dispatch = useDispatch()
  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
  const {hours}=useSelector((state:any)=>state.business)
  const router = useRouter()
  return(
    <View style={{padding:10}}>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'60%'}}>
            <MaterialIcons name='arrow-back' size={30} color='black' onPress={()=>router.back()} />
            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>Back</Text>
        </View>
      <Text style={{fontSize:20,fontWeight:'bold',color:'black',textAlign:'center'}}>
        Business Working Hours
      </Text>
        <View style={{marginTop:20}}>
        {
          days.map((day)=>{
            return(
              <Ap key={day} day={day} open={hours[day].open} close={hours[day].close} hours={hours}/>
            )
          })
        }
        </View>
        <Text
        onPress={()=>dispatch(setIndex())}
        style={{backgroundColor:'red',textAlign:'center',color:'white',padding:10,borderRadius:100,marginTop:20,fontSize:16}}
        >
          Next
        </Text>
    </View>
  )
}

function Ap({day,close,open,hours}:{day:string,close:string,open:string,hours:any})
{
  const closed = getHours(close);
  const opend = getHours(open);
  const [opened, setOpened] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState("sunday");
  const [openOrClose, setOpenOrClose] = useState("");
  const dispatch = useDispatch()
  
  return(
    <>
          
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      gap: 10
    }}>
     
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black',width:Dimensions.get('window').width/6}}>
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
        onPress={()=>{
          setOpened(!opened)
          dispatch(setHoursForDay({
            day: day,
            open: hours[day].open,
            close: hours[day].close,
            closed: !hours[day].closed
          }))
        }}
        >
          {opened ? 'Open' : 'Closed'}
        </Text>
      </View>
      
      <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
        onPress={()=>{
          setCurrentDay(day)
          setClicked(true)
          setOpenOrClose("open")
        }}
        >{opend}</Text>
        <Text>-</Text>
        <Text
        onPress={()=>{
          setCurrentDay(day)
          setClicked(true)
          setOpenOrClose("close")
        }}
        >{closed}</Text>
      </Pressable>
    </View>
    {
  clicked && (
    <DateTimePicker
      mode="time"
      value={time}
      is24Hour={false}
      onChange={(event, selectedTime) => {
        if (selectedTime) {
          const hourss = selectedTime.getHours();
          const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
          
          if (openOrClose === "open") {
            dispatch(setHoursForDay({
              day: currentDay,
              open: `${hourss}:${minutes}`,
              close:hours[day].close,
              closed: false
            }));
          } else if (openOrClose === "close") {
            dispatch(setHoursForDay({
              day: currentDay,
              open: hours[day].open,
              close: `${hourss}:${minutes}`,
              closed: false 
            }));
          }
          setClicked(false);

        }
      }}
    />
  )
}
  </>
  )
}
export default WorkingHours;