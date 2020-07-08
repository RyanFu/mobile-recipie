import 'react-native-gesture-handler';
import * as React from 'react';

import { Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadingScreen from './src/screens/loading';
import Home from './src/screens/home';
import Chat from './src/screens/chat';
import SearchRecipes from './src/screens/recipes-search';
import CategoriesList from './src/screens/categories-list'; //added this


import { HomeIcon, ChatIcon, SearchIcon, RecipeIcon, CookbookIcon } from './src/images/svg-icons';
import RecipesCategories from './src/screens/recipes-categories';
import DetailRecipes from './src/screens/recipes-detail';
import MyCookbook from './src/screens/my-cookbook';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const SearchRecipesStackOptions = ({ navigation }) => {
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
  });
};

const MyCookbookStackOptions = ({ navigation }) => {
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
  });
};

const RecipesStackOptions = ({ navigation }) => {
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
  });
};

const ChatStackOptions = ({ navigation }) => {
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
    
  });
};

const RecipesDetailStackOptions = ({ navigation }) => {
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
    
  });
};

const CategoriesListOptions = ({ navigation }) => { //created this
  return ({
    headerTintColor: '#68ddea',
    headerStyle: {
      backgroundColor: '#44346c'
    }
    
  });
};

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: '#68ddea',
  inactiveTintColor: '#A9A5E2',
  style: {
    backgroundColor: '#44346c',
    paddingTop: 5
  }
};

const TabLayout = () => (
  <Tab.Navigator
    style={{paddingTop: 50}}
    initialRouteName='Home'
    tabBarOptions={tabBarOptions} >
    <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({color}) => (<HomeIcon fill={color}/>)
      }}
    />
     <Tab.Screen
      name='My Cookbook'
      component={MyCookbookStackLayout}
      options={{
        tabBarIcon: ({color}) => (<CookbookIcon fill={color} />)
        
      }}
    />
  <Tab.Screen
      name='Cuisines'
      component={RecipesCategoriesLayout}
      options={{
        tabBarIcon: ({color}) => (<RecipeIcon fill={color} />)
      }}
    />
    <Tab.Screen
      name='Search'
      component={SearchStackLayout}
      options={{
        tabBarIcon: ({color}) => (<SearchIcon fill={color} />)
      }}
    />
    <Tab.Screen
      name="My Assistant"
      component={ChatStackLayout}
      options={{
        tabBarIcon: ({color}) => (<ChatIcon fill={color} />)
      }}
    />
    
  </Tab.Navigator>
);

const ChatStackLayout = () => (
  <Stack.Navigator>
  <Stack.Screen name="Chef's Assistant" component={Chat} options={ChatStackOptions} />
  <Stack.Screen name='Recipe Details' component={DetailRecipes} options={RecipesDetailStackOptions}  />
  </Stack.Navigator>
);

const SearchStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen name='Search Recipes' component={SearchRecipes} options={SearchRecipesStackOptions} />
    <Stack.Screen name='Recipe Details' component={DetailRecipes} options={RecipesDetailStackOptions} />
  </Stack.Navigator>
);

const MyCookbookStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen name='My Cookbook' component={MyCookbook} options={MyCookbookStackOptions} />
    <Stack.Screen name='Recipe Details' component={DetailRecipes} options={RecipesDetailStackOptions}  />
  </Stack.Navigator>
);


const RecipesCategoriesLayout = () => ( //added last two 
  <Stack.Navigator>
    <Stack.Screen name='List of Cuisines' component={RecipesCategories} options={RecipesStackOptions} />
    <Stack.Screen name="Cuisine Recipes" component={CategoriesList} options={CategoriesListOptions}  /> 
    <Stack.Screen name='Recipe Details' component={DetailRecipes} options={RecipesDetailStackOptions}  />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    console.disableYellowBox = true; 
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (<LoadingScreen />);
  } else {
    return (
      <NavigationContainer>
        <TabLayout/>
      </NavigationContainer>
    );
  }
};

export default App;
