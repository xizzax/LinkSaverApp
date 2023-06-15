import { Button, Pressable, StyleSheet, Text, ToastAndroid } from "react-native";

//making a lil button
export default function Btn(props){
    const title = props.title;
    const onPressFtn = props.onPress;
    return (
        <Pressable style={styles.btn} onPress={()=>{
            ToastAndroid.show("successful", ToastAndroid.SHORT)
            onPressFtn();
        }}>
            <Text style={styles.btn_text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius: 4,
        elevation:3,
        backgroundColor: 'black',
        margin: 5
    },
    btn_text:{
        fontSize:16,
        lineHeight:21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    }
});