'use strict';

import React from 'react';
import {View, Text, Picker, StyleSheet, ScrollView} from 'react-native';
import {RadioButtonGroup, Subheader, Button, Divider} from 'react-native-material-design';

var SteelStrengthInTension = require('./FailureModes/SteelStrengthInTension');

const FAILURE_MODES = [
  'Steel strength in tension', 'Concrete breakout strength in tension', 'Pullout strength in tension',
  'Concrete side-face blowout strength in tension', 'Bond strength of adhesive anchor in tension',
  'Steel strength in shear', 'Concrete breakout strength in shear', 'Concrete pryout strength in shear'
];

var CalculatePage = React.createClass({

  getInitialState(){
    return {
      failureMode: ''
    }
  },

  _renderFailureModeForm (mode) {
    if (!mode) {
      return null;
    }

    switch (mode) {
      case 'Steel strength in tension':
        return <SteelStrengthInTension ref={component => this._form = component}/>;
    }

  },

  _onRun () {
    this._form.calculate();
  },

  _onClear () {
    this.setState({failureMode: FAILURE_MODES[0]});
  },

  render () {
    var form = this._renderFailureModeForm(this.state.failureMode);

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={true}>
          <Text style={styles.header}>Failure mode</Text>
          <Picker selectedValue={this.state.failureMode}
                  onValueChange={(mode) => this.setState({failureMode:mode})}
                  style={{color:'#000000'}}>
            {FAILURE_MODES.map((f, i) => {
              return <Picker.Item style={{fontSize:14}} key={i} value={f} label={f}/>
            })}
          </Picker>
          <Divider style={{marginBottom:5}}/>
          {form}
        </ScrollView>
        <Button value="RUN"
                text="RUN"
                overrides={{backgroundColor:'#607D8B',
                            textColor:'#FFFFFF'}}
                raised={true}
                onPress={this._onRun}/>
        <Button value="CLEAR"
                text="CLEAR"
                overrides={{backgroundColor:'#607D8B',
                            textColor:'#FFFFFF'}}
                raised={true}
                onPress={this._onClear}/>
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
    fontSize: 18,
    fontWeight: '200',
    marginTop: 10,
    color: '#000000'
  },
});

module.exports = CalculatePage;