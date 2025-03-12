
/**
 * TB Risk thresholds (in percentages).
 */
export const TBRiskThresholds = {
    high: 75,
    medium: 40,
    // low is derived as anything below 'medium'
};

/**
 * Recommended actions for each TB risk category.
 */
export const RecommendedActions = {
    high: "Start treatment.",
    medium: "Conduct futher analysis.",
    low: "Nothing to do at this stage.",
};

/**
 * Generates a summary string for an examination.
 *
 * @param riskPercentage - The TB risk percentage.
 * @param recommendedAction - The recommended action for the risk category.
 * @returns A formatted summary string.
 */
export const generateSummary = (
    riskPercentage: number,
    recommendedAction: string
): string => {
    // Determine risk label based on thresholds.
    let riskLabel: string;
    if (riskPercentage >= TBRiskThresholds.high) {
        riskLabel = "High";
    } else if (riskPercentage >= TBRiskThresholds.medium) {
        riskLabel = "Medium";
    } else {
        riskLabel = "Low";
    }
    return `Lung ultrasound analysis completed. AI-based interpretation suggests a ${riskLabel.toLowerCase()} TB risk (${riskPercentage.toFixed(
        1
    )}%). Recommended action: ${recommendedAction}`;
};