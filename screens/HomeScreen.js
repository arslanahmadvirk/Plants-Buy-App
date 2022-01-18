import React, { useState, useEffect } from 'react';
import {View, SafeAreaView,Text,StyleSheet,FlatList,Image,Dimensions, ActivityIndicator,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../colors';
import { Card } from "react-native-paper";
const width = Dimensions.get('window').width / 2 - 30;
const AppURL = 'https://salty-beach-49797.herokuapp.com';

const HomeScreen = ({navigation, route}) => {
const {userid,image} = route.params;
const [data, setData] = useState([]);
const [newarrival, setNewarrival]= useState([]);
const [loading, setLoading] = useState(true);

  const fetchData = async (categories) => {
    try {
      const response = await fetch(AppURL + `/add-to-carts?Categories=${categories}`);
      const response1 = await fetch(AppURL + `/add-to-carts?Type=NEW`);
      setData(await response.json());
      setNewarrival(await response1.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('POPULAR');
  }, []);


  const [catergoryIndex, setCategoryIndex] = React.useState(0);

  const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {setCategoryIndex(index); fetchData(item)}}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white',}}>
      
      <View style={style.header}>
        <Icon name="logout" size={28} onPress={() => navigation.navigate('Login')} />
        <View style={{flexDirection: 'row',}}>
        <Icon name="shopping-cart" size={28} onPress={() => navigation.navigate('Cart', `${userid}`)} />
        <Image source={{uri: image}}style={{height:30,width:30,borderRadius:30}}></Image>
        </View>
      </View>
      <ScrollView>
      {loading ? (<ActivityIndicator/>) : ( <>

      <View style={style.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome To</Text>
          <Text style={{fontSize: 38, color: "#58a037", fontWeight: 'bold'}}>
            Plant Shop
          </Text>
        </View>
        
      </View>
         
        <Card style={style.searchContainer} onPress={() => navigation.navigate('ProductSearch', `${userid}` )}>
        <View style={{flexDirection:'row',height:50,alignItems:"center",}}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <Text> Search </Text>
          </View>
        </Card>
     
      <CategoryList />
      
      <FlatList
        showsVerticalScrollIndicator={true}
        horizontal={true}
        data={data}
        keyExtractor={({id },index) => id}
        renderItem={({item}) => {
          return(
           <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
         
          navigation.navigate('ProductDetails', {
            itemId: `${item.id}`,
            userid: `${userid}`,
          });
        }}>
        <Card style={style.card}>

            <Image
              source={{uri: item.image.url}}
              style={{flex: 1, }}
            />
          

          <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 10}}>
            {item.Name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>
              ${item.Price}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor:'#58a037',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 18, color: COLORS.white, fontWeight: 'bold', marginBottom:5}}>
                +
              </Text>
            </View>
          </View>
          
        </Card>
        
      </TouchableOpacity>

          )
        }}
      />
      
      
       <Text style={{fontSize:18,color:"grey", fontWeight:"bold",marginHorizontal:10,}}>New Arrival</Text>
       <FlatList
       horizontal={true}
       showsHorizontalScrollIndicator={false}
        data={newarrival}
        keyExtractor={({id },index) => id}
        renderItem={({item}) => {
          return(
            <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
         
          navigation.navigate('AddToCart', {
            itemId: `${item.id}`,
            userid: `${userid}`,
          });
        }}>

      <Card style={style.cart1Data}>
       <View style={style.cartData}>
         <View style={{height:80,width:75,backgroundColor:"#58a037",justifyContent:"center",borderTopRightRadius:25,borderBottomLeftRadius:10}}>
         <Text style={{color:"white",marginLeft:15,fontSize:18}}>${item.Price}</Text>
         </View>
         <Text style={{color:"black",fontSize:17,fontWeight:'bold',alignSelf:'center'}}>{item.Name}</Text>
         <View>
           <Image source={{uri: item.image.url}} style={{height:80,width:60}}></Image>
         </View>
         </View>
         </Card>
         </TouchableOpacity>
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
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
   marginHorizontal:10,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 13, color: 'grey', fontWeight: 'bold'},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    width,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    padding:10,
    elevation:8,
  },
  header: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10,
  },
  searchContainer: {
    borderRadius: 15,
    marginHorizontal:10,
    elevation:8,
    marginBottom:10,
    marginTop:30,
  },
  cartData: {
 flexDirection:"row",
 justifyContent:"space-between",
 
  },

cart1Data: {
 height:80,
 width:250,
 borderTopEndRadius:15,
 borderBottomLeftRadius:15,
 elevation:8,
 marginHorizontal:10,
 marginBottom: 15,
 marginTop:15,
  },

});
export default HomeScreen;