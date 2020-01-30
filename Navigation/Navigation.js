import React from 'react';
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../Components/Home';
import Favorite from '../Components/Favorite';
import FilmDetail from '../Components/FilmDetail';
import { Ionicons } from '@expo/vector-icons';

const HomeStackNavigator = createStackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  } 

});

const FavoriteStackNavigator = createStackNavigator({
 Favorite: {
    screen: Favorite,
    navigationOptions: {
      title: 'Films favoris'
    }
  },
 FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film'
    }
  } 
})

const MoviesTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
        tabBarIcon: () => {
          return <Ionicons name="md-search" size={32} />  
          }
      }
  },
  Favorite: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
        tabBarIcon: () => {
          return <Ionicons name="md-heart" size={32} /> 
           }
      }
  }
  },  

{
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', 
      inactiveBackgroundColor: '#FFFFFF', 
      showLabel: false, // hide title
      showIcon: true // 
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})
export default createAppContainer(MoviesTabNavigator);