import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultSettings, Settings } from '@/models/Settings';

// Storage key for settings
const STORAGE_KEY = 'appSettings';

/**
 * The SettingsContextType defines the shape of the settings context.
 * It contains the current settings and a function to update the settings.
 */
type SettingsContextType = {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
};

/**
 * The SettingsContext is the context for managing the app settings state.
 * It provides a function to update the settings.
 */
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * The SettingsProvider component provides the settings context to its children.
 * It manages the app settings state and provides a function to update the settings.
 * 
 * @param children - The children components to render. 
 * @returns 
 */
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings on mount
  useEffect(() => {
    (async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    })();
  }, []);

  const updateSettings = async (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * The useSettings hook returns the settings context.
 * 
 * @returns The settings context.
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};