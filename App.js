import React from 'react';
import {ListView, ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';

var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=1b2f331e47184791a519da44a80a49c7';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.articles),
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",

                }}
            />
        );
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>
                        <View>
                            <TouchableOpacity/>
                            <Text>{rowData.title}</Text>
                        </View>
                    }
                />

            </View>
        );
    }
}
