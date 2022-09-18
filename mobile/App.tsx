import { useRef, useEffect } from 'react';
import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold ,Inter_900Black} from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core';
import * as Notification from 'expo-notifications';


export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });
  
  useEffect(()=>{
    getNotificationListener.current = Notification.addNotificationReceivedListener(notification => {
      console.log(notification)
    });


    responseNotificationListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current){
        Notification.removeNotificationSubscription(getNotificationListener.current);
        Notification.removeNotificationSubscription(responseNotificationListener.current);
      }
    } 
  }, []);


  const [fontsLoad] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold ,Inter_900Black 
  });
  return (
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
    {fontsLoad ? <Routes /> : <Loading />}
  
    </Background>
  );
}