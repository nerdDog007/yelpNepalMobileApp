import { setToken, setUser } from "@/redux/slices/Info";
import { setHasAccount, setLogPassword } from "@/redux/slices/logSlice";
import { nextStep, prevStep, setEmail, setFullName, setPassword } from "@/redux/slices/SignUp";
import { storeUserData } from "@/utils/storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Animated, Dimensions, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");


export default function Signup() {
  const {step} = useSelector((state:any)=>state.signup)
    if (step===0) {
     return  <Welcome/>
    }
    if (step===1) {
      return<Name/>
    }
}
function Welcome()
{
  const {hasAccount,password} = useSelector((state: any) => state.auth);
  const {email} = useSelector((state: any) => state.signup);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [errorMsg,setErrorMsg]= React.useState("")
  const errorOpacity = React.useRef(new Animated.Value(0)).current;
  const errorTranslateY = React.useRef(new Animated.Value(10)).current;
  const router = useRouter();

  async function checkUser(){
    const res = await fetch("http://192.168.1.146:3000/api/auth/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
      })
    });
    const data = await res.json();
    console.log(data.hasAccount)
    
    if (data.hasAccount) {
      dispatch(setHasAccount(true))
    }
    else if (data.hasAccount===false) {
      dispatch(setHasAccount(false))
      dispatch(nextStep())
    }
    else if (data.hasAccount===false && !data.isValidEmail) {
      setErrorMsg("Invalid Email")
    }
  }
  React.useEffect(() => {
    if (errorMsg) {
      Animated.parallel([
        Animated.timing(errorOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(errorTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(errorOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(errorTranslateY, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [errorMsg]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {      
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  } , []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: width * 0.85,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
            Welcome to NepaliYelp
          </Text>

          
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Checkbox status={checked ? "checked" : "unchecked"} onPress={() => setChecked(!checked)} />
            <Text style={{ color: "blue" }}>I agree to the Terms & Conditions</Text>
          </View>

          
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 8,
              paddingVertical: 12,
              marginBottom: 20,
            }}
          >
            <AntDesign name="google" size={24} />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>Sign up with Google</Text>
          </TouchableOpacity>

         
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
            <Text style={{ marginHorizontal: 10, color: "gray", fontWeight: "bold" }}>OR</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray" }} />
          </View>

          
          {hasAccount===false&&<TextInput
            placeholder="Email"
            style={{
              width: "100%",
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginBottom: keyboardHeight,
            }}
            value={email}
            onChangeText={(text)=>dispatch(setEmail(text)) }
          />}
          {hasAccount&&<TextInput value={password} placeholder="Password" style={{
              width: "100%",
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginBottom: keyboardHeight,
              marginTop:10
            }}
            onChangeText={(text)=>dispatch(setLogPassword(text))}
            />

            }
          <Text style={{ fontSize: 12, color: "gray", marginBottom: 20 }}>
            We will never share your information with anyone else.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              width: "100%",
              paddingVertical: 15,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={async ()=>{
              if (password.length>3) {
                try {
                  const res = await fetch("http://192.168.1.146:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email:email,
                      password:password
                    }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    dispatch(setUser(data));
                    dispatch(setToken(data.token))
                    router.replace("/(tabs)/Dashboard/Search");
                    await storeUserData(data,data.token)
                  } else {
                    setErrorMsg("Invalid Password");
                  }
                } catch (err) {
                  console.error(err);
                }
              }
              if (checked) {
                checkUser()
                setErrorMsg("")
              }
              else
                setErrorMsg("click agree on terms and condition")
            }}
            >
            <Text style={{ color: "white", fontWeight: "bold" }}
            >Continue with Email</Text>
          </TouchableOpacity>
          {errorMsg ? (
  <Animated.Text
    style={{
      color: "red",
      marginTop: 10,
      textAlign: "center",
      opacity: errorOpacity,
      transform: [{ translateY: errorTranslateY }],
    }}
  >
    {errorMsg}
  </Animated.Text>
) : null}
        </View>
         </ScrollView>
    </View>
  );


}

function Name(){
  const dispatch = useDispatch()
  const router = useRouter();


  const {fullName,email,password} = useSelector((state:any)=>state.signup)
  const {coord} = useSelector((state:any)=>state.auth)
  const user = useSelector((state) => state.info.user);
 return(
  <View style={{flex:1,justifyContent:'start',alignItems:'start',padding:15,backgroundColor:'white'}}>
    <View style={{width:'100%',borderBottomColor:'pink',borderBottomWidth:1,paddingBottom:10}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",width:'60%'}}>
    <MaterialIcons name="arrow-back" size={28} color="black" onPress={()=>{dispatch(prevStep())}}/>
    <Text style={{fontSize:20,fontWeight:'500'}}>NepaliYelp</Text>
      </View>
    </View>
    <View style={{flex:1,justifyContent:'start',alignItems:'start',padding:15,gap:14}}>
      <Text>What should we call you?</Text>
      <TextInput style={{width:'100%',height:'auto',borderColor:'gray',borderWidth:1,borderRadius:5,paddingHorizontal:10,marginBottom:10}} 
      placeholder="Full Name"
      value={fullName}
      onChangeText={(text)=>dispatch(setFullName(text))}
      />
      <TextInput style={{width:'100%',height:'auto',borderColor:'gray',borderWidth:1,borderRadius:5,paddingHorizontal:10,marginBottom:10}} 
      placeholder="Your New Password"
      value={password}
      onChangeText={(text)=>dispatch(setPassword(text))}
      />
      <TouchableOpacity>
      <Text
  style={{
    textAlign: "center",
    backgroundColor: "red",
    padding: 10,
    color: "white",
    fontWeight: "bold",
  }}
  onPress={async () => {
    try {
      const res = await fetch("http://192.168.1.146:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullName,
          password,
          coord,
        }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data));
        dispatch(setToken(data.token))
        await storeUserData(data,data.token)
        router.replace("/(tabs)/Dashboard/Search");
      } else {
        console.log("Signup failed:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }}
>
  Continue
</Text>

            </TouchableOpacity>
    </View>
  </View>
 )
}

