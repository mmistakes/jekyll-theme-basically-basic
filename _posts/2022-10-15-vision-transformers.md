---
layout: post
title:  "Vision Transformer Notes"
name:  "Daniel Hoshizaki"

introduction: |
    Description of this blog post goes here.

image: /assets/images/deform_plain.png
---

This notebook explores the components and layers of various vision transformer models. I primarily focus on SegFormer's implementation, but will look at other models as well for brief comparisons. To start off the examination, we will take a look at the role of convolutions in transformers.

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