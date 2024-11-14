// Center the map on the ROI
Map.centerObject(roi);

// Define the time periods
var period1_start = '2022-08-22';
var period1_end = '2022-09-22';
var period2_start = '2022-09-22';
var period2_end = '2022-10-22';

// Load Sentinel-1 ImageCollection
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
   .filterBounds(roi)
   .filter(ee.Filter.eq('instrumentMode', 'IW'))
   .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
   .select('VV')
  .map(function(image){
    return image.clip(roi); // Clip each image to the ROI
  });

// Filter the collections for the two periods
var collection1 = sentinel1.filterDate(period1_start, period1_end);
var collection2 = sentinel1.filterDate(period2_start, period2_end);

// Compute the median for both periods
var median1 = collection1.median();
var median2 = collection2.median();

// Calculate the difference in backscatter between the two periods
var diff = median2.subtract(median1).rename('backscatter_diff');
var diff = diff.multiply(200);

// Apply a threshold to identify significant changes (potentially fire-affected areas)
var threshold = 5; // Example threshold value, adjust based on analysis
var fire_areas = diff.gt(threshold);

// Apply a median filter to remove salt-and-pepper noise
var filtered_fire_areas = fire_areas.focal_median(3, 'square', 'pixels');

// Convert the filtered_fire_areas to integer type
var fire_areas_int = filtered_fire_areas.multiply(1).toInt();

// Convert the raster to vectors
var fire_vectors = fire_areas_int.selfMask().reduceToVectors({
  geometry: roi,
  geometryType: 'polygon',
  scale: 10,
  maxPixels: 1e8
});

// Calculate the area of each polygon with a non-zero error margin
var fire_areas_with_area = fire_vectors.map(function(feature) {
  return feature.set({area: feature.geometry().area(1)});
});

// Find the largest polygon
var largest_fire_area = fire_areas_with_area.sort('area', false).first();

// Convert the largest polygon to a FeatureCollection
var largest_fire_area_fc = ee.FeatureCollection([largest_fire_area]);

// Display the largest fire-affected area
Map.addLayer(largest_fire_area_fc, {color: 'red'}, 'Largest Fire-Affected Area');

// Add a legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
legend.add(ui.Label('Largest Fire-Affected Area', {fontWeight: 'bold', fontSize: '16px'}));
legend.add(ui.Label('Red area indicates significant change'));

Map.add(legend);

// Print the results to the console
print('Median backscatter for Mar-Apr 2024', median1);
print('Median backscatter for Apr-May 2024', median2);
print('Difference in backscatter', diff);
print('Largest fire-affected area', largest_fire_area);

// Define the date of interest
var date_of_interest = '2022-09-20';

// Load the Sentinel-2 ImageCollection
var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                 .filterBounds(roi)
                 .filterDate(date_of_interest, ee.Date(date_of_interest).advance(1, 'day'))
                 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 90)) // Adjust cloud cover threshold if needed
  .map(function(image){
    return image.clip(roi); // Clip each image to the ROI
  });

// Select the first image from the collection (if multiple images exist)
var imageer = sentinel2.first();

// Visualize the image
// Map.addLayer(imageer, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sentinel-2 True Color');
Map.addLayer(imageer, {bands: ['B12', 'B11', 'B4'], min: 0, max: 3000}, 'Sentinel-2 False Color (NIR)');

// Print image details to the console
print('Sentinel-2 image:', imageer);

// Display the largest fire-affected area
Map.addLayer(largest_fire_area_fc, {color: 'red'}, 'Largest Fire-Affected Area');

