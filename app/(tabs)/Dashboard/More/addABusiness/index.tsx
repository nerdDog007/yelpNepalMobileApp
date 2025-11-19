import { setMap } from '@/redux/slices/Info';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import Map from '../../../../../components/Map';

import WorkingHours from '@/components/Hours';
import { prevIdex, setDescription, setShortDescription } from '@/redux/slices/business';
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function AddBusiness() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const user = useSelector((state: any) => state.info.user);
  const map = useSelector((state:any)=>state.info.map)
  const {locationName,locationCoord ,description,shortDescription,index,hours}  = useSelector((state:any)=>state.business)
  const [sending,setSending] = useState(false)
  const dispatch = useDispatch()
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!businessName || !locationName || images.length === 0) {
      alert("Fill all fields & upload at least one image.");
      return;
    }
    const formData = new FormData();
    images.forEach((imgUri, index) => {
      formData.append('images', {
        uri: imgUri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`,
      } as any);
    });
    formData.append('businessName', businessName);
    formData.append("location", JSON.stringify(locationCoord));
    formData.append('userId', user.user.user_id);
    formData.append('locationName', locationName);
    formData.append('description', description);
    formData.append('shortDescription', shortDescription);
    formData.append('hours', JSON.stringify(hours));
    try {
      setSending(true)
      const response = await fetch("http://192.168.1.146:3000/api/business/create", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSending(false)
      dispatch(prevIdex())
      router.back();
    } catch (err) {
      
      alert("Upload failed.");
    }
  };

  return (
    <>
    {map === false && index===1 &&
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',width:'100%',gap:20}}>
            <MaterialIcons name='arrow-back' size={30} color='black' onPress={()=>dispatch(prevIdex())} />
            <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>Back</Text>
        </View>
      <Text style={styles.title}>Add Your Business</Text>

      <View style={styles.imagePickerContainer}>
        {images.length === 0 && (
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePlaceholder}>Tap to upload images</Text>
          </TouchableOpacity>
        )}
        <View style={styles.imagesRow}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(index)}
              >
                <AntDesign name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          {images.length > 0 && (
            <TouchableOpacity style={styles.addMore} onPress={pickImage}>
              <Text style={{ fontSize: 30, color: 'red' }}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
          
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        />
        <TextInput
        style={styles.input}
        placeholder="About Business in one line"
        value={description}
        onChangeText={(text) => dispatch(setDescription(text))}
        />
        <TextInput
        style={[
          styles.input
        ]}
        placeholder="About Business in 2 or 3 words"
        value={shortDescription}
        onChangeText={(text) => dispatch(setShortDescription(text))}
        />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={locationName}
        onPress={()=>{
          dispatch(setMap(true))
        }}
        />
        <View>
        </View>
      <Button title="Next" onPress={()=>handleSubmit()} />
      {sending===true&&<View>
        <ActivityIndicator size="large" color="red" />
      </View>}
    </ScrollView>
    </KeyboardAvoidingView>
    }
    {index==0 &&<WorkingHours/>}
    {map === true  && <Map/>} 
</>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop:10
  },
  imagePickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#888',
  },
  imagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 10,
  },
  addMore: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
