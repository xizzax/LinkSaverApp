import {Image, StyleSheet, View} from 'react-native';
import {useColorScheme} from 'react-native';
import Colors from './styles/colors';
import {Text} from 'react-native';

let darkMode;

export default function Card(props) {
  const isDarkMode = useColorScheme() === 'dark';
  darkMode = isDarkMode;
  const {name, link} = props;
  return (
    <View style={styles.card}>
        {/* <Image source={require(imagesrc)} style={styles.cardImg}/> */}
      <View style={styles.cardContent}>
        <Text style={{color: darkMode ? Colors.black : Colors.white,}}>{props.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 1,
    marginTop: 14,
    padding: 30,
    borderRadius: 10,
    margin: 10,
    backgroundColor: darkMode ? Colors.light : Colors.dark,
  },
  cardImg:{
    resizeMode: "cover"
  },
  cardContent: {
    color: darkMode ? Colors.black : Colors.white,
    fontSize: 14,
    // marginTop: 14,
    // padding: 30,
    // backgroundColor: darkMode ? Colors.light : Colors.dark,
    // borderRadius: 10,
    // margin: 10,
  },
});
