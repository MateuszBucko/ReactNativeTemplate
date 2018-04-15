import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainList from './Screens/MainList';
import Details from './Screens/Details';

const Navigation = StackNavigator({
    Home: {screen: MainList},
    DetailsView: {screen: Details}
});

export default Navigation;

