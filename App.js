import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingScreen'
import ListScreen from './screens/ListScreen'
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from './screens/TaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Lists"   options={{headerTitle:"لیست یادداشت ها",headerTitleAlign:"center",tabBarLabelStyle:{fontSize:14},tabBarLabel:"لیست یادداشت ها",tabBarIcon:()=><Entypo name="list" size={24} color="black" />}} component={ListScreen} />
      <Tab.Screen name="Home" options={{headerTitle:"خانه",headerTitleAlign:"center",tabBarLabel:"خانه",tabBarLabelStyle:{fontSize:14},tabBarIcon:()=><AntDesign name="home" size={24} color="black" />}} component={HomeScreen} />
      <Tab.Screen name="Settings" options={{headerTitle:"تنظیمات",headerTitleAlign:"center",tabBarLabelStyle:{fontSize:14},tabBarLabel:"تنظیمات",tabBarIcon:()=><Ionicons name="options" size={24} color="black" />}}  component={SettingsScreen} />
      
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen  options={{headerTitle:"تنظیمات",headerTitleAlign:"center",tabBarLabel:"تنظیمات"}}  name="TaskScreen" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
