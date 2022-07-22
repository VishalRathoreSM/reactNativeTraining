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
    const {dropdownContainer, label: labelS, btn, btnTxt, row, rowTxt} = styles;
    return (
      <View style={dropdownContainer}>
        <Text style={labelS}>{label}</Text>
        <Dropdown
          ref={ref}
          data={data}
          defaultButtonText={defaultButtonText}
          onSelect={selectedItem => {
            onSelect(id, selectedItem);
          }}
          buttonTextAfterSelection={renderBtnTextAfterSelection}
          rowTextForSelection={renderRowTextForSelection}
          buttonStyle={btn}
          buttonTextStyle={btnTxt}
          renderDropdownIcon={isOpened => (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color="#444"
              size={18}
            />
          )}
          dropdownIconPosition="right"
          rowStyle={row}
          rowTextStyle={rowTxt}
        />
      </View>
    );
  },
);

export default SelectDropdown;
