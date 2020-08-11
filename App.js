import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons'

function Row(props) {
    return <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.tile} onPress={props.onPress}>{props.renderIcon}</TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={props.onPress1}>{props.renderIcon1}</TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={props.onPress2}>{props.renderIcon2}</TouchableOpacity>
    </View>;
}

function TicTacToeBoard(props) {
    return <>
        <Row onPress={props.onPress} renderIcon={props.renderIcon}
             onPress1={props.onPress1} renderIcon1={props.renderIcon1}
             onPress2={props.onPress2} renderIcon2={props.renderIcon2}/>
        <Row onPress={props.onPress} renderIcon={props.renderIcon}
             onPress1={props.onPress1} renderIcon1={props.renderIcon1}
             onPress2={props.onPress2} renderIcon2={props.renderIcon2}/>
        <Row onPress={props.onPress} renderIcon={props.renderIcon}
             onPress1={props.onPress1} renderIcon1={props.renderIcon1}
             onPress2={props.onPress2} renderIcon2={props.renderIcon2}/>
    </>;
}

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            currentPlayer: 1,
        }
    }

    renderIcon = (row, column) => {
        const value = this.state.gameState[row][column]
        switch (value) {
            case 1:
                return <Icon name="close" style={styles.tileX}/>
            case -1:
                return <Icon name="circle-outline" style={styles.tileO}/>
            default:
                return <View/>
        }
    }

    onTilePress = (row, column) => {
        if (this.state.gameState[row][column] !== 0) return
        const {currentPlayer} = this.state
        const array = [...this.state.gameState]
        array[row][column] = currentPlayer
        const newPlayer = this.state.currentPlayer === 1 ? -1 : 1
        this.setState({gameState: array, currentPlayer: newPlayer})
    }

    reset = () => {
        this.setState({
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            currentPlayer: 1,
        })
    }

    determineWinner = () => {
        let board = this.state.gameState;
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                return board[i][0]
            }
            if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i]
            }
            if (board[1][1] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2]) {
                return board[1][1]
            }
            if (board[1][1] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                return board[1][1]
            }
        }
        return 0
    }

    displayWinner = () => {
        const winner = this.determineWinner();
        if (!this.state.gameState.flat().includes(0) || winner !== 0) {
            if (winner === -1) {
                return <Text style={styles.winner}>{"O's WON!"}</Text>
            } else if (winner === 1) {
                return <Text style={styles.winner}>{"X's WON!"}</Text>
            } else {
                return <Text style={styles.winner}>{'IT IS A DRAW!'}</Text>
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>TIC-TAC-TOE</Text>
                <Text style={styles.turn}>{`Player ${this.state.currentPlayer < 0 ? 2 : 1}'s turn!`}</Text>
                <TicTacToeBoard onPress={() => this.onTilePress(0, 0)} renderIcon={this.renderIcon(0, 0)}
                                onPress1={() => this.onTilePress(0, 1)} renderIcon1={this.renderIcon(0, 1)}
                                onPress2={() => this.onTilePress(0, 2)} renderIcon2={this.renderIcon(0, 2)}/>
                <TouchableOpacity onPress={this.reset}><Text style={styles.reset}>{'RESET!'}</Text></TouchableOpacity>
                {this.displayWinner()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        marginTop: 40,
        marginBottom: 30,
        borderWidth: 3.2,
        padding: 4,
        borderColor: '#20232a',
        borderRadius: 5,
        backgroundColor: '#ed601f',
        color: '#1fb1ed',
        textAlign: 'center',
        fontSize: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#f7bc33',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    tile: {
        borderWidth: 2.5,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tileX: {
        color: 'red',
        fontSize: 65,
    },
    tileO: {
        color: 'green',
        fontSize: 65,
    },
    reset: {
        color: '#97f5a4',
        backgroundColor: '#452229',
        fontSize: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
        marginTop: 7,
        padding: 5,
    },
    winner: {
        marginTop: 35,
        borderWidth: 2.3,
        color: 'black',
        textAlign: 'center',
        fontSize: 50,
    },
    turn: {
        marginBottom: 15,
        color: '#ff1f4e',
        textAlign: 'center',
        fontSize: 35,
    }
})
