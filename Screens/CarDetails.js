import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Image,
    ScrollView,
} from 'react-native';

export default class CarDetails extends Component<Props> {

    constructor(props) {
        super(props);


    }


    render() {
        // const {navigate} = this.props.navigation;
        var {params} = this.props.navigation.state;

        return (
            <ScrollView>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Marka: </Text>
                    {params.car.brand}
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Model: </Text>
                    {params.car.model}
                </Text>

                <Text>
                    <Text style={{fontWeight: "bold"}}>Moc: </Text>
                    {params.car.power}km
                </Text>

                <Image
                    style={{width: null, height: 200, marginBottom: 15}}
                    source={{uri: params.car.photos}}
                />

            </ScrollView>


        );
    }

}


