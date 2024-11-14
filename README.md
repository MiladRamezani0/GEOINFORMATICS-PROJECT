# GEOINFORMATICS-PROJECT

This repository contains code and resources for analyzing burned areas and burn severity using Sentinel-1 SAR data. The project is designed to run fully automatically within Google Earth Engine (GEE), where users can simply draw a region of interest to detect fire-affected areas across Europe.

Overview
The project focuses on using Sentinel-1 Synthetic Aperture Radar (SAR) data to monitor wildfires, specifically targeting the analysis of SAR backscatter signals to detect burn severity and land cover changes. The tool developed in this project offers a seamless and automated approach to assess fire impacts, making it useful for environmental monitoring and fire management efforts.

Objectives
Analyze SAR backscatter data over burned areas in the Mediterranean basin.
Examine the variation of SAR backscatter based on land cover, burn severity, topography, and time since the fire.
Integrate additional data for enhanced analysis.
Derive burn severity indices from SAR data.
Validate the findings by comparing SAR-derived indices with other available data sources.
Generate time-series graphs and export SAR backscatter values for further analysis.
Technologies Used
Google Earth Engine (GEE) for automated data processing and analysis.
Sentinel-1 SAR data for analyzing the burned areas and burn severity.
JavaScript for writing the scripts used in GEE.
Data export in .csv format for further statistical analysis.
Installation
Clone this repository to your local machine.
Open the GEE code editor.
Import the relevant scripts and datasets from this repository.
Use the GEE interface to draw regions of interest (ROI) and start the analysis.
How to Use
Open Google Earth Engine (GEE).
Load the code script for fire monitoring.
Draw the region of interest (ROI) on the map.
Run the analysis and view the results, including SAR backscatter trends, burn severity indices, and related visualizations.
Results
The code will output visualizations showing changes in SAR backscatter over time and provide a .csv file with the SAR backscatter values for each date.
Burn severity indices will be calculated and compared with existing fire data sources for validation.
Contributing
Feel free to fork the repository, contribute with issues, and make pull requests. Contributions to improve analysis algorithms, add new functionality, or enhance the usability of the tool are always welcome.

Acknowledgements
This work was supported by various datasets from Sentinel-1 and Google Earth Engine. Special thanks to the authors and researchers in the field of remote sensing and wildfire monitoring for their valuable contributions.
