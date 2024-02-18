import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View , Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Search from '../screens/Search';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:40, width: 40}} source={require('../pictures/events.jpg')}/>
         )
      }}/>
      <Tab.Screen 
      name="Search" 
      component={Search} 
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:24, width: 24}} source={require('../pictures/search.webp')}/>
         )
      }}/>
      <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:30, width: 30}} source={require('../pictures/profile.jpg')}/>
         )
      }}/>
    
    </Tab.Navigator>
  );
}

export default BottomNavigation;
