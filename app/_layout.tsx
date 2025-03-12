import React from 'react';
import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ExaminationProvider } from '@/context/examinationContext';
import { SettingsProvider } from '@/context/settingsContext';
import colors from '@/assets/colors';
import { MarkersProvider } from '@/context/markersContext';


export default function RootLayout() {
  return (
    <SettingsProvider>
      <ExaminationProvider>
        <MarkersProvider>
          <GluestackUIProvider mode="light">
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.background, },
                headerShadowVisible: false,
                headerTintColor: "#2e9490",
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
                headerBackButtonDisplayMode: "minimal",
                headerBackTitleStyle: { fontSize: 16 },
              }}
            >
              <Stack.Screen name="index" />
            </Stack>
          </GluestackUIProvider>
        </MarkersProvider>
      </ExaminationProvider>
    </SettingsProvider>


  );
}

