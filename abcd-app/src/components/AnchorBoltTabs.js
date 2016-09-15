'use strict';

import React from 'react';
import {View, Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
const HistoryPage = require ('./HistoryPage'),
      CalculatePage = require('./CalculatePage');

var TabView = React.createClass({

    render () {
        return (
            <ScrollableTabView tabBarPosition="bottom"
                               tabBarInactiveTextColor="#9E9E9E"
                               tabBarActiveTextColor="#546E7A"
                               tabBarUnderlineColor="#546E7A">
                <CalculatePage tabLabel="CALCULATE"
                               navigator={this.props.navigator}/>
                <HistoryPage tabLabel="HISTORY"
                             navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
});

module.exports = TabView;