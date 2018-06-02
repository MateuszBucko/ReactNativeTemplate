import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainView from './Screens/MainView';
import AddRecipeView from "./Screens/AddRecipeView";
import RecipeDetailsView from "./Screens/RecipeDetailsView";


const Navigation = StackNavigator({
        Home: {
            screen: MainView,
        },
        AddRecipeView: {
            screen: AddRecipeView,
        },
        RecipeDetailsView: {
            screen: RecipeDetailsView,
        }
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default Navigation;