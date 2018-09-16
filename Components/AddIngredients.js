import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import CustomSegmentedControl from './CustomSegmentedControl'

export default class AddIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countArray: ['1/4', '1/2', '3/4', '1', '2', '3', '4'],
      countIndex: 0,
      measureArray: ['tsp', 'tbsp', 'cup', 'oz', 'lb'],
      measureIndex: 0,
      name: '',
      preparation: ''
    };
  }
  addIngredient = () => {
    this.props.addIngredient({
                              count: this.state.countArray[this.state.countIndex],
                              measure: this.state.measureArray[this.state.measureIndex],
                              ingredient: this.state.name,
                              preparation: this.state.preparation
                             })
    this.setState({
      countIndex: 0,
      measureIndex: 0,
      name: '',
      preparation: ''
    })
  }
  
  render () {
    return (
      <View>
        <Text>Ingredient Count</Text>
        <CustomSegmentedControl
          style={styles.picker}
          values={['1/4', '1/2', '3/4', '1', '2', '3', '4']}
          selectedIndex={this.state.countIndex}
          onChange={(indexy) => {
            this.setState({countIndex: indexy});
          }}
        />
        <Text>Ingredient Meaure</Text>
        <CustomSegmentedControl
          style={styles.picker}
          values={['tsp', 'tbsp', 'cup', 'oz', 'lb']}
          selectedIndex={this.state.measureIndex}
          onChange={(index) => {
            this.setState({measureIndex: index});
          }}
        />
        <Text>Ingredient Name</Text>
        <TextInput
          placeholder="name"
          selectTextOnFocus={true}
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
          autoCapitalize="none"
        />
        <Text>Ingredient Preparation</Text>
        <TextInput
          placeholder="preparation (e.g. sliced)"  
          selectTextOnFocus={true}
          value={this.state.preparation}
          onChangeText={text => this.setState({preparation: text})}
          autoCapitalize="none"
        />
        <Button
          title="add this ingredient to recipe"
          onPress={this.addIngredient}
        />
        <Button
          title="move on to recipe instructions"
          onPress={this.props.moveToInstructions}
        />
        <Button
          title="cancel"
          onPress={this.props.cancelNew}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flex: 3
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5
  },
  details: {
    marginBottom: 10,
    marginLeft: 5
  },
  item: {
    marginLeft: 10,
    marginRight: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
  picker: {
    width: '80%'
  }
});
