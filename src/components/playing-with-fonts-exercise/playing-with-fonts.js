import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {customIcons} from '../../constants/custom-icons';
import MyAppText from '../shared/my-app-text';

const {pencil: pencilIcon, history: historyIcon} = customIcons;

const icons = [
  {text: '1. Caret up', name: 'caretup', customIcon: false},
  {text: '2. Caret down', name: 'caretdown', customIcon: false},
  {
    text: '3. Pencil',
    fontFamily: pencilIcon.fontFamily,
    content: pencilIcon.content,
    customIcon: true,
  },
  {
    text: '4. History',
    fontFamily: historyIcon.fontFamily,
    content: historyIcon.content,
    customIcon: true,
  },
];

const Header = () => {
  const {header: headerStyle, headerText: headerTextStyle} = styles;

  return (
    <View style={headerStyle}>
      <MyAppText customStyle={headerTextStyle}>React Native Fonts</MyAppText>
    </View>
  );
};

const IconsList = () => {
  const {
    iconHeader: iconHeaderStyle,
    sectionContainer: sectionContainerStyle,
    sectionTitle: sectionTitleStyle,
    iconRow: iconRowStyle,
    sectionDescription: sectionDescriptionStyle,
  } = styles;

  return (
    <View style={sectionContainerStyle}>
      <MyAppText customStyle={[sectionTitleStyle, iconHeaderStyle]}>
        Icons
      </MyAppText>
      <View>
        {icons.map(({text, name, customIcon, fontFamily, content}) => (
          <View key={text} style={iconRowStyle}>
            <MyAppText customStyle={sectionDescriptionStyle}>{text}</MyAppText>
            {customIcon ? (
              <MyAppText customStyle={{fontFamily}}>{content}</MyAppText>
            ) : (
              <IconAntDesign name={name} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const Section = ({children, title}) => {
  const {
    sectionContainer: sectionContainerStyle,
    sectionTitle: sectionTitleStyle,
    sectionDescription: sectionDescriptionStyle,
  } = styles;

  return (
    <View style={sectionContainerStyle}>
      <MyAppText customStyle={sectionTitleStyle}>{title}</MyAppText>
      <MyAppText customStyle={sectionDescriptionStyle}>{children}</MyAppText>
    </View>
  );
};

const PlayingWithFonts = () => {
  const {highlight: highlightStyle} = styles;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Section title="Step One">
            Edit <Text style={highlightStyle}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            Press <Text style={highlightStyle}>Cmd + R</Text> in the simulator
            to reload your app's code.
          </Section>
          <Section title="Debug">
            Press <Text style={highlightStyle}>Cmd + D</Text> in the simulator
            or Shake your device to open the React Native debug menu.
          </Section>
        </View>
        <IconsList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textTransform: 'capitalize',
    color: 'brown',
    fontSize: 28,
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  iconHeader: {color: 'green', textTransform: 'uppercase'},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
  },
  iconRow: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
  },
  highlight: {
    fontWeight: '700',
    color: 'red',
  },
});

export default PlayingWithFonts;
