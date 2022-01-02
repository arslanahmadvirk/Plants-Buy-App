import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import undraw from '../assets/undraw.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const Signup = ({navigation, route}) => {

  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [image, setImage] = useState(null);

  const onChangeUsername = (text) => setUsername(text);
  const onChangeName = (text) => setName(text);
  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);
  const onChangePhone = (text) => setPhone(text);
  const onChangeAddress = (text) => setAddress(text);

const postUser = (username,name,email,password,phone,address,image) => {
axios
  .post('https://salty-beach-49797.herokuapp.com/auth/local/register', {
    username: `${username}`,
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
    Phonenumber:`${phone}`,
   'Image':`${image}`,
    address: `${address}`

  })
  .then(response => {
   
    alert('User Registered Successfully!');
    navigation.navigate('Login');
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

   const validation = (username,name,email,password,phone,address,image) =>{
    if(!username || !name || !email || !password || !phone || !address || !image){
        alert('Fields can not empty');
    }
    else{
        postUser(username,name,email,password,phone,address,image);
    }
}

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const UploadImage = () => {
    return (
       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
        onPress={() => pickImage()} 
        >
        <Text>Upload Image</Text>
        <Icon name="image" size={40} />
      </TouchableOpacity>
    )}

const ImagePlace = () => {
    return (
       <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
        onPress={() => pickImage()} 
        >
      <Image source={{ uri:image }} style={{ width: 60, height: 60, }} />
     </TouchableOpacity>
    )
    }


  return (
    

    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
    <View style={{ alignSelf:"center"}}>
     <Image source={undraw} style={{ width: 305, height: 159 }} /> 
    </View>
    <ScrollView>
    <Text style={{fontSize:25, color:"#58a037",marginTop:10,marginBottom:5,textAlign:'center'}}  >Registration</Text>
     <View
  style={{
    borderBottomColor: '#58a037',
    borderBottomWidth: 1,
    marginBottom:20
  }}
/>
 
    <View>
      <TextInput
       required
       style={style.input}
         onChangeText={onChangeUsername}
         placeholder="Enter your UserName"
         value={username}
           
       />

       <TextInput
       required
        style={style.input}
         onChangeText={onChangeName}
         placeholder="Enter your Name"
         value={name}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangeEmail}
         placeholder="Enter your Email"
         value={email}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangePassword}
         secureTextEntry={true}
         placeholder="Enter your Password"
         value={password}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangePhone}
         placeholder="Enter your Phone Number"
         value={phone}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangeAddress}
         placeholder="Enter your Address"
         value={address}
           
       />

       {!image?(<UploadImage/>):(<ImagePlace/>)}

       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#58a037", margin:20, padding: 15, float: "right" }}
                 onPress={() => validation(username,name,email,password,phone,address,image)}
                 
                >
                  <Text style={{color:'white',fontSize:17}}>Sign Up</Text>
                </TouchableOpacity>
                <View>
                <Text style={{color:"#58a037", alignSelf:"center",marginBottom:10}}
                 onPress={() => navigation.navigate('Login')}> Already have account? Login </Text>
                </View>
        </View>
        </ScrollView>
        
    </View>
  );
};

const style=StyleSheet.create(
  {
   input:
   {
     backgroundColor:"white",
     padding:5,
     borderBottomColor: '#58a037',
     borderBottomWidth: 1,
     marginBottom:20,
     marginLeft:20,
     marginRight:20
    
   },
  
  }

);
export default Signup;
