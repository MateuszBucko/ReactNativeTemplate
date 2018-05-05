import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainList from './Screens/MainList';
import SearchResultView from './Screens/SearchResultView';
import CarDetails from "./Screens/CarDetails";

const Navigation = StackNavigator({
        Home: {
            screen: MainList,
        },
        SearchResultView: {
            screen: SearchResultView,
        },
        CarDetails: {
            screen: CarDetails,
        },
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default Navigation;