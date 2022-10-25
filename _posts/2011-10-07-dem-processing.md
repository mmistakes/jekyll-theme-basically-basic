---
layout: post
title:  "Processing DEM Data for Japan"
name:  "Daniel Hoshizaki"
image: /assets/images/dem/dem2.png
---

# Japan's Digital Elevation Model
The [Geospatial Information Authority of Japan](https://fgd.gsi.go.jp/download/menu.php) hosts one of my all time favorite datasets: digital elevation model (DEM) of Japan. This is such a cool dataset and there is a really nice visualization technique I've found that allows seamless visualization over the entire country of Japan.

<p align="center">
  <img src="/assets/images/dem/dem1.png" />
</p>

Here's an example of what the tiles look like when visualized on QGIS.

<p align="center">
  <img src="/assets/images/dem/dem.gif" />
</p>

The great thing about tiles is that they can be served over the web and even hosted on an AWS S3 bucket.

The code for converting the [raw XML files](https://fgd.gsi.go.jp/download/mapGis.php?tab=dem) is available from my [GitHub repository](https://github.com/danielhoshizaki/DEM-hillshade). 