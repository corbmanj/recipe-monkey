import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import RecipeDetails from './RecipeDetails'
import NewRecipe from './NewRecipe'

export default class RightPanel extends Component {
  renderContent () {
    if (this.props.addingNewRecipe) {
      return (
        <NewRecipe
          cancelNew={this.props.cancelNew}
          addIngredient={this.props.addIngredient}
          saveDetails={this.props.saveDetails}
          saveRecipe={this.props.saveRecipe}
        />
      )
    } else {
      return <RecipeDetails selectedRecipe={this.props.selectedRecipe} addNewRecipe={this.props.addNewRecipe} />
    }
  }
  render () {
    return (
      <View style={styles.right}>
        { this.renderContent() }
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
});
