import { router } from "expo-router";
import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "../ui/alert-dialog";
import { ButtonText } from "../ui/button";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

type AnalysisAlertDialogProps = {
    showAlertDialog: boolean;
    setShowAlertDialog: (value: boolean) => void;
    onConfirm: () => void;
};

/**
 * The AnalysisAlertDialog component displays an alert dialog when the user tries to analyse fewer than 14 images.
 * The user can press the Cancel button to close the dialog or the Analyse button to confirm the analysis.
 * @param showAlertDialog - A boolean value that determines whether the alert dialog is visible.
 * @param setShowAlertDialog - A function that sets the visibility of the alert dialog.
 * @param onConfirm - A callback function that is called when the user confirms the analysis.
 * @returns 
 */
const AnalysisAlertDialog: React.FC<AnalysisAlertDialogProps> = ({ showAlertDialog, setShowAlertDialog, onConfirm }) => {


    return (
        <AlertDialog
            isOpen={showAlertDialog}
            onClose={() => setShowAlertDialog(false)}
            size="md"
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="xl" className="text-typography-950 font-semibold">
                        Not enough images
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                    <Text size="lg">
                        You have uploaded fewer than 14 images. Would you like to skip the minimum requirement and analyse anyway?
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant="outline" action="secondary" className="rounded-full" size="md" onPress={() => setShowAlertDialog(false)} >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button  className="rounded-full" size="md" onPress={onConfirm}>
                        <ButtonText>Analyse</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export default AnalysisAlertDialog;
