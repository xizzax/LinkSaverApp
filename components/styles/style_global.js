import {StyleSheet} from 'react-native';
import {useColorScheme} from 'react-native';
import Colors from './colors';

let darkMode;
function placeholder() {
  const isDarkMode = useColorScheme() === 'dark';
  darkMode = isDarkMode;
}

const globalstyles = StyleSheet.create({
  header: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 18,
    textAlign:"center",
    color: darkMode ? Colors.white : Colors.black
  },
  textinputs: {
    borderColor: "#777",
    borderWidth: 2,
    margin: 5,
    padding: 5,
    height: 40,
    borderRadius: 4,
    fontSize: 18
  }
});

export default globalstyles;
