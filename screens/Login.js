import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import undraw1 from '../assets/undraw1.png'
import axios from 'axios';


const Login = ({navigation, route}) => {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState("");
  
  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const authentication = (email,password) => {
  axios
  .post('https://salty-beach-49797.herokuapp.com/auth/local', {
    identifier: `${email}`,
    password: `${password}`,
  })
  .then(response => {
    
    const jwt=`${response.data.jwt}`;
    const userid=`${response.data.user.id}`;
    const image=`${response.data.user.Image}`
    navigation.navigate('HomeScreen', {
      userid:`${userid}`,
      image:`${image}`
      });
    setEmail("");
    setPassword("");
  })
  .catch(error => {
    
    alert('Incorrect email or password:', error);
  });
}
  
const validation = (email,password) =>{
   
   if(!email || !password){
       alert('Fields can not Empty');
   }
   else{
     authentication(email,password)
   }
   
}

  return (
    
    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{ alignSelf:"center", marginTop:60}}>
   <Image source={undraw1} style={{ width: 305, height: 159}} /> 
    </View>
     <ScrollView>
    <Text style={{fontSize:25, color:"#58a037",marginTop:80,marginBottom:10,textAlign:'center'}}>Login</Text>
     <View
  style={{
    borderBottomColor: '#58a037',
    borderBottomWidth: 1,
    marginBottom:40
  }}
/>
  
    <View>
    
       <TextInput
       style={style.input}
         onChangeText={onChangeEmail}
         placeholder="Enter your Email or UserName"
         value={email}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangePassword}
        secureTextEntry={true}
         placeholder="Enter your Password"
         value={password}
           
       />
       
       <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#58a037", margin:20,marginTop:50,padding: 15, float: "right" }}
         onPress={() => validation(email,password)}
        >
           <Text style={{color:'white',fontSize:17}}>Login</Text>
          </TouchableOpacity>

          <View
          style={{
                  flexDirection: 'row',
                  alignSelf:"center"
                }}>

              <Text style={{color:"#58a037",marginHorizontal:2}}> Don't have account? </Text>
              <Text style={{color:"#58a037"}} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
              
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
     marginRight:20,
  
   },
  
  }

);
export default Login;