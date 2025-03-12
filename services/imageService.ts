import { Image } from '@/models/Image';
import { KeySite, LungFeature } from '@/models/enums';
import * as Crypto from 'expo-crypto';

/**
 * Creates a custom Image object for an examination.
 * 
 * @param uri - The image URI (e.g., from the image picker)
 * @param keySite - The key site where the image was captured
 * @param label - The lung feature label associated with the image
 * @param date - (Optional) The date of the image capture. Defaults to the current date.
 * @returns An Image object matching the model.
 */
export const createCustomImage = (
    uri: string,
    keySite?: KeySite,
    label?: LungFeature,
    date?: Date
): Image => {
    return {
        imageId: Crypto.randomUUID(),
        date: date || new Date(),
        uri,
        keySite : keySite || undefined,
        label: label || undefined,
    };
};