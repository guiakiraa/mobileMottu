import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Interfaces principais
export interface Triagem {
  id: number;
  placa: string;
  diagnostico: string;
  setor: 'patio_a' | 'patio_b' | 'manutencao';
}

// Props de navegação
export interface NavigationProps extends ParamListBase {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

// Props dos componentes
export interface ListaTriagensProps extends NavigationProps {
  route: RouteProp<RootStackParamList, 'ListaTriagens'>;
  triagens: Triagem[];
  setTriagens: (t: Triagem[]) => void;
}

export interface DetalheMotoProps extends NavigationProps {
  route: RouteProp<RootStackParamList, 'DetalheMoto'>;
}

export interface LocalizarMotoProps extends NavigationProps {
  triagens: Triagem[];
}

export interface VerMotosProps extends NavigationProps {
  triagens: Triagem[];
}

export interface FazerTriagemProps extends NavigationProps {
  triagens: Triagem[];
  setTriagens: (t: Triagem[]) => void;
}

// Tipos de navegação
export interface RootStackParamList {
  [key: string]: any;
  Login: undefined;
  PatioCode: undefined;
  Menu: undefined;
  VerMotos: undefined;
  CadastrarMoto: undefined;
  ListaTriagens: {
    setor: string;
  };
  LocalizarMoto: undefined;
  DetalheMoto: {
    triagem: Triagem | null;
  };
} 