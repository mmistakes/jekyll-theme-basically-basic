---
layout: post
title:  "SegFormer: An Efficient Vision Transformer from Scratch"
name:  "Daniel Hoshizaki"
image: /assets/images/segformer/segformer.JPG
---
 
The SegFormer transformer model is a very stable and powerful computer vision model. In this article I take a deep dive into the inner workings of the model in an attempt to understand why it performs so well. Read on to find out what makes this vision model so awesome.
 
### Why Use SegFormer and Efficient Attention?
 
The main problem that the SegFormer model tries to tackle is the enormous compute footprint of self attention and the poor ability of vision transformers like ViT to adjust to variable pixel size images. Both issues are interrelated, but I'll walk through each one separately to begin with:
 
1. The computational complexity of self attention is quadratic. If we have an image that's 512 x 512, we need 262,144 computations for ONE attention map (usually there are 768 attention maps). An image that's 1024 x 1024 requires more than one million computations! Full self attention simply does not scale very well for larger image sizes...

2. A traditional approach to dealing with the large compute footprint of self attention is to group pixels and calculate the attention between groups (patches) rather than between individual pixels. ViT uses 16 x 16, non-overlapping patches. The problem with the non-overlapping approach is that a model trained on a certain image size (say, 224 x 224) has a hard time working with larger images during inference and fine tuning. If we think about this intuitively, the amount of "information" in a 16 x 16 patch from a 224 x 224 image is very different from the same sized patch from a 1024 x 1024 image. You would essentially need to train the model from scratch using larger image sizes if your end goal was to work with large images.
 
Ideally, we would use transfer learning and save ourselves time by fine-tuning a model trained on smaller image sizes to work on larger image sizes. Non-overlapping patches, however, prevent effective transfer of knowledge. To get around this road block, and the problem of large compute requirements of self attention, the authors of the SegFormer propose a simple but effective solution: efficient attention using overlapping patches. The method is straightforward:
 
1. Down sample the image to 1/4 the original size. A 512 x 512 image becomes 128 x 128. The self attention computation requirements are much better at this downsampled size.

2. Use a convolution kernel to create patches that overlap information from neighboring pixels. Each pixel in the downsampled image contains some information about its neighbors because of the convolution kernel's size and stride (more on this later).
 
The result of these two design choices are a vision transformer that has a lower computation footprint (hence, "efficient" self attention) and an architecture that allows for better adaptation to larger image sizes.


### Overlap Patch Embeddings

A nive feature of the SegFormer architecture is the removal of positional embeddings required in models like ViT. By using a convultion kernel with an overlapping size and stride the network is able to retain and understand the positional information associated with pixel and patch values. Here is how the authors describe the benifits of using overlap patch embeddings over regular patch embeddings:

> "**Removing Positional Embeddings**: The introduction of Convolutional Projections for every Transformer block, combined with the Convolutional Token Embedding, gives us the ability to *model local spatial relationships through the network*. This built-in property allows dropping the position embedding from the network without hurting performance, as evidenced by our experiments, simplifying design for vision tasks with variable input resolution."

I've added my own emphasis here on modelling spatial relationships through the network. In essence convolutions allow the network to learn spatial relationships from the inputs. This offers a much more flexible method of handling different resolution inputs.

Here's the code snippet that performs the patch emmbedding via convolutions.

```py
import torch
from torch import nn

class OverlapPatchEmbeddings(nn.Module):
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

Let's construct the first patch embedding layer of the vision transformer network and feed an example tensor through the layer.


```py
emb_block = OverlapPatchEmbeddings(kernel=7, stride=4, channels=3, hidden_state=32)

# Feed the example image through the layer
imgs = torch.rand(1, 3, 224, 224)  # random 224x224 images with 3 channels
emb, height, width = emb_block(imgs)

