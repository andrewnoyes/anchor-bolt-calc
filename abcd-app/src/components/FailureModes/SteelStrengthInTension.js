'use strict';

import React from 'react';
import {View, Text, Picker, StyleSheet, TextInput, ScrollView} from 'react-native';
import {RadioButton, Subheader, Checkbox} from 'react-native-material-design';

var SteelStrengthInTension = React.createClass({
  getInitialState () {
    return {
      diameter: 0,
      numberOfThreads: 0,
      yieldStrength: 0,
      isDuctile: true,
      allowableTensileStrength: null,
      allowableShearStrength: null
    }
  },

  calculate () {
    const ACI_CONSTANT = 0.9743;
    var area = (Math.PI / 4) *
      Math.pow((this.state.diameter - (ACI_CONSTANT / this.state.numberOfThreads)), 2);

    var ultimateStrength;
    if (1.9 * this.state.yieldStrength < 125000) {
      ultimateStrength = 1.9 * this.state.yieldStrength;
    } else {
      ultimateStrength = 125000;
    }

    var nominalTensileStrength, nominalShearStrength;
    nominalTensileStrength = nominalShearStrength = area * ultimateStrength;
    var allowableTensileStrength, allowableShearStrength;

    if (this.state.isDuctile) {
      allowableTensileStrength = 0.75 * nominalTensileStrength;
      allowableShearStrength = 0.65 * nominalShearStrength;
    } else {
      allowableTensileStrength = 0.65 * nominalTensileStrength;
      allowableShearStrength = 0.6 * nominalShearStrength;
    }

    this.setState({
      allowableTensileStrength: allowableTensileStrength,
      allowableShearStrength: allowableShearStrength
    });
  },

  _renderResults () {
    return (
      <View style={{flex:1,
                    flexDirection:'column',
                    alignItems:'stretch'}}>
        <Text style={styles.header}>Allowable Tensile Strength</Text>
        <Text>{this.state.allowableTensileStrength}</Text>
        <Text style={styles.header}>Allowable Shear Strength</Text>
        <Text>{this.state.allowableShearStrength}</Text>
      </View>
    )
  },

  render () {
    if (this.state.allowableShearStrength !== null &&
      this.state.allowableTensileStrength !== null) {
      return (this._renderResults());
    }

    return (
      <View style={{flex:1,
                    flexDirection:'column',
                    alignItems:'stretch'}}>
        <TextInput placeholder="Diameter of the bolt (in)"
                   keyboardType="numeric"
                   onChangeText={(text) => this.setState({diameter:parseFloat(text)})}/>
        <TextInput placeholder="Number of threads per inch"
                   keyboardType="numeric"
                   onChangeText={(text) => this.setState({numberOfThreads:parseFloat(text)})}/>
        <TextInput placeholder="Yield strength (psi)"
                   keyboardType="numeric"
                   onChangeText={(text) => this.setState({yieldStrength:parseFloat(text)})}/>
        <Subheader text="What behavior is the steel governed by?"/>
        <View style={{flexDirection:'row',
                      alignItems:'center'}}>
          <RadioButton value="Ductile"
                       label="Ductile"
                       primary="paperBlueGrey"
                       checked={this.state.isDuctile}
                       onCheck={() => this.setState({isDuctile:true})}/>
          <RadioButton value="Brittle"
                       label="Brittle"
                       primary="paperBlueGrey"
                       checked={!this.state.isDuctile}
                       onCheck={() => this.setState({isDuctile:false})}/>
        </View>

      </View>
    )
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontSize: 16,
    fontWeight: '200',
    marginTop: 10,
    color: '#000000'
  },
});

module.exports = SteelStrengthInTension;