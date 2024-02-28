import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View , Image} from 'react-native';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Events from '../screens/Events';

const Tab = createBottomTabNavigator();

function BottomNavigation({navigation, user}) {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen 
      name="Events" 
      children={() => <Events navigation={navigation} />}
 
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
      children={() => <Profile user={user} />}
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:30, width: 30}} source={require('../pictures/profile.jpg')}/>
         )
      }}/>
    
    </Tab.Navigator>
  );
}

export default BottomNavigation;
