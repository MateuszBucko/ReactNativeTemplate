import React from 'react';
import {ListView, ActivityIndicator, Text, View, TouchableOpacity, Button, Image} from 'react-native';
import Moment from 'moment';

var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=pl&' +
    'apiKey=1b2f331e47184791a519da44a80a49c7';

export default class MainList extends React.Component {

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
                    dataSource: ds.cloneWithRows(responseJson.articles)
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
        const {navigate} = this.props.navigation;
        Moment.locale('pl');

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
                            <TouchableOpacity onPress={() =>
                                navigate('DetailsView', {article: rowData})
                            }>
                                <Text style={{textAlign: 'center', fontWeight: "bold"}}>{rowData.title}</Text>
                                <Text style={{textAlign: 'center'}}>{Moment(rowData.publishedAt).format('DD.MM.YYYY hh:mm')}</Text>

                                <Image
                                    style={{width: null, height: 200}}
                                    source={{uri: rowData.urlToImage}}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                />

            </View>
        );
    }


}

function getParsedDate(date) {
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1]) - 1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}