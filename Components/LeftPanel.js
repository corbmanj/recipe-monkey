import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from 'react-native';
import RecipeList from './RecipeList'
import IngredientsList from './IngredientsList'

export default class LeftPanel extends Component {
  
  renderListOrIngredients () {
    if (this.props.selectedRecipe) {
      return (
        <IngredientsList 
          unSelectRecipe={this.props.unSelectRecipe}
          selectedRecipe={this.props.selectedRecipe}
        />
      )
    } else {
      return (
        <RecipeList
          data={this.props.data}
          selectRecipe={this.props.selectRecipe}
          selectedRecipe={this.props.selectedRecipe}
        />
      )
    }
  }
  
  render() {
    return (
      <View style={styles.left}>
        {this.renderListOrIngredients()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    backgroundColor: 'rgba(220, 220, 220, 0.8)'
  }
});
