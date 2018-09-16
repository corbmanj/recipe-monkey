import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomSegmentedControl (props) {
  
  const sections = props.values.map((section, index) => {
    let controlStyleList = [styles.control]
    let controlTextStyleList = [styles.controlText]
    if (props.smallText) {
      controlTextStyleList.push(styles.smallText)
    }
    if (index === 0 ) {controlTextStyleList.push(styles.leftControlText)}
    else if (index === props.values.length - 1) {controlTextStyleList.push(styles.rightControlText)}
    if (index === props.selectedIndex) {
      controlStyleList.push(styles.selectedControl)
      controlTextStyleList.push(styles.selectedControlText)
    }
    return (
      <View key={index} onPress={() => this.handlePress(index)} style={controlStyleList}>
        <Text onPress={() => props.onChange(index)} style={controlTextStyleList}>{section}</Text>
      </View>
    )
  })
  
  return (
    <View style={[styles.mainControl, props.style]}>
      {sections}
    </View>
  )
}

const styles = StyleSheet.create({
  mainControl: {
    backgroundColor:'#68a0cf',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    height: 20,
    marginTop: 5
  },
  control: {
    flex: 1
  },
  selectedControl: {
    backgroundColor: '#fff',
  },
  controlText: {
    height: '100%',
    color:'#fff',
    textAlign:'center',
  },
  leftControlText: {
    marginLeft: 5
  },
  rightControlText: {
    marginRight: 5
  },
  selectedControlText: {
    color: '#68a0cf'
  },
  smallText: {
    fontSize: 11,
    lineHeight: 17
  }
});