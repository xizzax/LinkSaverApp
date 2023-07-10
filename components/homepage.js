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
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './styles/colors';
import globalstyles from './styles/style_global';
import {useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import Card from './card';
import AddLinkForm from './add_form';
import {useDispatch, useSelector} from 'react-redux';
import {addLinkAction, setUser} from '../redux/link_manager';
import {getLinksFromFireStore} from '../redux/link_manager';
import Btn from './login_btn';
import {getAuth, signOut} from 'firebase/auth';
let darkModeG;
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

export default function Homepage(props) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const isDarkMode = useColorScheme() === 'dark';
  const auth = getAuth();
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(isDarkMode);

  const links = useSelector(state => state.links.links);
  const isLoaded = useSelector(state => state.links.isLoaded);
  const user = useSelector(state => state.links.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinksFromFireStore());
  }, [dispatch]);
  //links
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
        <Text style={globalstyles.header}>Welcome to LinkSaver!</Text>
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

        {/* <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#000',
              elevation: 2, // Android
              height: 40,
              width: width - 50,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
                signOut(auth).then(
                  ToastAndroid.show('Logged out', ToastAndroid.SHORT),
                  dispatch(setUser(null)),
                );
                navigation.navigate('Login');
            }}>
            <Text style={{color: 'white'}}> Logout </Text>
          </TouchableOpacity> */}
        {/* </View> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Button
            mode="contained"
            buttonColor="black"
            textColor="white"
            onPress={() => {
              signOut(auth).then(
                ToastAndroid.show('Logged out', ToastAndroid.SHORT),
                dispatch(setUser(null)),
              );
              navigation.navigate('Login');
            }}
            style={{
              borderRadius: 6,
              width: width - 50,
            }}>
            Logout
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: '#eee',
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
