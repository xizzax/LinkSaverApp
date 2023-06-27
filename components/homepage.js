import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Modal,
  Pressable,
} from 'react-native';
// import { MaterialIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './styles/colors';
import globalstyles from './styles/style_global';
import {useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import Card from './card';
import AddLinkForm from './add_form';
import { useDispatch, useSelector } from 'react-redux';
import { addLinkAction } from '../redux/link_manager';
//figure out a way to get username
let darkModeG;
export default function Homepage(props) {
  const {username} = props;

  //dealing with dark mode
  const isDarkMode = useColorScheme() === 'dark';

  const [darkMode, setDarkMode] = useState(isDarkMode);

  useEffect(() => {
    setDarkMode(isDarkMode);
    darkModeG = darkMode;
  }, [isDarkMode]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //declaring the array of links (each in its own object)
  // const [links, setLinks] = useState([
  //   {
  //     name: 'Facebook',
  //     link: 'https://www.facebook.com',
  //     key: 1,
  //   },
  //   {
  //     name: 'Google',
  //     link: 'https://www.google.com',
  //     key: 2,
  //   },
  //   {
  //     name: 'Twitter',
  //     link: 'https://www.twitter.com',
  //     key: 3,
  //   },
  //   {
  //     name: 'Instagram',
  //     link: 'https://www.instagram.com',
  //     key: 4,
  //   },
  //   {
  //     name: 'ILKpop 💖',
  //     link: 'https://www.ilkpop.com',
  //     key: 5,
  //   },
  //   {
  //     name: 'Yahoo',
  //     link: 'https://www.yahoo.com',
  //     key: 6,
  //   },
  //   {
  //     name: 'Youtube',
  //     link: 'https://www.youtube.com',
  //     key: 7,
  //   },
  //   {
  //     name: 'Gmail',
  //     link: 'https://www.mail.google.com',
  //     key: 8,
  //   },
  // ]);

  const { links } = useSelector((state)=>state.links)
  const dispatch = useDispatch();

  const addLink = linkObj => {
    linkObj.key = linkObj.link;
    dispatch(addLinkAction(linkObj));
    setModalOpen(false);
  };


  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={globalstyles.header}>
          Welcome to {username}'s LinkSaver!
        </Text>
      </View>

      {/* <ScrollView > */}
      <View style={styles.listContainer}>
        <ScrollView>
          <Modal visible={modalOpen} style={styles.modal}>
            <View style={styles.closeBtn}>
              <Icon
                name="window-close"
                size={30}
                onPress={() => setModalOpen(false)}
                style={{color: darkModeG ? Colors.white : Colors.black}}
              />
            </View>

            <View>
              <AddLinkForm addLink={addLink} />
            </View>
          </Modal>

          <Pressable onPress={()=>setModalOpen(true)}>
            <View style={styles.addCard}>
              <Icon
                name="plus"
                size={24}
                style={styles.addBtn}
              />
            </View>
          </Pressable>

          {links.map(item => {
            return (
              <View key={item.key}>
                <TouchableOpacity
                  onPress={() => {
                    const link = item.link;
                    Linking.canOpenURL(link)
                      .then(supported => {
                        if (supported) {
                          return Linking.openURL(link);
                        } else {
                          ToastAndroid.show(
                            'cannot open url ',
                            ToastAndroid.SHORT,
                          );
                        }
                      })

                      .catch(error =>
                        ToastAndroid.show('eroorrrr', ToastAndroid.SHORT),
                      );
                  }}>
                  <Card name={item.name} link={item.link} />
                </TouchableOpacity>
                {/* <Text style={styles.text}>{item.name}</Text> */}
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
    backgroundColor: darkModeG ? Colors.darker : Colors.lighter,
  },
  headerView: {
    // flexBasis:"30%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 30,
  },
  listContainer: {
    // flexBasis:"70%",
    // paddingTop: 0,
    paddingHorizontal: 10,
    height: '70%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    color: darkModeG ? Colors.black : Colors.white,
    fontSize: 14,
    marginTop: 14,
    padding: 30,
    backgroundColor: darkModeG ? Colors.lighter : Colors.darker,
    borderRadius: 10,
    margin: 10,
  },
  addCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderStyle: 'dashed',
    padding: 20,
    borderWidth: 2,
    margin: 10,
    padding: 20,
  },
  addBtn: {
    color: darkModeG ? Colors.white : Colors.black,
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  modal: {
    // alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
    flexDirection: 'row',
  },
});
