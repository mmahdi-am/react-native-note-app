import { View, FlatList,StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
const ListScreen = ({ navigation }) => {
  const [data,setData] = useState([])
  const isFocused = useIsFocused();

  
  const getTasks = async () =>{
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result

    

  }



  const handleDeleteItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
      getTasks().then(res=>{

        setData(res)
       }).catch(e=>{
        console.log(e)
       })
        return true;
    }
    catch(exception) {
        return false;
    }
}


  useEffect( ()=>{
     if(isFocused){ 
      getTasks().then(res=>{

        setData(res)
       }).catch(e=>{
        console.log(e)
       })
  
  }

  },[ isFocused])

  return (
    <View >
      <FlatList       ListEmptyComponent={<Text style={{textAlign:'center',fontSize:20,borderWidth:1,borderRadius:10,padding:16}}>موردی برای نمایش وجود ندارد</Text>} data={data} inverted renderItem={({item})=>
      {
        
       return (
         
         <Pressable onPress={()=> navigation.navigate('TaskScreen',{
           id:item[0],
           title:JSON.parse(item[1]).title,
           description:JSON.parse(item[1]).description
         })}>
      <Card>
        <View  >
        
          <Card.Title>{JSON.parse(item[1]).title}</Card.Title>

          
        </View>
          <Card.Divider />
          
          <View style={styles.user} >
            
        <AntDesign style={{position:"absolute",bottom:0,left:0}} name="delete" size={30}  onPress={()=>{Alert.alert('آیا قصد حذف این سطر را دارید ؟','',[
          {
            text:'بله',
            onPress:()=>handleDeleteItem(item[0])
          },
          {
            text:'خیر',
            onPress:()=>{}
          }

        ])}}  color="black" />
          

            <Text style={styles.name}> {new Date(Number(item[0])).toLocaleString('fa', { timeZone: 'Asia/Tehran' }).toString()}</Text>
          </View>
        </Card>
        </Pressable>
        )
      }
        }/>
    </View> 
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
 alignItems:'center',
    marginBottom: 6,
    position:'relative'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
 
  },
  infoContainer: {
    flexDirection: "row"
  }

})

export default ListScreen