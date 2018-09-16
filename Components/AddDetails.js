import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import CustomSegmentedControl from './CustomSegmentedControl'

export default class AddDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      meal: '',
      mealOptionsArray: ['Main', 'Breakfast', 'Dessert', 'Side', 'Sauce'],
      mealOptionsIndex: 0,
      mainIngredient: ''
    };
  }
  saveDetails = () => {
    this.props.saveDetails({      
      name: this.state.name,
      meal: this.state.mealOptionsArray[this.state.mealOptionsIndex],
      mainIngredient: this.state.mainIngredient,
      activeTime: this.state.activeTime,
      totalTime: this.state.totalTime,
      servings: this.state.servings
    })
  }
  validateNumberAndSetState = (number, propertyName) => {
    if (/\D/.test(number)) {
      this.setState({invalidNumber: true})
    } else {
      this.setState(prevState => {
        prevState[propertyName] = number
        prevState.invalidNumber = false
        return prevState
      })
    }
  }
  renderInvalidNumberWarning = () => {
    return (
      <Text style={styles.warning}>
        Invalid Number: Please enter a number
      </Text>
    )
  }
  
  render () {
    return (
      <View>
        <Text>Recipe Name</Text>
        <TextInput
          placeholder="recipe name"
          selectTextOnFocus={true}
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
          autoCapitalize="none"
        />
        <Text>Meal Type</Text>
        <CustomSegmentedControl
          style={styles.picker}
          smallText={true}
          values={['Main', 'Breakfast', 'Dessert', 'Side', 'Sauce']}
          selectedIndex={this.state.mealOptionsIndex}
          onChange={(indexy) => {
            this.setState({mealOptionsIndex: indexy});
          }}
        />
        <Text>Main Ingredient</Text>
        <TextInput
          placeholder="main ingredient"
          selectTextOnFocus={true}
          value={this.state.mainIngredient}
          onChangeText={text => this.setState({mainIngredient: text})}
          autoCapitalize="none"
        />
        {this.state.invalidNumber && this.renderInvalidNumberWarning()}
        <Text>Active Time (min)</Text>
        <TextInput
          placeholder="number of minutes"
          keyboardType='numeric'
          selectTextOnFocus={true}
          value={this.state.activeTime}
          onChangeText={number => this.validateNumberAndSetState(number, 'activeTime')}
          autoCapitalize="none"
        />
        <Text>Total Time (min)</Text>
        <TextInput
          placeholder="number of minutes"
          keyboardType='numeric'
          selectTextOnFocus={true}
          value={this.state.totalTime}
          onChangeText={number => this.validateNumberAndSetState(number, 'totalTime')}
          autoCapitalize="none"
        />
        <Text>Number of Servings</Text>
        <TextInput
          placeholder="number of minutes"
          keyboardType='numeric'
          selectTextOnFocus={true}
          value={this.state.servings}
          onChangeText={number => this.validateNumberAndSetState(number, 'servings')}
          autoCapitalize="none"
        />
        <Button
          title="Save details and add ingredients"
          onPress={this.saveDetails}
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
