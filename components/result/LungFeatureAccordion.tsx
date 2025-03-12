import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionIcon,
    AccordionContent,
    AccordionContentText,
} from '@/components/ui/accordion';
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon"
import { Text } from 'react-native';
import { LungFeature } from '@/models/enums';

type LungFeatureResults = {
    [key in LungFeature]: number;
};

type LungFeatureAccordionProps = {
    lungFeatureResults: LungFeatureResults;
};

/**
 * The LungFeatureAccordion component displays the results of lung feature analysis.
 * The results are displayed in an accordion with the title "Lung Feature Details".
 * Each lung feature is displayed with its corresponding percentage.
 * @param lungFeatureResults - An object containing the results of lung feature analysis. The keys are the lung features and the values are the corresponding percentages.
 * @returns 
 */
const LungFeatureAccordion: React.FC<LungFeatureAccordionProps> = ({ lungFeatureResults }) => {
    return (
        <Accordion variant='unfilled' style={{ margin: 0 }}>
            <AccordionItem value={'Lung Feature Details'}>
                <AccordionHeader>
                    <AccordionTrigger>
                        {({ isExpanded }) => {
                            return (
                                <>
                                    <Text style={styles.titleText}>
                                        Lung Feature Details
                                    </Text>
                                    {isExpanded ? (
                                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                                    ) : (
                                        <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                                    )}
                                </>
                            )
                        }}
                    </AccordionTrigger>

                </AccordionHeader>
                <AccordionContent>
                    {Object.entries(lungFeatureResults).map(([feature, percentage]) => (
                        <AccordionContentText key={feature} style={styles.featureText}>
                            {feature}: {percentage}%
                        </AccordionContentText>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

const styles = StyleSheet.create({
    featureText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    titleText: {
        fontSize: 14,
        color: '#444', 
    },
});

export default LungFeatureAccordion;