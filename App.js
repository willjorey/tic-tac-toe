import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

const PLAYER1 = 1;
const PLAYER2 = -1;
const TIE = 0;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      curPlayer: PLAYER1, 
    }

  }

  componentDidMount(){
  }

  initializeGame = () => {
    this.setState({
      gameState:      
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      curPlayer: PLAYER1
    })
  }


  renderIcon = (row, col) =>{
    var  value = this.state.gameState[row][col];
    switch(value){
      case 1: return <Icon name='close' style={styles.tileX}/>;
      case -1: return <Icon name='circle-outline' style={styles.tileO}/>;
      default: return <View/>;
    }
  }

  onTilePress = (row, col) =>{
    var player = this.state.curPlayer;
    var game = this.state.gameState.slice();
    if( game[row][col] === 0){
      game[row][col] = player;
      var nextPlayer = (player == PLAYER1) ? PLAYER2 : PLAYER1;
      this.setState({gameState: game, curPlayer: nextPlayer});
    }
    var winner = this.getWinner();
    if (winner === PLAYER1){
      Alert.alert('Player 1 wins!');
      this.initializeGame();
    }else if (winner === PLAYER2){
      Alert.alert('Player 2 wins!');
      this.initializeGame()
    }
  }

  getWinner = () => {
    const num_tiles = 3
    var rowSum;
    var colSum;
    var diagSum;
    var game = this.state.gameState;
    //Check Rows
    for (let i = 0; i < num_tiles; i ++){
      rowSum = game[i][0] + game[i][1] + game[i][2];
      if (rowSum === num_tiles){
        return PLAYER1;
      }else if (rowSum === -3){
        return PLAYER2;
      }
    }
    // Check columns

    for (let i = 0; i < num_tiles; i ++){
      colSum = game[0][i] + game[1][i] + game[2][i];
      if (colSum === num_tiles){
        return PLAYER1;
      }else if (colSum === -3){
        return PLAYER2;
      }
    }

    // Check Diagonals

    diagSum = game[0][0] + game [1][1] + game[2][2];
    if (diagSum === num_tiles){
      return PLAYER1;
    }else if (diagSum === -3){
      return PLAYER2;
    }

    diagSum = game[0][2] + game [1][1] + game[2][0];
    if (diagSum === num_tiles){
      return PLAYER1;
    }else if (diagSum === -3){
      return PLAYER2;
    }
    return 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>{this.renderIcon(0,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth: 0}]}>{this.renderIcon(0,1)}</TouchableOpacity> 
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>{this.renderIcon(0,2)}</TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>{this.renderIcon(1,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.tile}>{this.renderIcon(1,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth: 0}]}>{this.renderIcon(1,2)}</TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>{this.renderIcon(2,0)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth: 0}]}>{this.renderIcon(2,1)}</TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>{this.renderIcon(2,2)}</TouchableOpacity>
        </View>
      
        <View style={{paddingTop: 50}}>
        <Button onPress={()=>{this.initializeGame()}} title='New Game'/>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:1,
    width: 100,
    height: 100,
    alignItems:'center',
    justifyContent: 'center',
  },
  tileX:{
    color:'red',
    fontSize: 80,
  },

  tileO:{
    color:'green',
    fontSize: 80,
  }
});

