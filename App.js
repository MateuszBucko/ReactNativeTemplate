import React, {Component} from 'react';
import RNSimpleCompass from 'react-native-simple-compass';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };



    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );

        const degree_update_rate = 1;
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({
               compass: degree

            });
            console.log(degree);
        });



    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
        RNSimpleCompass.stop();
    }

    render() {
        return (
            <View style={{flexGrow: 1, alignItems: 'center', margin:10}}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Text>Compass: {this.state.compass}</Text>

            </View>
        );
    }
}

