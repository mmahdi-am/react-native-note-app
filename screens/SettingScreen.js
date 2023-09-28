import { View, Text } from 'react-native'
import React from 'react'
import { Button, Switch } from '@rneui/base'

const SettingScreen = () => {
  return (
    <View style={{padding:20}}>
      <View style={{flexDirection:'row-reverse',justifyContent:"space-between",alignItems:"center",marginVertical:20}}>
        <Text>فعال کردن حالت دارک مود</Text>
        <Switch/>
        </View>
        <View style={{borderBottomWidth:1}}></View>
      <View style={{flexDirection:'row-reverse',justifyContent:"space-between",alignItems:"center",marginVertical:20}}>
        <Text>امتیاز به برنامه در کافه بازار</Text>
        <Button title={"ثبت امتیاز"} />
        </View>
      <View style={{flexDirection:'row-reverse',justifyContent:"space-between",alignItems:"center"}}>
        <Text>ارتباط با توسعه دهنده</Text>
        <Button title={"ارسال ایمیل"} />
        </View>
    </View>
  )
}

export default SettingScreen