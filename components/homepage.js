import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from './styles/colors';
import globalstyles from './styles/style_global';
import {useColorScheme} from 'react-native';
import {useState} from 'react';
//figure out a way to get username
let darkMode;
export default function Homepage(props) {
  const {username} = props;

  //dealing with dark mode
  const isDarkMode = useColorScheme() === 'dark';
  darkMode = isDarkMode;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //declaring the array of links (each in its own object)
  const [links, setLinks] = useState([
    {name: 'Facebook', link: 'facebook.com', key: '1'},
    {name: 'Google', link: 'google.com', key: '2'},
    {name: 'Twitter', link: 'twitter.com', key: '3'},
    {name: 'Instagram', link: 'instagram.com', key: '4'},
    {name: 'ILKpop 💖', link: 'ilkpop.com', key: '5'},
    {name: 'Yahoo', link: 'yahoo.com', key: '6'},
    {name: 'Youtube', link: 'youtube.com', key: '7'},
    {name: 'Gmail', link: 'mail.google.com', key: '8'},
  ]);

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={globalstyles.header}>Welcome to {username}'s Linktree</Text>
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {/* <ScrollView> */}
            {links.map(item => {
              return (
                <View key={item.key}>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              );
            })}
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    // flex:1
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 30,
  },
  listContainer: {
    // flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: darkMode ? Colors.black : Colors.white,
    fontSize:14,
    marginTop: 14,
    padding: 30,
    backgroundColor: darkMode ? Colors.lighter : Colors.darker,
    borderRadius: 10,
    margin: 10,
  },
});
