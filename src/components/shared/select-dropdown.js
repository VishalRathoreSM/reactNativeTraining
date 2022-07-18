import React from 'react';
import {Text, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dropdown from 'react-native-select-dropdown';

const SelectDropdown = React.forwardRef(
  (
    {
      data,
      styles = {},
      onSelect = () => {},
      id,
      label = '',
      defaultButtonText = '',
      renderBtnTextAfterSelection = () => {},
      renderRowTextForSelection = () => {},
    },
    ref,
  ) => {
    const {
      dropdownContainerStyle,
      labelStyle,
      btnStyle,
      btnTxtStyle,
      rowStyle,
      rowTxtStyle,
    } = styles;
    return (
      <View style={dropdownContainerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <Dropdown
          ref={ref}
          data={data}
          defaultButtonText={defaultButtonText}
          onSelect={selectedItem => {
            onSelect(id, selectedItem);
          }}
          buttonTextAfterSelection={renderBtnTextAfterSelection}
          rowTextForSelection={renderRowTextForSelection}
          buttonStyle={btnStyle}
          buttonTextStyle={btnTxtStyle}
          renderDropdownIcon={isOpened => (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color="#444"
              size={18}
            />
          )}
          dropdownIconPosition="right"
          rowStyle={rowStyle}
          rowTextStyle={rowTxtStyle}
        />
      </View>
    );
  },
);

export default SelectDropdown;
