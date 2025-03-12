import ScanFooter from '@/components/scan/ScanFooter';
import ScanHeader from '@/components/scan/ScanHeader';
import UltrasoundView from '@/components/scan/UltrasoundView';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Alert, Image as RNImage } from 'react-native';
import ProtocolBottomSheet from './ProtocolBottomSheet';
import { useFocusEffect, useNavigation } from 'expo-router';
import colors from '@/assets/colors';
import { useToast } from '@/components/ui/toast';
import ToastStartScan from '@/components/toast/ToastStartScan';
import ToastMockCapture from '@/components/toast/ToastMockCapture';
import { useExamination } from '@/context/examinationContext';
import { KeySite } from '@/models/enums';
import { createCustomImage } from '@/services/imageService';
import { useSettings } from '@/context/settingsContext';
import { useMarkers } from '@/context/markersContext';

/**
 * The ScanScreen component is a mock implementation of the live scanning that could be done with the Butterfly Network SDK.
 * The user can view the protocol for scanning the lungs and capture (mock) images of the lungs.
 * @returns 
 */
const ScanScreen: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { examination, updateExamination, selectedSite } = useExamination();
  const { settings } = useSettings();
  const { markers, markCaptured } = useMarkers();

  const [protocolVisible, setProtocolVisible] = useState(false);
  const [captureToastId, setCaptureToastId] = useState<string | null>(null);
  const [startScanToastId, setStartScanToastId] = useState<string | null>(null);

  const onOpenProtocol = () => {
    setProtocolVisible(true);
  };

  const onCloseProtocol = () => {
    setProtocolVisible(false);
  };

  const closeToast = (id: string) => {
    toast.close(id);

    // If the closed toast is the capture toast, clear it.
    if (captureToastId === id) {
      setCaptureToastId(null);
    }
  };

  const showStartScanToast = () => {
    if (startScanToastId) return; // Prevent duplicate toasts

    if (settings?.guidanceMode) {
      // If guidance mode is enabled, show a toast to explain how to start scanning.
      const toastId = toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return <ToastStartScan uniqueToastId={id} onClose={closeToast} />;
        },
      });
      setStartScanToastId(toastId);
    }
  };

  const handleSiteSelect = () => {
    setProtocolVisible(false);
  };

  const handleCapturePress = () => {
    if (selectedSite === null) {
      Alert.alert("No Site Selected", "Please select a site first.");
      return;
    }

    // Get the URI for the mock ultrasound image.
    const asset = require('@/assets/images/mockUltrasound.png');
    const assetUri = RNImage.resolveAssetSource(asset).uri;

    // Create a custom image using the current selected site.
    const customImage = createCustomImage(assetUri, selectedSite);
    updateExamination({ images: [...(examination?.images || []), customImage] });

    // Show a toast for the captured image.
    if (captureToastId) {
      // If a capture toast is already active, close it.
      toast.close(captureToastId);
      setCaptureToastId(null);
      setTimeout(() => {
        const newToastId = toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            const newId = id.toString();
            return (<ToastMockCapture uniqueToastId={newId} />);
          },
        });
        setCaptureToastId(newToastId);
      }, 300);
    } else {
      // Show a new capture toast.
      const newToastId = toast.show({
        placement: "bottom",
        duration: 2000,
        render: ({ id }) => {
          return (
            <ToastMockCapture uniqueToastId={id.toString()} />
          );
        },
      });
      setCaptureToastId(newToastId);
    }

    // mark the site as done
    markCaptured(selectedSite);
    console.log("Site captured:", selectedSite);
    console.log("Markers updated:", markers);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (startScanToastId) {
          toast.close(startScanToastId);
          setStartScanToastId(null);
        }
        if (captureToastId) {
          toast.close(captureToastId);
          setCaptureToastId(null);
        }
      };
    }, [startScanToastId, captureToastId])
  );

  useEffect(() => {
    showStartScanToast();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScanHeader />
        <UltrasoundView />
        <ScanFooter onProtocolPress={onOpenProtocol} onCapturePress={handleCapturePress} />
        <ProtocolBottomSheet visible={protocolVisible} onClose={onCloseProtocol} onSelectSite={handleSiteSelect} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.butterflyBackgroundColor,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContainer: {
    marginBottom: 100,
    maxWidth: "100%",
    alignSelf: 'center'
  },
  icon: {
    color: 'black',
  },
  toastDescription: {
    flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.85,
  },

});

export default ScanScreen;