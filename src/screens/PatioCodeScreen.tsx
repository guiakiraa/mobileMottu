import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo2 from '../../assets/fundo2.png';
import { StatusBar } from 'expo-status-bar';
import { NavigationProps } from '../types/types';

function PatioCodeScreen(props: NavigationProps): React.ReactElement {
  const { navigation } = props;
  const [patioCode, setPatioCode] = useState('');
  
  return (
    <ImageBackground source={fundo2} style={styles.background}>
      <View style={styles.patioContainer}>
        <Text style={styles.patioTitle}>INSIRA O CÓDIGO DO PÁTIO</Text>
        <TextInput
          style={styles.patioCodeInputSingle}
          value={patioCode}
          onChangeText={v => setPatioCode(v.toUpperCase())}
          placeholder="XYZ-357"
          placeholderTextColor="#222"
          maxLength={7}
          autoCapitalize="characters"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.patioButton} onPress={() => navigation.replace('Menu')}>
          <Text style={styles.patioButtonText}>CONCLUIR</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default PatioCodeScreen; 