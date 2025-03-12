import colors from '@/assets/colors';
import SettingOption from '@/components/SettingOption';
import { useSettings } from '@/context/settingsContext';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The SettingScreen component displays the user settings.
 * The user can toggle guidance mode and doctor mode.
 * @returns 
 */
const SettingScreen = () => {
  const navigation = useNavigation();
  const { settings, updateSettings } = useSettings();

  const toggleGuidanceMode = () => {
    updateSettings({ guidanceMode: !settings.guidanceMode });
  };

  const toggleDoctorMode = () => {
    updateSettings({ doctorMode: !settings.doctorMode });
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation])

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
      <View>
        <Text style={styles.headerTitle}>Settings</Text>
        <SettingOption
          label="Guidance Mode"
          description='Provides extra help during the recording step for a more guided experience'
          initialValue={settings.guidanceMode}
          onToggle={toggleGuidanceMode}
        />
        <SettingOption
          label="Doctor Mode"
          description="Switches to technical results, offering detailed analysis over action-oriented feedback"
          initialValue={settings.doctorMode}
          onToggle={toggleDoctorMode}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 0,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
});

export default SettingScreen;