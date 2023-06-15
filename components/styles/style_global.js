import {StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import Colors from './colors';

function placeholder() {
  const isDarkMode = useColorScheme() === 'dark';
}

const globalstyles = StyleSheet.create({
  header: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 18,
  },
  textinputs: {
    borderColor: "#777",
    borderWidth: 2,
    margin: 5,
    padding: 2,
    height: 40,
    borderRadius: 4,
  }
});

export default globalstyles;
