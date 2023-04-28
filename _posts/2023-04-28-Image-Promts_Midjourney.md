---
title: "Image Protms for Midjourney" 
categories: 
    - Data_Science
    - Promt Engineering
    - Artificial Intelligence
tags: 
    - artificial intelligence
    - data science
    - promts
    - midjourney
    - art
    - imaging
last_modified_at: 2023-04-28T23:00:00-01:00
image: /assets/images/posts/promts_midjourney/ecantu_Create_a_composite_landscape_photograph_for_the_header_o_35851b07-126a-45da-aa1d-25e61c565656_top.png
---

# Image Promts for Midjourney

### This a work in progress and will continously update. 

## Background

The importance of having the correct prompt to recreate an image in Midjourney is the base to achieve the expected results. A bad promt leads to find either not the target or nice surprises.  Even when the main goal is to create an artistic image of our imagination, it is necessary to have a structure to meet our needs with the minimum use of resources. 

With this purpose in mind, we can use a GPT solution to simplify our work. I am presenting a promt structure. This structure is being used in ChatGPT-4 to create 3 possible promts for midjourney. 

```
I) Your role
Take the role of a Prompt Engineer with bast experience in Midjourney. 

II) The Request Context:
You will use the following structure to create prompts:
Content, Medium, Style, Lighting, Color Palette, Composition.


Unless the other variables are specified in the structure, generate its values based in: based in the following definitions.
Medium: insert artistic medium here
Style: insert an Artist or Genre. 
Lighting: insert a lighting type utilized in photography or painting.
Color Palette: insert the color pallet to use, verify that matches the style type.
Composition: insert cameras models, specific lenses, photography or image types, positional elements.


Include the following text at the end of each promt:
--no Human, People, Person, Letters, Numbers, Text, Signature, Watermark, Logo, Stamp, Branding, Trademark, Copyright, Registered Trademark.


III) Your work:
I will provide your with content ideas. 
With this ideas you will help to write prompts to create images and art. 
Write in natural language, utilize specific, precise, and articulated language. 
```

### EDA King County Washington

For the EDA post, I added a new head image to the webpage. To create this image I ue the following promt. 

`An aerial recreation of King County Seattle Washington housing. Consider key sightseeing in Seattle. To be use in a realtor marketing campaign. The target market is high income.
Medium: photo realistic image
Style: 4K photograph 
Lighting: emphasize depth and contrast
Color Palette: early golden hour
At  the end of the prompt add  --aspect 7:4 `

ChatGPT-4 provided the following promts:

` Design a captivating aerial image of King County Seattle Washington housing, incorporating significant Seattle landmarks, intended for a realtor marketing campaign, in a photo-realistic 4K photograph with lighting that accentuates depth and contrast, and showcasing a rich midnight blue color palette. --no Human, People, Person, Letters, Numbers, Text, Signature, Watermark, Logo, Stamp, Branding, Trademark, Copyright, Registered Trademark. --aspect 7:4

An aerial recreation of King County Seattle Washington housing. Consider key sightseeing in Seattle. To be use in a realtor marketing campaign. The target market is high income.
Medium: photo realistic image
Style: 4K photograph 
Lighting: emphasize depth and contrast
Color Palette: early golden hour
At  the end of the prompt add  --aspect 7:4

Compose an impressive aerial representation of King County Seattle Washington housing, highlighting key attractions in Seattle, suitable for a realtor marketing campaign targeting high-income clients, as a photorealistic 4K photograph with evocative lighting that highlights depth and contrast, and featuring an early golden hour color palette. --no Human, People, Person, Letters, Numbers, Text, Signature, Watermark, Logo, Stamp, Branding, Trademark, Copyright, Registered Trademark. --aspect 7:4 `

The provided promt to Midjournye was:\
`Compose an impressive aerial representation of King County Seattle Washington housing, highlighting key attractions in Seattle, suitable for a realtor marketing campaign targeting high-income clients, as a photorealistic 4K photograph with evocative lighting that highlights depth and contrast, and featuring an early golden hour color palette. --no Human, People, Person, Letters, Numbers, Text, Signature, Watermark, Logo, Stamp, Branding, Trademark, Copyright, Registered Trademark. --aspect 7:4 --s 750 --v 5 --q 2 `

And the results are: 
![image](/assets/images/posts/promts_midjourney/ecantu_Compose_an_impressive_aerial_representation_of_King_Coun_2880dd47-91d0-4b21-8ac5-0e98f1145cb3.webp "Compose an impressive aerial representation of King County Seattle Washington housing, highlighting key attractions in Seattle, suitable for a realtor marketing campaign targeting high-income clients, as a photorealistic 4K photograph with evocative lighting that highlights depth and contrast, and featuring an early golden hour color palette. --no Human, People, Person, Letters, Numbers, Text, Signature, Watermark, Logo, Stamp, Branding, Trademark, Copyright, Registered Trademark. --aspect 7:4 --s 750 --v 5 --q 2 ")
