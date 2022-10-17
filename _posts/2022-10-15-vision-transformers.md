---
layout: post
title:  "Efficient Vision Transformer From Scratch"
name:  "Daniel Hoshizaki"

introduction: |
    Description of this blog post goes here.

image: /assets/images/segformer/segformer.JPG
---
 
The SegFormer transformer model is one of the most stable and powerful vision models I have ever worked with. I wanted to understand why the model performs so well, so I decided to take a deep dive and look at the inner workings and components. In this blog post I will examine each layer of the model and attempt to explain the rough intuition of why this model works so well and is so awesome.
 
### Why Use SegFormer and Efficient Attention?
 
The main problem that the SegFormer model tries to tackle is the enormous compute footprint of self attention and the poor ability of vision transformers like ViT to adjust to variable pixel size images. Both issues are interrelated, but I'll walk through each one separately to begin with:
 
1. The computational complexity of self attention is quadratic. If we have an image that's 512 x 512, we need 262,144 computations for ONE attention map (usually there are 728 such maps). An image that's 1024 x 1024 requires more than one million computations! Full on self attention simply does not scale very well for larger image sizes...

2. A traditional approach to dealing with the large compute footprint of self attention is to group pixels and compute the attention between groups (patches) rather than individual pixels. ViT uses 16 x 16, non-overlapping patches.The problem with the non-overlapping approach is that a model trained on a certain image size (say, 224 x 224) has a hard time working with larger images during inference and fine tuning. If we think about this intuitively, the amount of "information" in a 16 x 16 patch from a 224 x 224 image is very different from the same sized patch from a 1024 x 1024 image. You would essentially need to train the model from scratch using larger image sizes if your end goal was to work with such large images.
 
Ideally, we would use transfer learning and save ourselves time by fine-tuning a model trained on smaller image sizes to work on larger image sizes. Non-overlapping patches, however, prevent effective transfer of knowledge. To get around both this road block, and the problem or large compute requirements of self attention, the authors of the SegFormer propose a simple but effective solution: efficient attention using overlapping patches. The method is straightforward:
 
1. Down sample the image to 1/4 the original size. A 512 x 512 image becomes 128 x 128. The self attention computation requirements are much better than working at the original size.

2. Use a convolution kernel to create patches that overlap information from neighboring pixels. Each pixel in the 128 x 128 downsampled image contains some information about its neighbors because of the convolution kernel's size and stride (more on this later).
 
The result of these design choices is a vision transformer that has a lower computation footprint (hence, "efficient" self attention) and an architecture that allows for better adaptation to larger image sizes.
 

### The Role of Convolutions

There seems to be a trend for emphasizing the lack of convolutions in transformer models. Some authors go out of their way to state that their models are convolution-free. I don't know what the criteria is for calling a model convolution free, but if you look inside the models thei very clearly use convolution layers in some capacity. 

The use of convolutional models has been extremely common and they are still useful aspects of these models that can be incorporated into transformer models. [Wu et al.](https://arxiv.org/pdf/2103.15808.pdf) give the clearest explanaition of the role of convolutions in vision transformer models.

I was wondering how positional embeddings that NLP relies on could be removed from vision transformers. The authers give this explanaition:

> "**Removing Positional Embeddings**: The introduction of Convolutional Projections for every Transformer block, combined with the Convolutional Token Embedding, gives us the ability to *model local spatial relationships through the network*. This built-in property allows dropping the position embedding from the network without hurting performance, as evidenced by our experiments, simplifying design for vision tasks with variable input resolution."

I've added my own emphasis here on modelling spatial relationships through the network. In essence convolutions allow the network to learn spatial relationships from the inputs. This offers a much more flexible method of handling different resolution inputs.

Here's the code snippet that performs the patch emmbedding via convolutions.

```py
import torch
from torch import nn

class PatchEmbeddings(nn.Module):
    def __init__(self, kernel, stride, channels, hidden_state):
        super().__init__()

        # Set up the convolution
        self.conv = nn.Conv2d(channels, hidden_state, 
                              kernel_size=kernel, stride=stride, padding=kernel // 2)
        
        # Normalize the output of the convolution via Layer Norm
        # Why LayerNorm instead of BatchNorm? https://stats.stackexchange.com/a/505349
        self.norm = nn.LayerNorm(hidden_state)

    @staticmethod
    def token_shape(x):
        # Given an image input with shapes (batch, channels, height, width)
        # Convert the shape to (batch, channels, height x width)
        # Then rearrange the dimensions to (batch, height x width, channels)
        return x.flatten(2).transpose(1, 2)  # embedding token shape ready for transformer block

    def forward(self, inputs):
        # The expected shape of the input is:
        # (batch, channels, height, width)
        # First send the input through the convolution layer
        conv_out = self.conv(inputs)

        # The output image size is downsampled, so we need to collect the new height and width lengths
        b, c, new_height, new_width = conv_out.shape

        # Reshape the output to transformer block compatable tokens
        token_embeddings = self.token_shape(conv_out)

        # Normalize the tokens
        token_embeddings = self.norm(token_embeddings)

        # Return the image output reshaped as (batch, tokens, embeddings)
        # Also return the reshaped output image's height and width
        return token_embeddings, new_height, new_width
```