# LUS4TB Prototype
An AI-assited mHealth app for tuberculosis triage using lung ultrasounds.

This repository contains a prototype for the LUS4TB app—a React Native application built with Expo in the course of my master thesis. The app offers features to help healthcare workers in low- and middle-income countries (LMICs) assess the Tuberculosis (TB) risk of patients using the Butterfly Network point-of-care ultrasound.

## Overview

LUS4TB is designed to support healthcare workers by providing tools to mainly:

- **Enter Patient Information:** Quickly input and manage patient details.
- **Upload or Record Images:** Capture ultrasound images for specific anatomical key sites.
- **Retrieve Predicted TB Risk:** Automatically generate TB risk predictions based on ultrasound imaging.

The prototype demonstrates a user-friendly interface and integrates key features such as image upload (including bulk upload and per-site uploads), examination overviews with risk indicators, and settings to toggle guidance modes.

## Features

- **Patient Management:**  
  Enter and view patient details along with their examination history.

- **Examination Overview:**  
  Display examination cards that show patient information, the predicted TB risk, recommended actions, and a preview of associated ultrasound images.

- **Key Site Image Upload:**  
  Upload images for 14 anatomical key sites. Key sites are grouped (e.g., Front, Lateral, Back) and the app tracks progress across sites.

- **Bulk Upload Option:**  
  An option to upload multiple images at once using a dedicated bulk upload area.

- **Settings & Guidance:**  
  Toggle between guidance modes for additional help during the examination process.

## Installation

### Prerequisites

- **Node.js:** Download [here](https://nodejs.org/en).
- **Expo:** Install  with `npm i expo`

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/LUS4TB-prototype.git
   cd LUS4TB-prototype
   
2.	**Install Dependencies:**
     ```bash
     yarn install
     # or
     npm install

3.	**Start the Expo Development Server:**
       ```bash
       npx expo start
       
4. **Run the App:** 


   You can use the Expo Go app on your mobile phone or an emulator to run the application.
   Press _i_ to open an iOS simulator, _a_ for an Android and _w_ for the web.
   
### Directory Structure



### Acknowledgements
- Built with React Native and Expo.
- Icons provided by Ionicons.
- Special thanks to the Butterfly Network for inspiring point-of-care ultrasound innovations and to the global healthcare community for their continued work in LMICs!
