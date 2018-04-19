import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {OPERATION_ADD, OPERATION_SUBTRACT, OPERATION_DIVIDE, OPERATION_MULTIPLY} from '../actions/Types';
import OperationSymbols from '../constants/Operations';
import Colors from '../Colors';
import {aggregateCalculatorHistory} from '../Helper';

class OutputScreen extends React.Component {
  getOutput() {
    var {currentInput, history} = this.props.calculations;
    if (currentInput.length === 0 && history.length === 0) {
      return 0
    } else if (currentInput.length === 0) {
      return '';
    } else {
      return currentInput.join('');
    }
  }
  renderAggregate() {
    var {currentInput, history, operation, offset} = this.props.calculations;
    if (history.length > 0) {
      let aggregate = aggregateCalculatorHistory(history, offset);
      let highlight = null;
     
      return (
        <Text style={[styles.aggregate, highlight]}>{aggregate} {currentInput.length > 0 ? OperationSymbols[operation] : ''}</Text>
      );
    }
  }
  render() {
    var {offset, history, operation} = this.props.calculations;
    var offsetStyle = null;
    if (offset !== null) {
      offsetStyle = styles[history[offset + 1].operation];
    }
    return (
      <View style={[styles.view, this.props.style, styles[operation], offsetStyle]}>
        {this.renderAggregate()}
        <Text style={styles.text}>{this.getOutput()}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  text: {
    color: '#000',
    fontSize: 38
  },
  aggregate: {
    color: '#000',
    fontSize: 38,
    marginRight: 5
  },
  highlightAggregate: {
    color: '#fff'
  },
  
})

export default OutputScreen;
