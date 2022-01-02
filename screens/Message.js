import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import undraw from '../assets/support.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


const Signup = ({navigation, route}) => {
const userid = route.params;
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onChangeName = (text) => setName(text);
  const onChangeSubject = (text) => setSubject(text);
  const onChangeMessage = (text) => setMessage(text);

const postUser = (name,subject,message) => {
axios
  .post('https://salty-beach-49797.herokuapp.com/messages', {
    Name: `${name}`,
    Subject:`${subject}`,
    Message: `${message}`,
    user:`${userid}`
  })
  .then(response => {
   
    alert('Message Sent Successfully!');
    setName("");
    setSubject("");
    setMessage("");
  })
  .catch(error => {
    
    alert('Please type Correct Email:', error);
  });
}

   const validation = (name,subject,message) =>{
    if(!name || !subject || !message ){
        alert('Fields can not empty');
    }
    else{
        postUser(name,subject,message);
    }
}

  return (
    
    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
    <View style={{ alignSelf:"center",marginTop:50}}>
     <Image source={undraw} style={{ width: 305, height: 159 }} /> 
    </View>
    <ScrollView>
    <Text style={{fontSize:25, color:"#58a037",marginTop:10,marginBottom:5,textAlign:'center'}} >Customer Support</Text>
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
         onChangeText={onChangeName}
         placeholder="Your Name"
         value={name}
           
       />
      
       <TextInput
       style={style.input}
         onChangeText={onChangeSubject}
         placeholder="Your Subject"
         value={subject}
           
       />
       <TextInput
       style={style.messageStyle}
         multiline
         maxLength={500}
         onChangeText={onChangeMessage}
         placeholder="Your Message"
         value={message}
           
       />
       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#58a037", margin:20, padding: 15, float: "right" }}
                 onPress={() => validation(name,subject,message)}
                >
                  <Text style={{color:'white',fontSize:17}}>Send Message</Text>
                </TouchableOpacity>
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
   messageStyle:
   {
     backgroundColor:"white",
     borderRadius:10,
     borderWidth:2,
     borderColor:'#58a037',
     height:120,
     marginLeft:20,
     marginRight:20,
     textAlign:'center'
     
   },
  
  }

);
export default Signup;
