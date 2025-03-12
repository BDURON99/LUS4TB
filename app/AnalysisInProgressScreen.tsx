import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spinner } from "@/components/ui/spinner";
import colors from "@/assets/colors";
import { router, useNavigation } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { useExamination } from "@/context/examinationContext";
import { RecommendedActions, TBRiskThresholds } from '@/config/tbRiskConfig';
import { LungFeature } from "@/models/enums";

/**
 * The AnalysisInProgressScreen component displays a loading spinner while the TB risk analysis is in progress.
 * Once the analysis is done, the user is navigated to the ResultScreen.
 * This component is used to simulate the TB risk prediction process.
 * @returns 
 */
const AnalysisInProgressScreen: React.FC = () => {
    const navigation = useNavigation();
    const { updateExamination } = useExamination();

    const [analysisDone, setAnalysisDone] = useState(false);

    const predictTbRisk = async () => {
        // Simulate prediction of TB risk
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const randomPrediction = () => {
            return Math.floor(Math.random() * 100);
        };

        // Generate random predidtions
        const ultrAi = randomPrediction();
        const ultrAiSign = randomPrediction();
        const tbRisk = Math.max(ultrAi, ultrAiSign);

        const lungFeatureResults: { [key in LungFeature]: number } = {
            [LungFeature.DRY_LUNG]: randomPrediction(),
            [LungFeature.INTERSTITIAL_B_LINES]: randomPrediction(),
            [LungFeature.CONFLUENT_B_LINES]: randomPrediction(),
            [LungFeature.SUBPLEURAL_CONSOLIDATIONS]: randomPrediction(),
            [LungFeature.CONSOLIDATIONS]: randomPrediction(),
            [LungFeature.PLEURAL_EFFUSION]: randomPrediction(),
        };

        const recommendedAction =
            tbRisk > TBRiskThresholds.high
                ? RecommendedActions.high
                : tbRisk > TBRiskThresholds.medium
                    ? RecommendedActions.medium
                    : RecommendedActions.low;
        updateExamination({
            tbRisk: tbRisk,
            ultrAi: ultrAi,
            ultrAiSign: ultrAiSign,
            recommendedAction: recommendedAction,
            lungFeatureResults: lungFeatureResults
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: null });
    }, [navigation]);


    useEffect(() => {
        const runPrediction = async () => {
            await predictTbRisk();
            setAnalysisDone(true);
            setTimeout(() => {
                router.replace("/ResultScreen");
            }, 500);
        };
        runPrediction();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeContainer} edges={["left", "right", "bottom"]}>

            <View style={styles.content}>
                {analysisDone ? (
                    <Feather name="check-circle" size={60} color={colors.primary} />
                ) : (
                    <Spinner size="large" color={colors.desaturatedPrimary} />
                )}
                <Text style={[styles.statusText, { color: analysisDone ? colors.primary : colors.desaturatedPrimary }]}>
                    {analysisDone ? "Analysis Done!" : "Analysis in Progress..."}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        paddingTop: 0,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    statusText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
    },
});

export default AnalysisInProgressScreen;