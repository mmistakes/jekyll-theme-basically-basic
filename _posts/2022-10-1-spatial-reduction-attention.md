---
layout: post
title:  "Spatial Reduction Attention"
name:  "Daniel Hoshizaki"
---

# SegFormer Components

This notebook will explore the components of a [SegFormer model](https://arxiv.org/pdf/2105.15203.pdf) as defined by [Hugging Face (HF)](https://huggingface.co/docs/transformers/model_doc/segformer).

We will first start by exploring a concept called `stochastic depth decay`, the details of which can be found [here](https://github.com/aleju/papers/blob/master/neural-nets/Deep_Networks_with_Stochastic_Depth.md):

* What
  * Stochastic Depth (SD) is a method for residual networks, which randomly removes/deactivates residual blocks during training.
  * As such, it is similar to dropout.
  * While dropout removes neurons, SD removes blocks (roughly the layers of a residual network).
  * One can argue that dropout randomly changes the width of layers, while SD randomly changes the depth of the network.
  * One can argue that using dropout is similar to training an ensemble of networks with different layer widths, while using SD is similar to training an ensemble of networks with different depths.
  * Using SD has the following advantages:
    * It decreases the effects of vanishing gradients, because on average the network is shallower during training (per batch), thereby increasing the gradient that reaches the early blocks.
    * It increases training speed, because on average less convolutions have to be applied (due to blocks being removed).
    * It has a regularizing effect, because blocks cannot easily co-adapt any more. (Similar to dropout avoiding co-adaption of neurons.)
    * If using an increasing removal probability for later blocks: It spends more training time on the early (and thus most important) blocks than on the later blocks.

<br>
HF approach this problem by defining the probabilities of survival for each transformer block:

```python
import torch
drop_path_rate = 0.1
depths = [2,2,2,2]
dpr = [x.item() for x in torch.linspace(0, drop_path_rate, sum(depths))]
dpr
```