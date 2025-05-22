import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import styles from '../styles/styles';
import fundo5 from '../../assets/fundo5.png';
import motoImage from '../../assets/moto.png';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { DetalheMotoProps, Triagem } from '../types/types';

function DetalheMotoScreen(props: DetalheMotoProps): React.ReactElement {
  const { route, navigation } = props;
  const { triagem } = route.params;

  return (
    <ImageBackground source={fundo5} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {triagem ? (
        <View style={styles.detalheMotoCard}>
          <Text style={styles.detalheMotoSetorText}>A MOTO SE ENCONTRA NO SETOR:</Text>
          <Text style={styles.detalheMotoSetorValue}>{triagem.setor === 'patio_a' ? 'PÁTIO A' : triagem.setor === 'patio_b' ? 'PÁTIO B' : 'MANUTENÇÃO'}</Text>

          <View style={styles.detalheMotoInfoContainer}>
            <Text style={styles.detalheMotoPlaca}>{triagem.placa}</Text>
            <Text style={styles.detalheMotoModelo}>MOTTU-E</Text>
            <Image source={motoImage} style={styles.detalheMotoImage} resizeMode="contain" />

            <TouchableOpacity style={styles.detalheMotoButton} onPress={() => { /* Lógica para Ativar Buzina */ }}>
              <FontAwesome name="volume-up" size={24} color="#fff" />
              <Text style={styles.detalheMotoButtonText}>ATIVAR BUZINA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.detalheMotoButton} onPress={() => { /* Lógica para Ativar Pisca-Alerta */ }}>
              <Feather name="zap" size={24} color="#fff" />
              <Text style={styles.detalheMotoButtonText}>ATIVAR PISCA-ALERTA</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>Moto não encontrada.</Text>
      )}
    </ImageBackground>
  );
}

export default DetalheMotoScreen; 