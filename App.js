import React, {Component} from 'react';
import {
    View,
    Button,
    ListView,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var Sound = require('react-native-sound');
var RNFS = require('react-native-fs');
var song = null;


export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        var array = ["the_chainsmokers_coldplay_something_just_like_this.mp3",
            "lady_pank_zawsze_tam_gdzie_ty.mp3","coma_100_tysiecy_jednakowych_miast.mp3"];

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: ds.cloneWithRows(array),
            song: '',
        };

    }

    play() {
        if (song != null) {
            song.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                    // reset the player to its uninitialized state (android only)
                    // this is the only option to recover after an error occured and use the player again
                    song.reset();
                }
            });
        }
    }

    pause() {
        if (song != null) {
            song.pause();
        }
    }

    stop() {
        if (song != null) {
            song.stop();
        }
    }

    changeSong(songName) {
        this.stop();
        song = new Sound(songName, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
        });

    }

    getLabel(rowData){
        return rowData.replace(/_/g , " ");
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
    };


    render() {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
            },
            buttonContainer: {
                flex: 1,
            }
        });

        return (

            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.buttonContainer}>
                        <Button
                            icon={{name: 'user', type: 'font-awesome'}}
                            color={"green"}
                            title="Play"
                            style={{paddingBottom: 15, color: 'black'}}
                            onPress={this.play.bind(this)}>
                        </Button>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Pause"
                            color={"#f1f49c"}
                            style={{paddingBottom: 15}}
                            onPress={this.pause.bind(this)}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            color={"red"}
                            title="Stop"
                            style={{paddingBottom: 15}}
                            onPress={this.stop.bind(this)}/>
                    </View>
                </View>

                <View>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.data}
                        renderSeparator={this.ListViewItemSeparator}
                        renderRow={(rowData) =>
                            <View>
                                <TouchableOpacity onPress={() =>
                                    this.changeSong(rowData)
                                }>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontWeight: "bold"
                                    }}>
                                        {this.getLabel(rowData)}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        }/>
                </View>
            </ScrollView>


        );


    }

}


