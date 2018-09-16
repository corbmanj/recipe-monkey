import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

export default class RecipeDetails extends Component {
  
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({item}) => {
    return (
      <Text style={styles.item}>
        {`${item.ordering}. ${item.text}`}
      </Text>
    )
  }
  _renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    )
  }
  
  renderSteps () {
    return (
      <FlatList
        data={this.props.selectedRecipe.instructions}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
      />
      )
  }
  renderRecipeDetails () {
    const recipe = this.props.selectedRecipe
    let totalTime = ''
    if (recipe.total_time > 120) {
      const numHours = Math.floor(recipe.total_time / 60)
      totalTime += numHours + ' hours '
      totalTime += recipe.total_time - numHours * 60 + ' min,'
    } else { totalTime = recipe.total_time + ' min,'}
    return <Text style={styles.details}>Active Time: {this.props.selectedRecipe.active_time} min, Total Time: {totalTime} Servings: {recipe.servings}</Text>
  }
  renderTopInfo () {
    if (this.props.selectedRecipe) {
      return (
        <Text style={styles.title}>
          { this.props.selectedRecipe.name }
        </Text>
      )
    } else {
      return (
        <View>
          <Text style={styles.title}>Select a recipe at left</Text>
          <Text>OR</Text>
          <Button
            title="Add a new recipe"
            onPress={this.props.addNewRecipe}
          />
        </View>
      )
    } 
  }

  render() {
    return (
      <View>
        { this.renderTopInfo() }
        { this.props.selectedRecipe && this.renderRecipeDetails() }
        { this.props.selectedRecipe && this.renderSteps() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
