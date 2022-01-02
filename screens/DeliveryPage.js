import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import undraw3 from '../assets/delivery.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';


const Signup = ({navigation, route}) => {
  const userid= route.params;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = React.useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const onChangeName = (text) => setName(text);
  const onChangeEmail = (text) => setEmail(text);
  const onChangePhone = (text) => setPhone(text);
  const onChangeAddress = (text) => setAddress(text);
  const onChangeCity = (text) => setCity(text);
  const onChangePostal = (text) => setPostal(text);

  const getCartProducts = async () => {
    try {
      const response = await fetch(`https://salty-beach-49797.herokuapp.com/carts?user=${userid}`);
      const json = await response.json();
      setData(json);
      let t = 0;
      json.forEach(value => {
        t+=value.Price
      });
      setTotal(t)
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  	useEffect(() => {
     getCartProducts();
   
  }, []);
  
const postUser = (name,email,phone,address,city,postal) => {
axios
  .post('https://salty-beach-49797.herokuapp.com/delivery-data', {
    Name: `${name}`,
    Email: `${email}`,
    PhoneNo: `${phone}`,
    Address: `${address}`,
    City:`${city}`,
    PostalCode: `${postal}`,
    user: `${userid}`,
    totalPrice:`${total}`,
  })
  .then(response => {
     const shippingId= `${response.data.id}`;
     setTimeout(function(){
     data.forEach(value => {
         postProducts(value.Name,value.Price,value.Image,shippingId)
      })   
      
    }, 500);
    alert('Order has been Placed!');
    navigation.goBack();
        
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

   const validation = (name,email,phone,address,city,postal) =>{
    if(!name || !email || !phone || !address || !city || !postal){
        alert('Fields can not empty');
    }
    else{
        postUser(name,email,phone,address,city,postal);
    }
}


const postProducts = (name,price,image,shippingId) => {
axios
  .post('https://salty-beach-49797.herokuapp.com/shipping-products', {
    productName: `${name}`,
    productPrice: `${price}`,
    productImage: `${image}`,
    Shipping_Order:`${shippingId}`,
  })
  .then(response => {
   
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });
}

  return (
    

    <View style={{ flex: 1, backgroundColor:"white", padding: 25 }}>
    <View style={{marginTop:20}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
    <View style={{ alignSelf:"center"}}>
     <Image source={undraw3} style={{ width: 170, height: 160 }} /> 
    </View>

<ScrollView>
    <Text style={{fontSize:25, color:"#58a037",marginTop:10,marginBottom:5,textAlign:'center'}}>Shipping Details</Text>
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
         placeholder="Enter your Name"
         value={name}
           
       />

       <TextInput
       required
        style={style.input}
         onChangeText={onChangeEmail}
         placeholder="Enter your Email"
         value={email}
           
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
       <TextInput
       style={style.input}
         onChangeText={onChangeCity}
         placeholder="Enter your City"
         value={city}
           
       />
       <TextInput
       style={style.input}
         onChangeText={onChangePostal}
         placeholder="Enter your Postal Code"
         value={postal}
           
       />
       <TouchableOpacity
                  style={{alignItems: "center", backgroundColor: "#58a037", margin:20, padding: 15, float: "right" }}
                 onPress={() => validation(name,email,phone,address,city,postal)}
                 
                >
                  <Text style={{color:'white',fontSize:17}}>Place Order</Text>
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
  
  }

);
export default Signup;
