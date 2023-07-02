import { useSelector } from "react-redux";
import SplashScreen from "./splash_screen";
import Homepage from "./homepage";
import { View } from "react-native";

export default function WrapperComponent(){
    const isLoaded = useSelector(state => state.links.isLoaded);
    if(isLoaded){
        return(
            <Homepage />
        );
    }
    return(
        <SplashScreen />
    );

}