import React, { useState, useEffect } from 'react';
import {View, SafeAreaView,Text,StyleSheet,FlatList,Image,Dimensions, ActivityIndicator,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AppURL = 'https://salty-beach-49797.herokuapp.com';
import { Card } from "react-native-paper";

const ProductSearch = ({navigation, route}) => {
  const userid= route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = React.useState("");
  const [arrayholder,setArrayholder] =useState([])
  const onChangeText = (text) => setSearch(text);
    
  
  const fetchData = async (search) => {
    try {
      const response = await fetch(`https://salty-beach-49797.herokuapp.com/add-to-carts`);
      const json = await response.json();
      setData(json);
      setArrayholder(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const searchData= (text)=>  {
    const newData = arrayholder.filter(item => {
      const itemData = item.Name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });

      setData(newData)
      setSearch(text)
    }
  
  
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white',}}>
      
      <View style={style.header}>
      <View style={{marginTop:8}}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()}/>
        </View>
        <Card style={{height:45,borderRadius:15,elevation:5,marginBottom:20,marginHorizontal:10,flex:1}}>
         <TextInput
         style={style.searchContainer}
         onChangeText={(text) => searchData(text)}
         placeholder="Enter Product Name"
         value={search} 
       />
       </Card>
      </View>
      <ScrollView>
      {loading ? (<ActivityIndicator/>) : ( <>

<FlatList
   data={data}
   keyExtractor={({id },index) => id}
   renderItem={({item})=>{
     return(
      
     <Card style={style.searchResult} onPress={() => {
         
          navigation.navigate('ProductDetails', {
            itemId: `${item.id}`,
            userid: `${userid}`,
          });
        }}>
      <View style={{flexDirection:"row",justifyContent:"space-between",}}>
         <View style={{height:60,width:65,backgroundColor:"#58a037",justifyContent:"center",borderTopRightRadius:25,borderBottomLeftRadius:10}}>
         <Text style={{color:"white",marginLeft:15,fontSize:18}}>${item.Price}</Text>
         </View>
         <Text style={{color:"black",fontSize:15,alignSelf:'center'}}>{item.Name}</Text>
         <View>
           <Image source={{uri: item.image.url}} style={{height:60,width:45}}></Image>
         </View>
         </View>
</Card>
   

     )
      
          }}
        />
     </>
      )}

      </ScrollView>
      
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  
  header: {
    marginTop: 45,
    flexDirection: 'row',
    marginHorizontal:10,
  },
  searchContainer: {
    padding:15,
     marginLeft:10,
  },

searchResult: {
 height:60,
 elevation:8,
 marginHorizontal:30,
 marginBottom:20,
 borderTopEndRadius:15,
 borderBottomLeftRadius:15,
 
  },
  
  
});
export default ProductSearch;