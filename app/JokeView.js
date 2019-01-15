import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ProgressViewIOS, ProgressBarAndroid } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    card: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        backgroundColor: '#f2f2f2'
    },
    joke: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    errorText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red'
    },
    button: {
        marginBottom: 100
    }
});

export default class JokeView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}> { this.handleJokeState() }</View>

                <Button
                    style={styles.button}
                    title="Next joke"
                    onPress={this.onNextJoke.bind(this)}
                />
            </View>
        );
    }

    handleJokeState() {
        let joke = this.props.joke;
        if(this.props.isLoading) {
            return Platform.OS === 'ios' ? <ProgressViewIOS /> : <ProgressBarAndroid />
        } else if(this.props.error === null) {
            return <Text style={styles.joke}>{ joke.length == 0 ? "Hello World" : joke }</Text>
        } else {
            return <Text style={styles.errorText}>Sorry :(</Text>
        }
    }

    onNextJoke() {
        this.props.getNextJoke();
    }
}