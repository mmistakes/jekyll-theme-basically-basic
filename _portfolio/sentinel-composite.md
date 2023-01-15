---
layout: map
title: "Sentinel-2 Satellite Composite"
image:
  path: /assets/images/portfolio/kyushu.png
  thumbnail: /assets/images/portfolio/hokkaido.png
---

While working for [Axelspace](https://www.axelspace.com/) I contributed to a project that sparked my personal curiosity (and also hit a little bit of my OCD nerve). The company was working on generating a global cloud free dataset that it needed to calibrate one of it's products. After a good deal of research and development the company settle on an approach that allowed it to create a dataset using full precision, multispectral bands, and the most recent data. Although the results were useful for the product the company was developing, I wanted to craved something more visually appealing. I wanted to mix in a little bit of art and make the map "feel" awesome.

The journey to create an "awesome" looking satellite map took a very long time. I needed 2 years worth of remote sensing processing experience to be able to pull all the required concepts together to achieve the final result I was going for. In the end, I manged to come up with brute force solution to generate cloud free data from a very large stack of Setninel-2 satellite images. Read on to find out how I layered several concepts to achieve awesome looking results.

<p align="center">
  <img src="/assets/images/portfolio/hokkaido2.png" width="300"/>
  <img src="/assets/images/portfolio/tokyo.png" width="300"/>
  <img src="/assets/images/portfolio/aichi.png" width="300"/>
  Composite images of Hokkaido, Tokyo, and Aichi Prefecture
</p>

A common technique used to create cloud free images of satellite data is to use the 25th percentile value from a stack of pixels. This [article on generating a cloud free image of New Zealand](https://medium.com/sentinel-hub/how-to-create-cloudless-mosaics-37910a2b8fa8) describes how the process works in detail. This technique works great for satellites that have very little issue with geoaccuracy. Sentinel-2 satellites only have an error of around a single pixel in a North-South orientation, so the technique works very well. It's possible to generate nearly cloud free imagery using this very, very simple approach.

Although selecting the first quartile pixels from a stack Sentinel-2 tile works unreasonable well, I really wanted to push the process further. In areas with heavy cloud cover such as mountainous regions of the tropics, the technique would fail and cloud pixels would always find their way to the final image. This always bothered me enough that I wanted to create a sure-fire way of avoiding ALL cloud pixels in the output. The key to doing so, I found, was to use a very large stack of Sentinel-2 images and an effective cloud mask.

First things first, I needed cloud mask that were relatively accurate. It is possible to use the landcover classification data provided with Sentinel-2 imagery, but I wanted to go with cloud masks that were better than the provided masks. I've talked a bit about transformers in [this blog post](https://danielhoshizaki.com/2022/10/15/vision-transformers.html), but I found this architecture to be unreasonably good at predicting single class outputs like a cloud mask. To train the model, I used a set of Sentinel-2 images I labeled myself and hand selected a group of Sentinel-2 images where the landcover masks accurately predicted the cloud cover. Taking advantage of transfer learning, I was able to train a reasonable cloud detection model with about 100 training images.

Next, I needed a stack of Sentinel-2 images. I spent a lot of time experimenting with different sized stacks with different date ranges. I wanted to try to use the most recent data, but found that I could never find the right date range that would work for any location on the planet. What finally worked was simply feeding the process all Sentinel-2 images for selected months from the last 5 years. The stack was generally made up of 100 tiles (give or take a few depending on the Sentinel-2 cell).

Once I had my model and stack of images, I would generate a cloud mask for each Sentinel-2 image and select the 25th percentile pixel while excluding any pixel that was classified as a cloud. Excluding values from a percentile calculation turns out to be a very slow process in Numpy. I had to turn to [Kersten Fernerkundung's excellent algorithm](https://krstn.eu/np.nanpercentile()-there-has-to-be-a-faster-way/) that replaced Numpy's quadratic time complexity algorithm with one that has a linear run time. This algorithm was instrumental in allowing me to process the very large stack of Sentinel-2 images.

Taken together, the above steps resulted in a process that guaranteed cloud free images no matter what geographic location was chosen. To be clear, the process works because of the enormous amount of data used. There are usually anywhere from 5~10 cloud free images in the stack of 100 images needed for the above process; however, the result is ALWAYS consistent. Because I've used so much data, the results are a very consistent temporal average. Neighboring tiles look similar and there is no noticeable seam between cells. I totally acknowledge that the process is overkill, but you really cannot argue with the results. 

The images look AWESOME.

Check out an interactive, grayscale version of the map below. 

## Interactive Map