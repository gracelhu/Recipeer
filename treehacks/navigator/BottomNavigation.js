import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View , Image} from 'react-native';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Events from '../screens/Events';
import RecipeGenerator from '../screens/RecipeGenerator';
import SavedRecipes from '../screens/SavedRecipes';

const Tab = createBottomTabNavigator();

function BottomNavigation({navigation}) {
   console.log("inside bottom navigation");
   
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen 
      name="Saved Recipes" 
      children={() => <SavedRecipes/>}
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:25, width: 30}} source={require('../pictures/recipebook.png')}/>
         )
      }}/>
      <Tab.Screen 
      name="AI Recipe Generator" 
      children={() => <RecipeGenerator/>}
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:30, width: 30}} source={require('../pictures/whisk.png')}/>
         )
      }}/>
      <Tab.Screen 
      name="Profile" 
      children={() => <Profile navigation={navigation} />}
      options={{
         tabBarIcon: ({focused}) => (
            <Image style={{height:30, width: 30}} source={require('../pictures/usericon.png')}/>
         )
      }}/>
    
    </Tab.Navigator>
  );
}

export default BottomNavigation;
