import React from 'react';
import { useState, useEffect } from "react";
import {View, SafeAreaView,Text,StyleSheet,FlatList,Image,Dimensions,ActivityIndicator,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import A6 from '../assets/A6.png'
import { Card } from "react-native-paper";
const AppURL = 'https://salty-beach-49797.herokuapp.com';

const Cart = ({navigation, route}) =>{
  const userid = route.params;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(true)

  const fetchData = async () => {
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

  const deleteItem = (id) =>{
  fetch(`https://salty-beach-49797.herokuapp.com/carts/${id}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  })
});
setTimeout(function(){
 
      fetchData();
    }, 700);
}

  useEffect(() => {
    fetchData();
  }, []);

const checkEmpty=()=>{
  
if(total==0){
  alert('Cart is Empty');
}
else{
  navigation.navigate('DeliveryPage', userid);
}
  
}
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 10, backgroundColor: 'white'}}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
         <Icon name="help-circle-outline" size={28} onPress={() => navigation.navigate('Message',userid)} />
      </View>
      <View style={style.header}>
         <Text style={{fontSize: 25, fontWeight: 'bold',marginBottom:15}}>Your Cart</Text>
      </View>
      
  <ScrollView>
 {loading ? (<ActivityIndicator/>) : ( <>

 <FlatList
   data={data}
   keyExtractor={({id },index) => id}
   renderItem={({item})=>{

   return(
    
    <Card style={style.cart1Data}>
    <View style={style.cartData}>
         <View style={{height:70,width:70,backgroundColor:"#58a037",justifyContent:"center",borderTopRightRadius:25,borderBottomLeftRadius:10}}>
         
         <Icon name="close-circle" size={28} 
          onPress={() =>{setData(data.filter(value => item.id !== value.id)); deleteItem(item.id)}}
           />

         <Text style={{color:"white",marginLeft:15,fontSize:18}}>${item.Price}</Text>
         </View>
         <Text style={{color:"black",fontSize:15,alignSelf:'center'}}>{item.Name}</Text>
         <View>
           <Image source={{uri: item.Image}} style={{height:70,width:50}}></Image>
         </View>
         </View>
         </Card>
 )
      
          }}
        />
        </>
      )}
      </ScrollView>
   <View style={{flexDirection:"row",marginHorizontal:30, marginTop:30,marginBottom:30,justifyContent:"space-between"}}>
      <Text style={{color:"grey",fontWeight:'bold',fontSize:20, alignSelf:'center'}}>Total:</Text>
      <Text style={{color:"grey",fontWeight:'bold',alignSelf:"center",fontSize:20}}>${total}</Text>
         </View>
         
          <TouchableOpacity
            style={{alignItems: "center", backgroundColor: "#58a037", margin:5, padding: 15, float: "right" }}
            onPress={() => checkEmpty()}
           >
            <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>Buy Now</Text>
          </TouchableOpacity>
               

      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  
 cartData: {
 flexDirection:"row",
 justifyContent:"space-between",
 
  },

cart1Data: {
 height:70,
 flex:1,
 borderTopEndRadius:15,
 borderBottomLeftRadius:15,
 elevation:8,
 marginHorizontal:25,
 marginBottom: 15,
 marginTop:15,
  },
  
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  
});
export default Cart;