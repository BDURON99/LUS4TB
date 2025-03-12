import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import colors from '@/assets/colors';
import Feather from '@expo/vector-icons/Feather';
import { useExamination } from '@/context/examinationContext';
import { newExam } from '@/services/examinationService';

/**
 * The Index component is the home screen of the app.
 * The user can start a new examination, view previous examinations, or delete all previous examinations.
 * The user can also navigate to the settings screen.
 * @returns 
 */
export default function Index() {
  const navigation = useNavigation();
  const { setExamination } = useExamination();

  const startNewAnalysis = () => {
    setExamination(newExam);
    console.log('New examination started');
  };

  const onNewExaminationPress = () => {
    startNewAnalysis();
    router.push('/NewExaminationScreen');
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/ultrai-logo.png')} style={styles.logo} resizeMode='contain' />
          <Button variant='link' size="lg" onPress={() => router.push('/SettingScreen')}>
            <ButtonText>Settings</ButtonText>
          </Button>
        </View>

        <View style={styles.footer}>
          <Button className="rounded-full" onPress={onNewExaminationPress}>
            <ButtonText>New Examination</ButtonText>
            <Feather name="plus" size={20} color="white" />
          </Button>
          <Button variant='outline' className="rounded-full info" onPress={() => router.push('/PreviousExaminations')}>
            <ButtonText>Previous Examinations</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 30,
    paddingLeft: 30,
  },
  logo: {
    width: 100,
    height: 50,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 30,
    gap: 20,
  },
});