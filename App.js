import React, {Component} from 'react';
import {
    View,
    Button
} from 'react-native';
var Sound = require('react-native-sound');
var song = null;

import Songs from 'android/app/src/main/res/raw';
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

    console.warn(Songs);

    }

    componentWillMount() {
        song = new Sound('test.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.warn('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.warn('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
        });
    }

    play() {
        if (song != null) {
            song.play((success) => {
                if (success) {
                    console.warn('successfully finished playing');
                } else {
                    console.warn('playback failed due to audio decoding errors');
                    // reset the player to its uninitialized state (android only)
                    // this is the only option to recover after an error occured and use the player again
                    song.reset();
                }
            });
        }
    }

    pause() {
        song.pause();
    }

    stop() {
        song.stop();
    }


    render() {
        return (
            <View>
                <Button
                    title="Play"
                    onPress={this.play.bind(this)}/>
                <Button
                    title="Pause"
                    onPress={this.pause.bind(this)}/>

                <Button
                    title="Stop"
                    onPress={this.stop.bind(this)}/>

            </View>

        );
    }

}


