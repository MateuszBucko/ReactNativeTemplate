import React, {Component} from 'react';
import RNSimpleCompass from 'react-native-simple-compass';
import {
    Text,
    View
} from 'react-native';
import {Accelerometer} from "react-native-sensors";

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

        const degree_update_rate = 20;
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({
                compass: degree

            });
        });

        const accelerationObservable = new Accelerometer({
            updateInterval: 100, // defaults to 100ms
        });

        // Normal RxJS functions
        accelerationObservable
            .subscribe(({x, y, z}) => {
                this.setState({
                    accelerometerX: x,
                    accelerometerY: y,
                    accelerometerZ: z,
                });
            });

       

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
        RNSimpleCompass.stop();
    }

    render() {
        return (
            <View style={{flexGrow: 1, alignItems: 'center', margin: 10}}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Text>Compass: {this.state.compass}</Text>
                <Text> Accelerometer:</Text>
                <Text>X {this.state.accelerometerX}</Text>
                <Text>Y {this.state.accelerometerY}</Text>
                <Text>Z {this.state.accelerometerZ}</Text>
            </View>
        );
    }
}

