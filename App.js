import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './pages/home/home'
import UHome from './pages/user/home'
import { AntDesign } from '@expo/vector-icons';
import Auth from './pages/user/auth'
import Verify from './pages/user/verify'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const App = () => {

  return (
    <SafeAreaProvider style={{backgroundColor:'#f2f2f2'}}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle:{
          marginVertical:15,
          marginHorizontal:50,
          borderRadius:30,
          elevation:10
        },
        tabBarActiveTintColor:'#000',
            tabBarInactiveTintColor:'grey',
            tabBarLabelStyle:{fontWeight:'bold'},
            // headerRight:()=>(
            //   <TouchableOpacity style={{backgroundColor:'grey',borderRadius:30, width:40,height:40, justifyContent:'center', alignItems:'center', marginRight:20 }}>
            //     <AntDesign name="user" size={30} color='white' />
            //   </TouchableOpacity>
            // )
              
            }} >
          <Tab.Screen name='Home' component={Home} options={{
            tabBarIcon:({focused})=><AntDesign name="home" size={focused?30:24} color={focused?'black':'grey'} />,
            
          }} />
          <Tab.Screen name='User' component={User} options={{
            tabBarIcon:({focused})=><AntDesign name="user" size={focused?30:24} color={focused?'black':'grey'} />,
            
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

function User({navigation}) {
  return(
    <Stack.Navigator>
      <Stack.Screen name='home' component={UHome} options={{headerShown:false}} />
      <Stack.Screen name='auth' component={Auth} options={{headerShown:false}} />
      <Stack.Screen name='verf' component={Verify} options={{headerShown:false}} />
      
    </Stack.Navigator>
  )
}
export default App