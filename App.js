import React, {Component} from 'react';
import RNSimpleCompass from 'react-native-simple-compass';
import {
    Text,
    View,
    Animated,
} from 'react-native';
import {Accelerometer} from "react-native-sensors";
import Permissions from 'react-native-permissions'


export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            accelerometerZ: 0,
            accelerometerY: 0,
            accelerometerX: 0,
        };
    }


    componentDidMount() {

        Permissions.check('location').then(response => {
            this.setState({permission: response})
        });

        _requestPermission = () => {
            Permissions.request('location').then(response => {
                this.setState({permission: response})
            }).catch(error => this.setState({permission: error}))
        }

        navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 100, distanceFilter: 1},
        );

        const degree_update_rate = 3;
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({
                compass: degree

            });
        });

        const accelerationObservable = new Accelerometer({
            updateInterval: 100,
        });

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
                <Text>Permission for location: {this.state.permission}</Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Text>Compass: {this.state.compass}</Text>

                <Animated.View style={{
                    width: 200, height: 200, backgroundColor: 'red', transform: [
                        {
                            translateX: -this.state.accelerometerX*10,

                        },
                        {
                            translateY: -(this.state.accelerometerZ-9.81)*20,
                        }
                    ]
                }}/>
            </View>

        );
    }

}


