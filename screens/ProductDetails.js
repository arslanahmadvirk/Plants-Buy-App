import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
const AppURL = 'https://salty-beach-49797.herokuapp.com';

const ProductDetails = ({navigation, route}) => {
  const {itemId, userid} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(AppURL + `/add-to-carts/${itemId}`);
      setData(await response.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const cartData = () =>{

axios
  .post('https://salty-beach-49797.herokuapp.com/carts', {
    "Name": `${data.Name}`,
    "Price": `${data.Price}`,
    "Image": `${data.image.url}`,
    "user": `${userid}`,
     
  })
  .then(response => {
    
    alert('Item added to cart!');
  
  })
  .catch(error => {
    
    alert('An error occurred:', error);
  });

}

useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#58a037',
      
      }}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
 <Text style={{color:'white', fontWeight:'bold',fontSize:25,marginTop:15,marginHorizontal:10}}>Product Details</Text>

 <ScrollView>
 
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={style.detailsContainer}>
            <View>
              <Image
                source={{uri: data.image.url}}
                style={{ width: 150, height: 200 }}
              />
            </View>
            <View style={{ marginLeft: 150 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {data.Name}
              </Text>

              <View style={style.priceTag}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                  }}>
                  Price: ${data.Price}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    
                  }}>
                  Size: {data.Size}
                </Text>
              </View>
            </View>

  
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                About Plant
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                  lineHeight: 22,
                  marginTop: 10,
                }}>
                {data.About}
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
            
                  <View
                    style={{
                      backgroundColor: '#f0f0f0',
                      height: 40,
                      width: 50,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ color: 'grey', textAlign: 'center' }}>
                      Temp {data.Temp}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#f0f0f0',
                      height: 40,
                      width: 50,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ color: 'grey', textAlign: 'center' }}>
                      Light {data.Light}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#f0f0f0',
                      height: 40,
                      width: 50,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ color: 'grey', textAlign: 'center' }}>
                      Water {data.Water}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#f0f0f0',
                      height: 40,
                      width: 50,
                      marginHorizontal: 10,
                    }}>
                    <Text style={{ color: 'grey', textAlign: 'center' }}>
                      Fertile {data.Fertile}
                    </Text>
                  </View>
                
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: '#58a037',
                  marginTop: 20,
                  marginBottom:20,
                  padding: 15,
                  float: 'right',
                }} onPress={() => cartData()}>
                <Text style={{ color: 'white', fontSize: 17 }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
           
          </View>
        </>
        
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailsContainer: {
    height:600,
    backgroundColor: 'white',
    marginTop: 70,
    borderTopRightRadius: 70,
    paddingHorizontal: 15,
    justifyContent:"flex-end",
  
  },

  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
  },
});

export default ProductDetails;
