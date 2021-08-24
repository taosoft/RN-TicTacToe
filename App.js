import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default function App() {
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])

  const [currentPlayer, setCurrentPlayer] = useState(1)

  resetGame = () => {
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
    setCurrentPlayer(1)
  }

  getWinner = () => {
    const NUM_TILES = 3;
    let sumRow, sumCol, sum;
    let arr = gameState;

    for(let i = 0; i < NUM_TILES; i++){
      //Filas
      sumRow = arr[i, 0] + arr[i][1] + arr[i][2];
      console.log(sumRow);
      if(sumRow === 3) { return 1;}
      else if(sumRow === -3) { return -1 };
      
      //Columnas
      sumCol = arr[0, i] + arr[1][i] + arr[2][i];
      if(sumCol === 3) { return 1;}
      else if(sumCol === -3) { return -1 };
    }


    //Diagonales
    sum = arr[0, 0] + arr[1][1] + arr[2][2];
    if(sum === 3) { return 1;}
    else if(sum === -3) { return -1 };
    sum = arr[2, 0] + arr[1][1] + arr[0][2];
    if(sum === 3) { return 1;}
    else if(sum === -3) { return -1 };

    return 0;
  }

  onTilePress = (row, col) => {
    var value = gameState[row][col];
    if(value !== 0) { return; }

    var arr = gameState.slice();
    arr[row][col] = currentPlayer;
    setGameState(arr);
    setCurrentPlayer(currentPlayer === 1 ? -1 : 1)

    var winner = getWinner()
    if(winner === 1){
      Alert.alert("Gana Jugador 1")
      resetGame()
    }
    else if(winner === -1){
      Alert.alert("Gana Jugador 2")
      resetGame()
    }
  }

  renderIcon = (row, col) => {
    var value = gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onTilePress(0, 0)} style={styles.tile}>
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 1)} style={styles.tile}>
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 2)} style={styles.tile}>
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onTilePress(1, 0)} style={styles.tile}>
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 1)} style={styles.tile}>
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 2)} style={styles.tile}>
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onTilePress(2, 0)} style={styles.tile}>
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 1)} style={styles.tile}>
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 2)} style={styles.tile}>
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>

      <View style={{paddingTop: 50}}/>
      <Button title="Reiniciar" onPress={() => resetGame()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: "red",
    fontSize: 60,
  },
  tileO: {
    color: "green",
    fontSize: 60,
  }
});
