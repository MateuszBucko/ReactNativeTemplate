import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Image,
    ScrollView,
} from 'react-native';

export default class SearchResultView extends Component<Props> {

    constructor(props) {
        super(props);


    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#000",
                    marginTop: 5,
                    marginBottom: 5

                }}
            />
        );
    }

    render() {
       // const {navigate} = this.props.navigation;
        var {params} = this.props.navigation.state;
        console.warn(params);
        /*let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            data: ds.cloneWithRows(params),
        });*/

        return (
            <View/>
            /*{<ScrollView>
                <ListView
                    enableEmptySections
                    dataSource={this.state.data}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: "bold"
                            }}>{rowData.brand} {rowData.model} {rowData.power}km {rowData.color}</Text>

                            <Image
                                style={{width: null, height: 200}}
                                source={{uri: rowData.photos}}
                            />
                        </View>
                    }
                />

            </ScrollView>}*/


        );
    }

}


