import React from 'react';
import {TouchableHighlight, StyleSheet, View, Text} from 'react-native';
import {OPERATION_ADD, OPERATION_SUBTRACT, OPERATION_DIVIDE, OPERATION_MULTIPLY} from '../actions/Types';

var Types = {
  NUMBER: 'NUMBER',
  DECIMAL: 'DECIMAL',
  SIGN: 'SIGN'
};

var inputs = [
  {value: 1, type: Types.NUMBER},
  {value: 2, type: Types.NUMBER},
  {value: 3, type: Types.NUMBER},
  {value: 4, type: Types.NUMBER},
  {value: 5, type: Types.NUMBER},
  {value: 6, type: Types.NUMBER},
  {value: 7, type: Types.NUMBER},
  {value: 8, type: Types.NUMBER},
  {value: 9, type: Types.NUMBER},
  {value: '+/-', type: Types.SIGN},
  {value: 0, type: Types.NUMBER},
  {value: '.', type: Types.DECIMAL},
];
var operations = [
  {value: '/',  operation: OPERATION_DIVIDE},
  {value: '-',  operation: OPERATION_SUBTRACT},
  {value: '+',  operation: OPERATION_ADD},
  {value: 'x',  operation: OPERATION_MULTIPLY}
];

class Inputs extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        {this.renderInputRows()}
        {this.renderOperationRow()}
        {this.renderActionRow()}
      </View>
    )
  }
  renderInputRows() {
    var {inputNumber, inputSigned, inputDecimal} = this.props;
    return inputs.reduce((collection, input) => {
      if (collection[collection.length - 1].length === 3) {
        collection.push([]);
      }
      collection[collection.length-1].push(input);
      return collection;
    }, [[]]).map((group, rowIndex) => {
      var columns = group.map((item, columnIndex) => {
        return (
          <TouchableHighlight
            key={'inputRow_' + rowIndex + '_inputCol_' + columnIndex}
            underlayColor="#ededed"
            style={styles.input}
            onPress={() => {
              if (item.type === Types.NUMBER) {
                inputNumber(item.value);
              } else if (item.type === Types.DECIMAL) {
                inputDecimal();
              } else if (item.type === Types.SIGN) {
                inputSigned();
              }
            }}>
            <Text style={styles.inputText}>{item.value}</Text>
          </TouchableHighlight>
        );
      });
      return (
        <View style={[styles.row, styles.inputRow]} key={'inputRow_' + rowIndex}>
          {columns}
        </View>
      );
    });
  }
  renderOperationRow() {
    var {performOperation} = this.props;
    var columns = operations.map((operation, index) => {
      console.log(operations)
      return (
        <TouchableHighlight
          key={'operationRow' + index}
          style={[styles.operationInput]}
          underlayColor="#ededed"
          onPress={() => performOperation(operation.operation)}>
          <Text style={styles.operationInputText}>{operation.value}</Text>
        </TouchableHighlight>
      );
    });
    return (
      <View style={[styles.row, styles.operationRow]}>
        {columns}
      </View>
    );
  }
  renderActionRow() {
    var {calculate, undo} = this.props;
    return (
      <View style={[styles.row, styles.actionRow]}>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonUndo]}
          underlayColor='#ededed'
          onPress={undo}>
          <Text style={[styles.actionButtonText]}>DEL</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonEquals]}
          unerlayColor='#ededed'
          onPress={calculate}>
          <Text style={[styles.actionButtonText]}>=</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor:  '#4c4c4c',
    flex: 1
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed'
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ededed'
  },
  text: {
    color: '#000',
    fontSize: 18
  },
  operationRow: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  operationInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ededed'
  },
  inputText: {
    color: '#FFF',
    fontSize:25
  },
  operationInputText: {
    color: '#FFF',
    fontSize:25
  },
  actionRow: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#FFF',
    fontSize:25
  },
  actionButtonUndo: {
    marginRight: 10,
    borderColor: '#ededed'
  },
  actionButtonEquals: {
    marginLeft: 10,
    borderColor: '#ededed'
  }
});

export default Inputs;
