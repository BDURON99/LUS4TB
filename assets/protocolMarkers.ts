import { KeySite } from "@/models/enums";
import { LungSection } from "@/models/LungSection";
import { Markers } from "@/models/Markers";

// The top and left values are percentages of the image size
// The isDone property is used to indicate if the marker has been selected
export const AnteriorMarkers: Markers[] = [
    { keySite: KeySite.QAID, top: 58, left: 26, isDone: false },
    { keySite: KeySite.QAIG, top: 58, left: 57, isDone: false  },
    { keySite: KeySite.QASD, top: 34, left: 30, isDone: false  },
    { keySite: KeySite.QASG, top: 34, left: 55 , isDone: false },
    // + Add the 2 apical front markers
    { keySite: KeySite.APXD, top: 13, left: 33 , isDone: false },
    { keySite: KeySite.APXG, top: 13, left: 51 , isDone: false },
];

export const PosteriorMarkers: Markers[] = [
    { keySite: KeySite.QPID, top: 55, left: 28 , isDone: false },
    { keySite: KeySite.QPIG, top: 55, left: 55, isDone: false  },
    { keySite: KeySite.QPSD, top: 30, left: 28, isDone: false  },
    { keySite: KeySite.QPSG, top: 30, left: 55 , isDone: false },
];

export const LateralRightMarkers: Markers[] = [
    { keySite: KeySite.QSLD, top: 25, left: 35, isDone: false  },
    { keySite: KeySite.QLD, top: 60, left: 45 , isDone: false },
];

export const LateralLeftMarkers: Markers[] = [
    { keySite: KeySite.QSLG, top: 25, left: 45, isDone: false  },
    { keySite: KeySite.QLG, top: 60, left: 40 , isDone: false },
];

// The sections array contains the data for each lung section
// Each section contains a title, a lung image, and markers on the image
export const sections: LungSection[] = [
    {
        title: 'Front',
        lungOutlineImage: require('@/assets/images/torso-outline/torso-front-gray.png'),
        markers: AnteriorMarkers,
    },
    {
        title: 'Right',
        lungOutlineImage: require('@/assets/images/torso-outline/torso-right-gray.png'),
        markers: LateralRightMarkers,
    },
    {
        title: 'Back',
        lungOutlineImage: require('@/assets/images/torso-outline/torso-back-gray.png'),
        markers: PosteriorMarkers,
    },
    {
        title: 'Left',
        lungOutlineImage: require('@/assets/images/torso-outline/torso-left-gray.png'),
        markers: LateralLeftMarkers,
    },
];
