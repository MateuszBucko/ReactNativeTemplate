import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';
import MainList from './Screens/MainList';
import Details from './Screens/Details';

const Navigation = StackNavigator({
    Home: {
        screen: MainList, navigationOptions: ({navigation}) => ({
            title: `Lista wiadomości`,
            headerStyle: {backgroundColor: 'yellow'},
            headerTitleStyle: {textAlign: 'center'},
        }),

    },
    DetailsView: {
        screen: Details, navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.article.title}`,
        }),
    }
});

export default Navigation;

