/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LeftPanel from './Components/LeftPanel'
import RightPanel from './Components/RightPanel'
// import data from './data'

export default class recipeMonkey extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    return fetch('https://script.google.com/macros/s/AKfycbzQ50gWMloHtpmvEq9bdR5hoPTJlKDWCXi9eEZw7YFzU0tqG8w/exec')
      .then((response) => response.json())
      .then((responseJson) => {
        let recipes = responseJson.recipes
        recipes.forEach(recipe => {
          recipe.ingredients = responseJson.ingredients.filter(ingredient => ingredient.recipeId === recipe.id)
          recipe.instructions = responseJson.instructions.filter(instruction => instruction.recipeId === recipe.id)
        })
        this.setState({
          isLoading: false,
          dataSource: recipes,
        });
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  
  selectRecipe = (value) => {
    const recipe = this.state.dataSource.find(el => el.id === value)
    console.log(recipe)
    this.setState({selectedRecipe: recipe})
  }
  addNewRecipe = () => {
    this.setState({selectedRecipe: {}, addingNewRecipe: true})
  }
  cancelNew = () => {
    this.setState({selectedRecipe: null, addingNewRecipe: false})
  }
  unSelectRecipe = () => {
    this.setState({selectedRecipe: null})
  }
  saveDetails = (detailsObject) => {
    this.setState(prevState => {
      prevState.selectedRecipe.name = detailsObject.name
      prevState.selectedRecipe.mainIngredient = detailsObject.mainIngredient
      prevState.selectedRecipe.meal = detailsObject.meal
      prevState.selectedRecipe.active_time = detailsObject.activeTime
      prevState.selectedRecipe.total_time = detailsObject.totalTime
      prevState.selectedRecipe.servings = detailsObject.servings
      return prevState
    })
  }
  addIngredient = (ingredient) => {
    this.setState(prevState => {
      if (!prevState.selectedRecipe.ingredients) {
        prevState.selectedRecipe.ingredients = []
      }
      prevState.selectedRecipe.ingredients.push(ingredient)
      return prevState
    })
  }
  saveRecipe = (instructions) => {
    this.setState(prevState => {
      instructionsObject = instructions.map((text, id) => {
        return {
          id,
          ordering: id+1,
          text
        }
      })
      prevState.selectedRecipe.instructions = instructionsObject
      prevState.addingNewRecipe = false
      this.sendRecipeToDB(prevState.selectedRecipe)
      return prevState
    })
  }
  sendRecipeToDB(recipe) {
    console.log(recipe)
    placeholderRecipe = {
      name: "Kale Salad",
      mainIngredient: "Kale",
      meal: "Main",
      active_time: "5",
      total_time: "8",
      servings: "4",
      ingredients: [
        {
          count: "1",
          ingredient: "kale",
          measure: "cup",
          preparation: "sliced"
        },
        {
          count: "2",          
          ingredient: "butter",
          measure: "lb",
          preparation: ""
        }
      ],
      instructions: [
        {
          id: 0,
          ordering: 1,
          text: "one"
        },
        {
          id: 1,
          ordering: 2,
          text: "two"
        },
        {
          id: 2,
          ordering: 3,
          text: "and three"
        }
      ]
    }
    return fetch('https://script.google.com/macros/s/AKfycby5ErfSyFqDJByZ3o8WzC96tzoqfMWlXwOvCOG7PpNn73Q5LD0/exec', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      referrer: "no-referrer",
      body: JSON.stringify(placeholderRecipe)
  })
  .then(response => response.json())
  .then(responeJSON => {
    console.log(responeJSON)
  });
  }

  render() {
    return (
      <View style={styles.container}>
        <LeftPanel
          data={this.state.dataSource}
          selectRecipe={this.selectRecipe}
          selectedRecipe={this.state.selectedRecipe}
          unSelectRecipe={this.unSelectRecipe}
        />
        <RightPanel
          selectedRecipe={this.state.selectedRecipe}
          addNewRecipe={this.addNewRecipe}
          cancelNew={this.cancelNew}
          addingNewRecipe={this.state.addingNewRecipe}
          addIngredient={this.addIngredient}
          saveDetails={this.saveDetails}
          saveRecipe={this.saveRecipe}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('recipeMonkey', () => recipeMonkey);
