import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import persianDate from 'persian-date'

const Date = () => {
    const [currentDate,setCurrentDate] = useState( new persianDate().format())

    useEffect(()=>{
       const interval =  setInterval(() => setCurrentDate(new persianDate().format()), 1000)

        return ()=>{
            clearInterval(interval);
        }
    },[])
  return (  
            <Text style={{fontSize:20}}>{   new persianDate().format()}</Text>    
  )
}

export default Date

const styles = StyleSheet.create({})