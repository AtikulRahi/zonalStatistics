var roi = ee.FeatureCollection("projects/ee-learning-rahi/assets/BGD_adm3");
var upzla = roi.filter(ee.Filter.eq("NAME_3", "Maulvibazar S."))
Map.centerObject(upzla,10)
Map.addLayer(upzla,{},"Maulvibazar S.")

var img = ee.ImageCollection("MODIS/061/MCD12Q1")
          .filterBounds(upzla)
          .filterDate('2021-01-01', '2021-12-31')
          .median()
          .select(["LC_Type1"]);
print(img)
var areaImage = ee.Image.pixelArea().addBands(img);
print(areaImage)
var lcArea = areaImage.reduceRegions({
                collection: upzla,
                reducer: ee.Reducer.sum().group({
                  groupField: 1, 
                  groupName: "Class"
                }),
                scale: 500
              });
print(lcArea);
Map.addLayer(img.clip(upzla));