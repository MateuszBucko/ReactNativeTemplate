import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainView from './Screens/MainView';
import AddRecipeView from "./Screens/AddRecipeView";


const Navigation = StackNavigator({
        Home: {
            screen: MainView,
        },
        AddRecipeView: {
            screen: AddRecipeView,
        }
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default Navigation;