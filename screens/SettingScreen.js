import { View, Text, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Switch } from "@rneui/base";
import { useThemeContext } from "../contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const SettingScreen = () => {
  // const [theme, setTheme] = useThemeContext();

  deleteTheme = async ()=> {
    await AsyncStorage.removeItem('themestr')
  }
  
  deleteTheme()

  const sendEmail = () => {
    Linking.openURL(`mailto:mmahdi4083@gmail.com`)
  }

  const submitRate = () =>{
    Linking.openURL(`https://cafebazaar.ir/`)
  }

  // const handleSwitchChange = async (themeColor) => {
  //   try{
    
  //       await AsyncStorage.setItem("themestr",themeColor)
  //       setTheme(themeColor)
    
      
  //   }catch (e){
  //     console.log(e)
  //   }
  //   };


  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text>فعال کردن حالت دارک مود</Text>
        <Switch/>

        {/* <Text>{theme}</Text> */}

        {/* <Button title={theme} onPress={()=>handleSwitchChange(theme == "dark" ? "light" : "dark")}/> */}
      </View>
      <View style={{ borderBottomWidth: 1 }}></View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text>امتیاز به برنامه در کافه بازار</Text>
        <Button title={"ثبت امتیاز"} onPress={submitRate}/>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>ارتباط با توسعه دهنده</Text>
        <Button title={"ارسال ایمیل"} onPress={sendEmail} />
      </View>
    </View>
  );
};

export default SettingScreen;
