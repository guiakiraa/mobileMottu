import React from 'react';
import { View, Text } from 'react-native';
import { TriagemType } from '../types/TriagemType';

interface FichaMotoProps {
  triagem: TriagemType | null;
}

const FichaMoto: React.FC<FichaMotoProps> = ({ triagem }) => {
  if (!triagem) return null;
  return (
    <View style={{ backgroundColor: '#222', borderRadius: 8, padding: 12, marginTop: 20, borderColor: '#57E957', borderWidth: 1 }}>
      <Text style={{ color: '#57E957', fontWeight: 'bold' }}>Placa: <Text style={{ color: '#fff' }}>{triagem.placa}</Text></Text>
    </View>
  );
};

export default FichaMoto; 