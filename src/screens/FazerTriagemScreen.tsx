import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import fundo3 from '../../assets/fundo3.png';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { TriagemType } from '../types/TriagemType';

interface Props {
  navigation: any;
  triagens: TriagemType[];
  setTriagens: (t: TriagemType[]) => void;
}

const FazerTriagemScreen: React.FC<Props> = ({ navigation, triagens, setTriagens }) => {
  const [placa, setPlaca] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [setor, setSetor] = useState('patio_a');
  const [success, setSuccess] = useState(false);

  const cadastrarTriagem = () => {
    if (!placa || !diagnostico || !setor) return;
    const novaTriagem: TriagemType = {
      id: Date.now(),
      placa,
      diagnostico,
      setor,
    };
    setTriagens([...triagens, novaTriagem]);
    setPlaca('');
    setDiagnostico('');
    setSetor('patio_a');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <ImageBackground source={fundo3} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#fff', fontSize: 24 }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.menuComponentText}>Digite a placa da moto</Text>
      <TextInput
        value={placa}
        onChangeText={setPlaca}
        placeholder='Placa'
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <Text style={[styles.menuComponentText, { marginTop: 20 }]}>Escreva o diagnóstico</Text>
      <TextInput
        value={diagnostico}
        onChangeText={setDiagnostico}
        placeholder='Diagnóstico'
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <Text style={[styles.menuComponentText, { marginTop: 20 }]}>Selecione o setor que a placa deve ser colocada</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={setor}
          onValueChange={(itemValue: string) => setSetor(itemValue)}
          style={styles.picker}
          dropdownIconColor="#57E957"
        >
          <Picker.Item label="Pátio A" value="patio_a" color="#222" />
          <Picker.Item label="Pátio B" value="patio_b" color="#222" />
          <Picker.Item label="Manutenção" value="manutencao" color="#222" />
        </Picker>
      </View>
      {success && (
        <Text style={styles.success}>Triagem cadastrada com sucesso!</Text>
      )}
      <TouchableOpacity style={styles.menuBackButton} onPress={cadastrarTriagem}>
        <Text style={styles.menuBackButtonText}>Cadastrar Triagem</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

export default FazerTriagemScreen; 