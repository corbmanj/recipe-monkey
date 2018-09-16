import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';

export default class IngredientsList extends Component {
  _keyExtractor = (item, index) => item.id || item.ingredient;
  _renderItem = ({item}) => {
    let ingredientText = `${item.count} ${item.measure} ${item.ingredient}`
    if (item.preparation) { ingredientText += `, ${item.preparation}` }
    return (
      <Text style={styles.item}>
        {ingredientText}
      </Text>
    )
  }
  _renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    )
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.props.unSelectRecipe}
          title="back"
          color="blue"
          accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
          data={this.props.selectedRecipe.ingredients}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
          extraData={this.props.selectedRecipe.ingredients ? this.props.selectedRecipe.ingredients.length : 0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
  item: {
    textAlign: 'left',
    marginLeft: 5,
    marginRight: 5,
    textAlignVertical: 'center'
  }
});
