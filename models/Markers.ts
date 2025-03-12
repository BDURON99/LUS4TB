import { KeySite } from "./enums";

/**
 * Lung Markers to show which site to scan for the lung
 * 
 * @param id - The unique identifier of the marker.
 * @param keySite - The key site of the marker.
 * @param top - The top position of the marker.
 * @param left - The left position of the marker.
 * @param isDone - A boolean value indicating whether the site is done.
 */
export type Markers = {
    //id: number;
    keySite: KeySite;
    top: number;
    left: number;
    isDone?: boolean;
};