print("Token embedding shape:", emb.shape)
print(f"Reshaped output image height and width: {height}x{width}")
```
```
Token embedding shape: torch.Size([1, 3136, 32])
Reshaped output image height and width: 56x56
```

In terms of a convolutional operation, our input image of 224 x 224 was downsized by a factor of 4 to 56 x 56. The channels increased from 3 to 32. Each "pixel" or element in the downsized image can be thought of as an individual patch. Self attention will now be calculated between these patches.

The next step is to reshape the patches so that self attention can be computed between patches. Attention blocks in transformers can't handle tensors in the shape of an image with channels. Instead, the height and width dimension needs to be flattened into a single token dimension (height x width -> token) and the channel dimension will be called the embedding dimension. As shown in the output above, the new tensor shape is now batch, token, and embedding size.

When I first started learning about transformers, the concept of tokens and embeddings were foreign to me. I'm used to thinking about images as pixels and channels. I learned that a good way to think about tokens is through examples from NLP. Each token is a word like 'cat' or 'dog'. Each embedding of a token is a hidden word or meaning associated with the word token. In the 'cat' or 'dog' example, these words could be associated with a meanings like 'furry', 'mammal', or 'pet'. NLP transformers look at the connections between words by examining how the hidden meanings of different words relate to each other.

Unlike language, images don't have straightforward sequences of tokens. We can, however, force an image into a sequence by looking at every single pixel and treating it in a similar way to how a word is treated in NLP transformers. A single pixel token is associated with multiple channels (like red, green, and blue for color images). Each channel carries a hidden meaning, or embedding, associated with a pixel token. I'll admit that the hidden meaning of a pixel channel is a lot less intuitive than the hidden meanings of a word. That said, vision transformers find their own meanings in the connections between pixel channel embeddings. In a nutshell, self attention on images tells a model how pixel tokens relate to all other pixel tokens in the image.

### The Efficient Attention Mechanism



```py
import einops
import numpy as np

class EfficientAttention(nn.Module):
    def __init__(self, emb_size, heads, sr_ratio, dropout=0):
        super().__init__()
        self.emb_size = emb_size
        self.heads = heads

        # Check that the embedding size is a multiple of the number of heads
        assert self.emb_size % self.emb_size == 0, "Embedding size is not a multiple of the number of heads"

        # Embeddings are evenly distributed among each attention head
        self.head_size = self.emb_size / self.heads

        # Calculate the output embedding size
        # Generally, this is the same as the input embedding size
        self.total_emb_size = self.head_size * self.heads

        # Set up the linear layers for query, key, and value
        self.query = nn.Linear(self.emb_size, self.total_emb_size)
        self.key = nn.Linear(self.emb_size, self.total_emb_size)
        self.value = nn.Linear(self.emb_size, self.total_emb_size)

        # Setup the dropout layer
        self.dropout = nn.Dropout(dropout)

        # Sequence reduction
        # Used to downsample the key and value images in order to save on computations
        # This is why we term this type of attention as 'efficient'
        self.sr_ratio = sr_ratio
        if self.sr_ratio > 1:
            self.sr = nn.Conv2d(self.emb_size, self.emb_size, kernel_size=self.sr_ratio, stride=self.sr_ratio)
            self.norm = nn.LayerNorm(self.emb_size)
    
    def forward(self, x, height, width):
        # Apply the linear layer to the query
        # The query will not be downsampled by the sequence reduction call
        query = self.query(x)

        # Check if sequence reduction is necesary
        if self.sr_ration > 1:
            # Apply sequence reduction to key and value in order to reduce the tensor sizes
            # Start by reshaping the token embeddings back to an image tensor
            # (batch, channels, height, width)
            x = einops.rearrange(x, "b (h w) c -> b h w c", h=height, w=width)

            # Apply the convolution based reduction
            x = self.sr(x)

            # Reshape back to a token embeddings tensor
            x = einops.rearrange(x, "b c h w -> b (h w) c")

            # Apply the layer normalization
            x = self.norm(x)
        
        key = self.key(x)
        value = self.value(x)

        # Reshape query, key, value so that the tokens are evenly split between the heads
        query = einops.rearrange(query, "b (h t) e -> b h t e", h=self.heads)
        key   = einops.rearrange(key,   "b (h t) e -> b h t e", h=self.heads)
        value = einops.rearrange(value, "b (h t) e -> b h t e", h=self.heads)

        
        # NOTE
        # torch.matmul is faster than torch.einsum so it's better to use the former in production
        # We will stick to einsum since it is easier to read and understand in tutorials
        # (batch, heads, query, embeddings) dot 
        # (batch, heads, key, embeddings) -> 
        # (batch, heads, query, key)
        attention = torch.einsum("bhqe,bhke->bhqk", [query, key])

        # Normalize the attention scores
        attention = nn.functional.softmax(attention / np.sqrt(self.head_size), dim=-1)

        # Contextualize the embedings with the attention scores
        context_emb = torch.einsum("bhqk,bhve->bhqe", [attention, value])

        # Rejoin the split heads and return a new embedding token
        context_emb = einops.rearrange(context_emb, "b h t e -> b (h t) e", h=self.heads)

        return context_emb
```