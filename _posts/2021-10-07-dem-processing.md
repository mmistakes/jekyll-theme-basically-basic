---
layout: post
title:  "Processing DEM Data for Japan"
name:  "Daniel Hoshizaki"
image:
  path: /assets/images/dem/header.png
  thumbnail: /assets/images/dem/header.png
---

# Japan's Digital Elevation Model
The [Geospatial Information Authority of Japan](https://fgd.gsi.go.jp/download/menu.php) hosts one of my all time favorite datasets: digital elevation model (DEM) of Japan. This is such a cool dataset and there is a really nice visualization technique I've found that allows seamless visualization over the entire country of Japan.

The site has 10 meter DEM data for all of Japan and 5 meter data for key watersheds and flood areas around urban centers. My personal favorite is the 10 meter data for creating a nice looking background layer for my maps in QGIS. GSI serves the data in XML format, but with a little bit of processing these files can be converted into great looking hillshade rasters.The following image shows an example of what the converted data looks like over Aomori Prefecture, Japan.

<p align="center">
  <img src="/assets/images/dem/dem1.png" />
</p>

The data can be further processed and converted into tile map service. This format is great for visualizing very large datasets with graphical UIs and websites. Here's an example of what the tiles look like when visualized on QGIS.

<p align="center">
  <img src="/assets/images/dem/dem.gif" />
</p>

Pretty cool. 

The code for converting the [raw XML files](https://fgd.gsi.go.jp/download/mapGis.php?tab=dem) into an awesome tiled map is available from my GitHub repository: [DEM-Hillshade](https://github.com/danielhoshizaki/DEM-hillshade). 