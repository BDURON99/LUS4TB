import ModalHeader from '@/components/BottomSheetHeader';
import Protocol from '@/components/protocol/Protocol';
import ScanGuide from '@/components/protocol/ScanGuide';
import { Button, ButtonText } from '@/components/ui/button';
import { useExamination } from '@/context/examinationContext';
import { useMarkers } from '@/context/markersContext';
import { KeySite } from '@/models/enums';
import { router } from 'expo-router';
import React from 'react';
import { Modal, View, StyleSheet, ScrollView } from 'react-native';

type ProtocolBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSelectSite: () => void;
};

/**
 * The ProtocolBottomSheet component displays the protocol for scanning the lungs in the form of bottom sheet.
 * The user can select a site to inspect and capture images.
 * @param visible The visibility of the bottom sheet
 * @param onClose The function to close the bottom sheet
 * @param onSelectSite The function to call when a site is selected and to start scanning
 * @returns 
 */
const ProtocolBottomSheet: React.FC<ProtocolBottomSheetProps> = ({
  visible,
  onClose,
  onSelectSite,
}) => {
  const { selectedSite } = useExamination();
  const { checkAllCaptured } = useMarkers();

  const isDone = checkAllCaptured();

  const onAnalysePress = () => {
    onClose();
    router.push('/AnalysisInProgressScreen');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.bottomSheet}>
          <ModalHeader
            title="Select a site to inspect"
            subtitle="Capture at least one image per site"
            onClose={onClose}
          />
          <ScrollView contentContainerStyle={styles.protocolContainer}>
            <Protocol />
            {selectedSite ?
              <>
                <View style={styles.separator} />
                <ScanGuide
                  onOk={onSelectSite}
                />
              </>
              :
              <Button className='rounded-full' variant={isDone ? "solid" : "outline"} onPress={onAnalysePress} style={styles.analyseButton}>
                <ButtonText>Analyse</ButtonText>
              </Button>
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Positions the sheet at the bottom
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
    paddingHorizontal: 16,
    width: '100%',
    maxHeight: '90%',
  },
  protocolContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  analyseButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
});

export default ProtocolBottomSheet;