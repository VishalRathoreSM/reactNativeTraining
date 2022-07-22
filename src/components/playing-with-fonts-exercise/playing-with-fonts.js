import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {IconIcomoon} from '../shared/custom-icons';
import {GochiHandText} from '../shared/custom-text';
import {history, pencil} from '../../constants/font-codes';

const icons = [
  {text: '1. Caret up', name: 'caretup', customIcon: false},
  {text: '2. Caret down', name: 'caretdown', customIcon: false},
  {text: '3. Pencil', content: history, customIcon: true},
  {text: '4. History', content: pencil, customIcon: true},
];

const Header = () => {
  const {header, headerText} = styles;

  return (
    <View style={header}>
      <GochiHandText customStyle={headerText}>React Native Fonts</GochiHandText>
    </View>
  );
};

const IconsList = () => {
  const {
    iconHeader,
    sectionContainer,
    sectionTitle,
    iconRow,
    sectionDescription,
  } = styles;

  return (
    <View style={sectionContainer}>
      <GochiHandText customStyle={[sectionTitle, iconHeader]}>
        Icons
      </GochiHandText>
      <View>
        {icons.map(({text, name, customIcon, content}) => (
          <View key={text} style={iconRow}>
            <GochiHandText customStyle={sectionDescription}>
              {text}
            </GochiHandText>
            {customIcon ? (
              <IconIcomoon content={content} />
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
  const {sectionContainer, sectionTitle, sectionDescription} = styles;

  return (
    <View style={sectionContainer}>
      <GochiHandText customStyle={sectionTitle}>{title}</GochiHandText>
      <GochiHandText customStyle={sectionDescription}>{children}</GochiHandText>
    </View>
  );
};

const PlayingWithFonts = () => {
  const {highlight} = styles;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Section title="Step One">
            Edit <Text style={highlight}>App.js</Text> to change this screen and
            then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            Press <Text style={highlight}>Cmd + R</Text> in the simulator to
            reload your app's code.
          </Section>
          <Section title="Debug">
            Press <Text style={highlight}>Cmd + D</Text> in the simulator or
            Shake your device to open the React Native debug menu.
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
