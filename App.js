import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainList from './Screens/MainList';
import SearchResultView from './Screens/SearchResultView';

const Navigation = StackNavigator({
        Home: {
            screen: MainList,
        },
        SearchResultView: {
            screen: SearchResultView,
        },
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default Navigation;