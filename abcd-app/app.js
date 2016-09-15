'use strict';

import React from 'react';
import {View, Navigator, Text, Dimensions} from 'react-native';
const TabView = require('./src/components/AnchorBoltTabs');
const NavigationBar = require('react-native-navbar');

const WIDTH = Dimensions.get('window').width;

var App = React.createClass({

    _renderScene (route, navigator) {
        switch (route) {

            default:
                return <TabView navigator={navigator}/>
        }
    },

    render () {
        var titleConfig = (
          <View style={{alignItems:'center',
                        backgroundColor:'#546E7A',
                        alignSelf:'stretch'}}>
                <Text style={{color:'#F5F5F5',
                              fontSize: 20,
                              fontWeight:'500'}}>
                    ABCD
                </Text>
          </View>
        );

        return (
            <View style={{flex:1}}>
                <NavigationBar title={titleConfig}
                               tintColor='#546E7A'/>
                <Navigator ref={component => this._navigator = component}
                           initialRoute={{}}
                           renderScene={this._renderScene}/>
            </View>
        )
    }
});

module.exports = App;