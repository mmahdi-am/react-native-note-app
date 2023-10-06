// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   Children,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// const ThemeContext = createContext();

// const ThemeContextProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");



//   const getData = async () => {
//     console.log('getdata function called')
//     try{
//       let color = await AsyncStorage.getItem('themestr')
//       setTheme(color || "light")
//     }catch (e){
//       console.log(e)
//     }
//   }

//   useEffect(()=>{
//     getData()

//   },[theme])

 
 


//   return (
//     <ThemeContext.Provider value={[theme, setTheme]}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const useThemeContext = () => {
//   const [theme, setTheme] = useContext(ThemeContext);
//   return [theme, setTheme];
// };

// export { ThemeContextProvider, useThemeContext };
