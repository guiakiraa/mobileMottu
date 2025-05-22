import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { StatusBar } from 'expo-status-bar';

const MenuScreen = ({ navigation }: any) => {
  return (
    <View style={styles.menuBackground}>
      <View style={styles.menuContainerCustom}>
        <TouchableOpacity
          style={styles.menuButtonLarge}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('VerMotos')}
        >
          <Text style={styles.menuButtonLargeText}>
            VER MOTOS DO PÁTIO
          </Text>
        </TouchableOpacity>
        <View style={styles.menuRowButtons}>
          <TouchableOpacity
            style={styles.menuButtonOutlined}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CadastrarMoto')}
          >
            <Text style={styles.menuButtonOutlinedText}>
              INICIAR{"\n"}TRIAGEM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButtonOutlined}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('LocalizarMoto')}
          >
            <Text style={styles.menuButtonOutlinedText}>
              LOCALIZAR{"\n"}MOTO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default MenuScreen; 