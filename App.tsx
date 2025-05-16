import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TriagemType } from './src/types/TriagemType';

// Importação das telas
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import PatioCodeScreen from './src/screens/PatioCodeScreen';
import FazerTriagemScreen from './src/screens/FazerTriagemScreen';
import VerMotosScreen from './src/screens/VerMotosScreen';
import ListaTriagensScreen from './src/screens/ListaTriagensScreen';
import LocalizarMotoScreen from './src/screens/LocalizarMotoScreen';
import DetalheMotoScreen from './src/screens/DetalheMotoScreen';

const Stack = createStackNavigator();

export default function App() {
  const [triagens, setTriagens] = useState<TriagemType[]>([]);

  // Carregar triagens do AsyncStorage ao abrir o app
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('triagens');
        if (data) setTriagens(JSON.parse(data));
      } catch (e) {
        // erro ao carregar
      }
    })();
  }, []);

  // Salvar triagens no AsyncStorage sempre que mudarem
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('triagens', JSON.stringify(triagens));
      } catch (e) {
        // erro ao salvar
      }
    })();
  }, [triagens]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PatioCode" component={PatioCodeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="VerMotos">
          {props => <VerMotosScreen {...props} triagens={triagens} />}
        </Stack.Screen>
        <Stack.Screen name="CadastrarMoto">
          {props => <FazerTriagemScreen {...props} triagens={triagens} setTriagens={setTriagens} />}
        </Stack.Screen>
        <Stack.Screen name="ListaTriagens">
          {props => <ListaTriagensScreen {...props} triagens={triagens} setTriagens={setTriagens} />}
        </Stack.Screen>
        <Stack.Screen name="LocalizarMoto">
          {props => <LocalizarMotoScreen {...props} triagens={triagens} />}
        </Stack.Screen>
        <Stack.Screen name="DetalheMoto" component={DetalheMotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}