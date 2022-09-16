import { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from './styles';
import * as Clipboard from 'expo-clipboard'
import { THEME } from '../../theme';
import { Heading } from '../Heading';

interface Prosp extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Prosp) {
  const [isCopping, setIsCopping] = useState(false)

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Usuário copiado para sua área de transferência :D.')
    setIsCopping(false);
  }

  return (
    <Modal {...rest} 
      transparent 
      statusBarTranslucent
      animationType='fade'
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>
          <FontAwesome5 
            name='discord'
            color={THEME.COLORS.SUCCESS} 
            size={100}
          />
          <Heading 
            title="Let's play!" 
            subtitle='Agora é só começar a jogar!' 
            style={{alignItems: 'center', marginTop: 24}}
          />
          <Text style={styles.label}>
            Adicione no Discord
          </Text>
          <TouchableOpacity 
            style={styles.discordButton} 
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}