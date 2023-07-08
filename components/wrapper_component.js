import { useSelector } from "react-redux";
import SplashScreen from "./splash_screen";
import Homepage from "./homepage";
import { View } from "react-native";
import SignUp from "./signup";
import Login from "./login";

export default function WrapperComponent(){
    const isLoaded = useSelector(state => state.links.isLoaded);
    const user = useSelector(state => state.links.user);
    if(isLoaded === true && user != null){
        return(
            <Homepage />
        );
    }
    else if (user === null){
        return(
            <Login />
        );
    }

}