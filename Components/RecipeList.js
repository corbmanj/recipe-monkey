import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  SegmentedControlIOS,
  TextInput,
  Text
} from 'react-native';
import CustomSegmentedControl from './CustomSegmentedControl';

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {sortOptions: ['mainIngredient', 'meal'], selectedIndex: 0, filter: ''};
  }
  
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.item} onPress={() => this.props.selectRecipe(item.id)}>
          {item.name}
        </Text>
      </View>
    )
  }
  _renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    )
  }
  _renderSection = ({section}) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>
          {section.title}
        </Text>
      </View>
    )
  }
  
  renderList (selectedIndex) {
    // build list of main ingredients
    if (!this.props.data) {return null}
    let filteredList = this.props.data.filter(recipe => recipe.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    let sectionTitles = []
    filteredList.sort((a, b) => {
      if (a.name < b.name) { return -1 }
      else { return 1 }
    })
    filteredList.forEach(recipe => {
      if (!sectionTitles.includes(recipe[this.state.sortOptions[selectedIndex]])) {
        newTitle = recipe[this.state.sortOptions[selectedIndex]] || 'Misc'
        sectionTitles.push(newTitle)
      }
    })
    const sectionedData = []
    sectionTitles.sort((a,b) => {
      if (['Misc', 'Sauce'].includes(a)) { return 1 }
      if (['Misc', 'Sauce'].includes(b)) { return -1 }
      if (a < b) { return -1 }
      else { return 1 }
    })
    sectionTitles.forEach((title, index) => {
      sectionedData[index] = {data: [], title: title}
      filteredList.forEach(recipe => {
        currentTitle = recipe[this.state.sortOptions[selectedIndex]] || 'Misc'
        if (currentTitle === title) {
          sectionedData[index].data.push(recipe)
        }
      })
    })
    return (
      <SectionList
        sections={sectionedData}
        renderSectionHeader={this._renderSection}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
        SectionSeparatorComponent={this._renderSeparator}
      />
      )
  }
  render() {
    return (
      <View>
        <CustomSegmentedControl
          values={['Ingredient', 'Meal']}
          selectedIndex={this.state.selectedIndex}
          onChange={(index) => {
            this.setState({selectedIndex: index});
          }}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="filter" 
          returnKeyType="search" 
          selectTextOnFocus={true}
          autoCapitalize="none"
          onChangeText={text => this.setState({filter: text})}
        />
       {this.renderList(this.state.selectedIndex)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 15,
    fontSize: 10
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5
  },
  section: {
    backgroundColor: '#CED0CE'
  },
  sectionText: {
    fontWeight: 'bold',
    marginLeft: 5
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
});