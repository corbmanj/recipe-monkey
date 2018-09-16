import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import CustomSegmentedControl from './CustomSegmentedControl'
import AddDetails from './AddDetails'
import AddIngredients from './AddIngredients'
import AddInstrusctions from './AddInstructions'

export default class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {stage: 'details'};
  }

  saveDetailsAndMoveToIngredients = (detailsObject) => {
    this.props.saveDetails(detailsObject)
    this.setState({stage: 'ingredients'})
  }

  moveToInstructions = () => {
    this.setState({stage: 'instructions'})
  }
  
  conditionallyRenderStage = () => {
    switch (this.state.stage) {
      case 'details':
        return <AddDetails 
          saveDetails={this.saveDetailsAndMoveToIngredients}
          cancelNew={this.props.cancelNew}
          />
      case 'ingredients':
        return <AddIngredients
          addIngredient={this.props.addIngredient}
          cancelNew={this.props.cancelNew}
          moveToInstructions={this.moveToInstructions}
          />
      case 'instructions':
        return <AddInstrusctions 
          cancelNew={this.props.cancelNew}
          saveRecipe={this.props.saveRecipe}
        />
    }
  }
  
  render () {
    return this.conditionallyRenderStage()
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
