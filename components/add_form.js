import {
  View,
  StyleSheet,
  Text,
  // Button,
  // TextInput,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import globalstyles from './styles/style_global';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextInput,Button} from 'react-native-paper';

const linkSchema = yup.object({
  name: yup.string().required(),
  link: yup.string().url().required()
});

export default function AddLinkForm({addLink}) {
  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        initialValues={{name: '', link: ''}}
        // validationSchema={linkSchema}
        onSubmit={(values, actions) => {
          if(values.name === '' || values.link === ''){
            ToastAndroid.show('Please fill in all fields', ToastAndroid.LONG);
            return;
          }
          addLink(values);
          actions.resetForm();
          ToastAndroid.show('submitted', ToastAndroid.LONG);
          console.log(values);
        }}>
        {formikprops => (
          <View>
            <TextInput
              mode="outlined"
              label="Name"
              value={formikprops.values.name}
              onChangeText={formikprops.handleChange('name')}
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              activeOutlineColor="grey"
            />
            <TextInput
              mode="outlined"
              label="Link"
              value={formikprops.values.link}
              onChangeText={formikprops.handleChange('link')}
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              activeOutlineColor="grey"
            />


            <Button
              mode='contained'
              buttonColor='black'
              textColor='white'
              onPress={formikprops.handleSubmit}
              style={{
                borderRadius:6,
              }}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: 'center',
    // flexDirection: "column",
    // alignItems: 'center',
    // flex: 1
  },
  form: {},
});
