---
layout: post
title:  "Attention Mechanisms for Vision Transformers"
name:  "Daniel Hoshizaki"
image:
  path: /assets/images/attention_comparison/attention.jpg
  thumbnail: /assets/images/attention_comparison/attention.jpg

---

This notebook will explore the components of a [SegFormer model](https://arxiv.org/pdf/2105.15203.pdf) as defined by [Hugging Face (HF)](https://huggingface.co/docs/transformers/model_doc/segformer).

<p align="center">
  <img src="/assets/images/attention_comparison/cat/cat.jpg" width="256" height="256" />
  <img src="/assets/images/attention_comparison/cat/seg.jpg" width="256" height="256" />
  <img src="/assets/images/attention_comparison/cat/swin.jpg" width="256" height="256" />
  <img src="/assets/images/attention_comparison/cat/deform.jpg" width="256" height="256" />
</p>

<p align="center">
  <img src="/assets/images/attention_comparison/satellite/seg.png" width="512"/>
</p>
<p align="center">
  <img src="/assets/images/attention_comparison/satellite/swin.png" width="512"/>
</p>
<p align="center">
  <img src="/assets/images/attention_comparison/satellite/def.png" width="512"/>
</p>