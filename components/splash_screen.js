import {View, Text, StyleSheet, Image} from 'react-native';
import logo from './srcs/l_icon.png';
import AnimatedLoader from 'react-native-animated-loader';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.text}>Linktree Clone</Text>
      </View>

      

      <View style={styles.loaderView}>
        <AnimatedLoader
          source={require('./srcs/infinite-scroll-loader.json')}
          visible={true}
          overlayColor="rgba(150,150,150,0.25)"
          speed={1}
          loop={true}
          animationStyle={styles.loader}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderView: {
    flex: 1,
  },
  loader: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15

  },
  img: {
  },
});
