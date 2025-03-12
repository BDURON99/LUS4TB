/**
 * The Settings interface defines the shape of the settings state.
 * 
 * @property guidanceMode - A boolean indicating whether guidance mode is enabled.
 * @property doctorMode - A boolean indicating whether doctor mode is enabled.
 */
export interface Settings {
    guidanceMode: boolean;
    doctorMode: boolean;
}

// Default settings
export const defaultSettings: Settings = {
    guidanceMode: false,
    doctorMode: false,
};