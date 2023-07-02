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
import {useDispatch, useSelector} from 'react-redux';
import {addLinkAction} from '../redux/link_manager';
import {getLinksFromFireStore} from '../redux/link_manager';
let darkModeG;

export default function Homepage(props) {

  const isDarkMode = useColorScheme() === 'dark';

  const [darkMode, setDarkMode] = useState(isDarkMode);

  const links = useSelector(state => state.links.links);
  const isLoaded = useSelector(state => state.links.isLoaded);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getLinksFromFireStore());
  },[dispatch, links]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // function to add link to state
  const addLink = linkObj => {
    linkObj.key = linkObj.link;
    dispatch(addLinkAction(linkObj));
    setModalOpen(false);
  };

  // controlling the visibility of modal using state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={globalstyles.header}>
          Welcome to LinkSaver!
        </Text>
      </View>

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

          <Pressable onPress={() => setModalOpen(true)}>
            <View style={styles.addCard}>
              <Icon name="plus" size={24} style={styles.addBtn} />
            </View>
          </Pressable>

          {isLoaded == true &&
            links.map(item => {
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
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#eee',
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 30,
  },
  listContainer: {
    paddingHorizontal: 10,
    height: '70%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginTop: 14,
    padding: 30,
    backgroundColor: '#777',
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
    color: 'black',
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  modal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
