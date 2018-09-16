import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, FlatList, Button } from 'react-native'

export default class AddInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: ['']
    };
  }

  saveRecipe = () => {
    this.props.saveRecipe(this.state.instructions)
  }
  
  addInstruction = () => {
    this.setState(prevState => {
      prevState.instructions.push('')
      return prevState
    })
  }

  removeInstruction = () => {
    this.setState(prevState => {
      prevState.instructions.pop()
      return prevState
    })
  }

  updateInstruction = (text, index) => {
    this.setState(prevState => {
      prevState.instructions[index] = text
      return prevState
    })
  }

  renderStepInputBox = (instruction) => {
    return (
      <TextInput
        placeholder={`Step ${instruction.item.index+1}`}
        selectTextOnFocus={true}
        value={instruction.item.instruction}
        onChangeText={text => this.updateInstruction(text, instruction.item.index)}
        autoCapitalize="none"
      />
    )
  }
  
  render () {
    return (
      <View>
        <Text>Instructions</Text>
        <FlatList
          data={this.state.instructions.map((instruction, index) => {
            return {index, instruction}
          })}
          renderItem={this.renderStepInputBox}
          extraData={this.state.instructions.length}
        />
        <Button
          title="Add step"
          onPress={this.addInstruction}
        />
        <Button
          title="Remove last step"
          onPress={this.removeInstruction}
        />
        <Button
          title="Save recipe"
          onPress={this.saveRecipe}
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
    width: '100%'
  },
  warning: {
    color: '#F00'
  }
});
