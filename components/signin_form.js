import {Formik} from 'formik';
import {View, Button, StyleSheet, TextInput} from 'react-native';
import Btn from './login_btn';
export default function AuthForm({formAuthHandler, btnTitle}) {
  return (
    <View>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values, actions) => {
          formAuthHandler(values.email, values.password);
          actions.resetForm();
        }}>
        {formikprops => (
          <View>
            <TextInput
              style={styles.textinputs}
              placeholder="Email Address"
              placeholderTextColor="#555"
              onChangeText={formikprops.handleChange('email')}
              value={formikprops.values.email}
            />
            <TextInput
              style={styles.textinputs}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry={true}
              password={true}
              onChangeText={formikprops.handleChange('password')}
              value={formikprops.values.password}
            />
            <Btn title={btnTitle}
            onPress={formikprops.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    // flex: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    marginTop: 45,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  headerView: {
    margin: 10,
    flex: 0.35,
  },
  inputView: {
    marginTop: 10,
  },
  imageview: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  login_text: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  buttonView: {
    marginTop: 10,
  },
  textinputs: {
    borderColor: '#777',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    height: 45,
    borderRadius: 4,
    fontSize: 18,
  },
});
