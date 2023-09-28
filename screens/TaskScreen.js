import { Button, Pressable, Share, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
const TaskScreen = ({ route, navigation }) => {
    const params = route.params;
    console.log(params)
  return (
    <View>
      <Text style={{fontSize:20,textAlign:'center',padding:16,margin:10,borderWidth:1,fontWeight:'bold'}}>{params.title}</Text>
      <Text style={{fontSize:16,textAlign:'center',padding:16,marginHorizontal:10,borderWidth:1}}>{params.description}</Text>
      
      <Pressable style={{display:'flex',flexDirection:"row",justifyContent:'center',borderWidth:1,borderRadius:10,alignSelf:"center",marginVertical:10,padding:10}} onPress={()=>Share.share({message:params.title+"-"+params.description})}>
      <AntDesign name="sharealt" size={24} color="black"  />
        <Text style={{fontSize:20,marginHorizontal:10}}>اشتراک گذاری</Text>
      </Pressable>
    </View>
  )
}

export default TaskScreen

const styles = StyleSheet.create({})





















