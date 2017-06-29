/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.logic');

goog.require('Blockly.Python');


Blockly.Python['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'false';
    branchCode = Blockly.Python.statementToCode(block, 'DO' + n) ||
        Blockly.Python.PASS;
    code += (n == 0 ? 'if ' : 'elif ' ) + conditionCode + ':\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
        Blockly.Python.PASS;
    code += 'else:\n' + branchCode;
  }
  return code;
};

Blockly.Python['controls_ifelse'] = Blockly.Python['controls_if'];

Blockly.Python['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = Blockly.Python.ORDER_RELATIONAL;
  var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Python.ORDER_LOGICAL_AND :
      Blockly.Python.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Python.valueToCode(block, 'A', order);
  var argument1 = Blockly.Python.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'False';
    argument1 = 'False';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == 'and') ? 'True' : 'False';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Python['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Python.valueToCode(block, 'BOOL',
      Blockly.Python.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + argument0;
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

//

// Blockly.Python['weather'] = function(block) {
//   var code = (block.getFieldValue('weather') == 'temp') ? 'temp' : 'humi';
//
//   return [code, Blockly.Python.ORDER_NONE];
// };

Blockly.Python['weather'] = function(block) {
  var code = (block.getFieldValue('weather') == 'temp') ? 'temperatureFromSky' : 'humidityFromSky';
  // console.log(block.getFieldValue('weather'));
  return [code+'()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['SKY'] = function(block) {
  return ['SKYFromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['PTY'] = function(block) {
  return ['PTYFromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['dust'] = function(block) {
  return ['dustFromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['soil_humi_sensor'] = function(block) {
  return ['soilHumidity()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['pressure_sensor'] = function(block) {
  return ['pressureDetect()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['temp_humi_sensor'] = function(block) {
  var code = (block.getFieldValue('weather') == 'temp') ? 'temperatureFromSensor' : 'humidityFromSensor';
  return [code+'()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['human_sensor'] = function(block) {
  return ['recognizeHuman()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['distance_sensor'] = function(block) {
  return ['distance()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['knock_sensor'] = function(block) {
  return ['knock()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['clap_sensor'] = function(block) {
  return ['clapCount()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['btn_sensor'] = function(block) {
  return ['checkButton()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['btn_cnt_sensor'] = function(block) {
  return ['checkButtonCount()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['illumination_sensor'] = function(block) {
  return ['illuminationSensing()', Blockly.Python.ORDER_FUNCTION_CALL];
};
Blockly.Python['SW'] = function(block) {
  return ['SW', Blockly.Python.ORDER_FUNCTION_CALL];
};
//

Blockly.Python['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['logic_null'] = function(block) {
  // Null data type.
  return ['None', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Python.valueToCode(block, 'IF',
      Blockly.Python.ORDER_CONDITIONAL) || 'False';
  var value_then = Blockly.Python.valueToCode(block, 'THEN',
      Blockly.Python.ORDER_CONDITIONAL) || 'None';
  var value_else = Blockly.Python.valueToCode(block, 'ELSE',
      Blockly.Python.ORDER_CONDITIONAL) || 'None';
  var code = value_then + ' if ' + value_if + ' else ' + value_else;
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};


////////////////////////////////////////////
//미세
Blockly.Python['PM10'] = function(block) {
  return ['PM10FromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['PM25'] = function(block) {
  return ['PM25FromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['SO2'] = function(block) {
  return ['SO2FromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['CO'] = function(block) {
  return ['COFromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['O3'] = function(block) {
  return ['O3FromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['NO2'] = function(block) {
  return ['NO2FromSky()', Blockly.Python.ORDER_FUNCTION_CALL];
};