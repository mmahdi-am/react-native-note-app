import { View, StyleSheet ,Modal, TextInput, Pressable} from 'react-native'
import React,{useEffect, useState} from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

import DateComponent  from '../components/Date';
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle,setTaskTitle] = useState("")
  const [taskDescription,setTaskDescription] = useState("")
  const [tasksNumber,setTasksNumber] = useState(0)
  const [error,setError] = useState("")
  const [forceRerender,setForceRerender] = useState(0)
  const isFocused = useIsFocused();


  const getAndUpdateTaskNumber = () => {
    getTasks().then((res)=>{
        
      setTasksNumber(res.length)
    }).catch((e)=>{
      console.log(e)
    })
  }




  const storeTask = async (title,description) => {
    const id = Date.now()
    try {
      await AsyncStorage.setItem(
        id.toString(),
        JSON.stringify({
          id:id,
          title:title,
          description : description
        }),()=>{
          console.log('saved suuccessfully')
          


          getAndUpdateTaskNumber()
           
        }
      );
    } catch (error) {
      console.log(error)
    }
  };


  const handleSubmitTask = async () =>{
    if(taskTitle && taskDescription){
      setError("")


      await storeTask(taskTitle,taskDescription)
      setModalVisible(false)
      setTaskTitle("")
      setTaskDescription("")
      setModalVisible(false)
    }else{
      setError("لطفا فرم را کامل پر کنید")
      
    }
  }


  const getTasks = async () =>{
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
   
    return result

    

  }


  useEffect(()=>{
    if(isFocused){

      getAndUpdateTaskNumber()
    }
      

  },[isFocused])


  return (
    <View style={styles.container}>
      <Modal
      
        animationType="slide"
     transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        >
          <View style={styles.modalStyle}>
          <AntDesign name="closecircleo" size={24} color="black" onPress={()=>setModalVisible(false)} />
          <Text style={{color:"red",textAlign:'center',padding:10,fontSize:20}}>{error}</Text>
            
          <TextInput
          value={taskTitle}
          onChangeText={setTaskTitle}
        style={styles.input}
        placeholder="عنوان را وارد کنید ..."
        
      /> 
          <TextInput
            placeholder="یادداشت حود را وارد کنید ..."
          value={taskDescription}
          onChangeText={setTaskDescription}
    multiline={true}
    numberOfLines={10}
    style={styles.textarea}/>
          <Pressable

        title="ذخیره"
        style={styles.saveBtn}
        onPress={() => handleSubmitTask()}
      >
        <Text style={{textAlign:'center',color:'white'}}>ذخیره</Text>
      </Pressable>
          </View>
        </Modal>
      <Button 
        title="ایجاد یادداشت جدید"
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
        containerStyle={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={()=>{setModalVisible(p=>!p);setError('')}}
        titleStyle={{ color: 'white', marginHorizontal: 20 }}
      />


      <View style={styles.infoContainer}>
        <View style={{width:"100%"}} >

        <Card>
          <Card.Title>تعداد یادداشت های ساخته شده</Card.Title>
          <Card.Divider />

          <View style={styles.user}>

            <Text style={styles.name}>{tasksNumber}</Text>
          </View>

 
        </Card>
        </View>

        <View style={{width:"100%"}} >

        <Card>
          <Card.Title>تقویم</Card.Title>
          <Card.Divider />

          <View style={styles.user}>

        <DateComponent/>
          </View>

 
        </Card>
        </View>



      </View>
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
    flexDirection: 'row',
    justifyContent:"center",
    marginBottom: 6,
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
    
    justifyContent:"center"
  },
  modalStyle:{
marginTop:90,
    flex:1,
    padding:15,
    backgroundColor:"#EDEDED",
    borderRadius:15,
    borderWidth:1,
    borderBottomLeftRadius:0,
    
    borderBottomRightRadius:0
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
  },
  textarea:{
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
   
    padding: 10,
    textAlignVertical: 'top'
  },
  saveBtn : {
    margin: 12,
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
    backgroundColor:'green',
    
  }

})
export default HomeScreen