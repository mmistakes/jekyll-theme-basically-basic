---
title: Research
permalink: /research/
layout: page
---

SAL's research focus is a novel computer architecture for future AI computing and Cloud/IoT platforms. Its topics include Distributed Hardware System, GP-GPU, Neural Processing Unit, Memory sub-system, and Reliability. These are the critical aspects to scale up/out existing computers to deal with massive data in the era of Artificial Intelligence and Machine Learning.

----

# Distributed Hardware System

![alt distributed hardware system](/assets/images/research_distributed_hardware_system.png)

Our base platform to compute is migrating fast from the PC/mobile + server model to the CLOUD/EDGE/IoT platform, as the amount of data keeps exploding.  This new platform partitions data and its computations across cloud, edge, and sensor layers, based on the amounts of resources available and resources needed. With the new platform and partitioning, network efficiency will be the key factor to integrate these layers and will determine overall performance of the platform.

The goal of this research is to build a efficient distributed hardware system for the upcoming CLOUD/EDGE/IoT era. This includes distributed NPUs to process massive amount of AI data, and data loss handling for real-time AI.

(Korean) 데이터의 양이 폭증하면서, 컴퓨팅의 기본 플랫폼이 PC/mobile + 서버 모델에서 클라우드/엣지/IoT 플랫폼으로 빠르게 전환되고 있다. 새 플랫폼은 필요한 리소스와 사용가능한 리소스에 따라서, 클라우드, 엣지, 센서 계층으로 데이터와 연산을 분산하여 처리한다. 그리고 네트워크가 분할된 계층들을 서로 연결하고, 전체 플랫폼의 완결성과 성능을 결정하는 핵심요소가 될 것이다.

이 연구의 목표는 클라우드/엣지/IoT 플랫폼에서 효율적인 분산 하드웨어 시스템을 설계하는 것이다. 세부 연구주제로는 대용량 AI 데이터를 처리하기 위한 분산 NPU 시스템과 실시간 AI 처리를 위한 데이터손실 처리 등이 있다.

-----

# Memory Sub-system

AI and Big Data made Memory Sub-system crucial in throughput-oriented processors, like NPU and GPU. These processors has increased computation throughput over decades, but the amount of data to feed these computation units has grown relatively poorly. To improve system performance, balancing memory storage capacity and transfer bandwidth with computation throughput is one of the key challenges in modern processors.

The goal of this research is novel architectures to overcome physical limitations of memory. This includes novel data compression to improve effective capacity and bandwidth, and architectural support to exceed physical limitations by detecting/correcting errors.

(Korean) AI의 빅데이터를 처리하기 위한 throughput-oriented 프로세서(NPU와 GPU)에서는 많은 양의 데이터를 처리하기 위한 메모리 서브시스템의 성능이 결정적이다. 이들 프로세서의 연산능력은 꾸준히 증가해왔지만, 이러한 연산능력을 활용하기 위한 데이터의 공급 bandwidth는 상대적으로 느리게 발전되어 왔다. 전체 시스템 성능을 위해서는 연산 능력과, 메모리의 저장 용량, 전송 bandwidth들이 같이 균형있게 개선되어 하고, 이것은 최근 프로세서의 핵심 문제점들의 하나이다.

이 연구의 목표는 메모리의 물리적 한계를 뛰어넘는 새로운 컴퓨터 구조이다. 세부연구 주제로는 실효 저장 용량과 bandwidth를 향상하기 위한 데이터 압축 기법들이나, 발생할 수 있는 에러들을 탐지/복원함으로써 물리적 한계를 넘어서 메모리를 사용하는 연구 등이 있다.

----

# Reliability

![alt reliability](/assets/images/research_reliability.png)

As processing scaling continues, transistors became more vulnerable to faults and errors.  In memories, there are new types of errors, such as variable retention time and row hammer. In logics, increasing variability makes it more difficult to exploit faster transistors from the scaling: with fewer atoms to build a transistor, few more atoms now greatly affect the performance of the transistor. Because of this process variation, there has to be more timing margins to run safe.

The goal of this research is to protect memories and logics against these growing errors. This includes applying stronger error correcting codes (ECC) to protect data in memories, and predicting logic errors from aggressive dynamic voltage/frequency scaling (DVFS).

(Korean) 공정이 세밀화되면서 트랜지스터는 불량과 에러들에 더 취약해지고 있다. 메모리에서는 variable retention time과 row hammer와 같은 새로운 유형의 에러들이 발생하고 있고, 시스템반도체에서는 증가하는 변동성으로 공정 세밀화로 얻어질 수 있는 성능 개선을 어렵게 만들고 있다: 공정 세밀화로 점점 더 적은 원자들로 트랜지스터를 구성하면서, 몇개의 원자들만 더 붙어도 성능에 큰 변화가 발생할 수 있고, 이를 고려하여 설계에는 보수적으로 동작속도를 잡는다.

이 연구의 목표는 메모리와 시스템반도체를  이렇게 증가하는 에러들로부터 보호하는 것이다. 세부 연구 주제로는 메모리 데이터를 보호하기 위한 더 강력한 error correcting codes (ECC)와 dynamic voltage/frequency scaling(DVFS)를 공격적으로 적용하기 위하여  발생할 수 있는 로직 에러들을 예측하는 것 등이 있다.



