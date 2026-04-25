import type { GlossaryTerm } from "../types";

export const glossary: GlossaryTerm[] = [
  { term: "注意力机制", english: "attention mechanism", topic: "Transformer", definition: "用可学习的 Q/K/V 权重动态选择序列中相关信息。" },
  { term: "因果注意力", english: "causal / masked attention", topic: "Transformer", definition: "把未来 token 的 logits 设为 -infinity，保证生成时不能看未来。" },
  { term: "多头注意力", english: "multi-head attention", topic: "Transformer", definition: "多个 head 在不同表示子空间同时计算 attention，然后拼接。" },
  { term: "位置编码", english: "positional encoding", topic: "Transformer", definition: "给 self-attention 添加顺序信息；可为 sinusoidal、learned、relative 或 RoPE。" },
  { term: "KV Cache", english: "key-value cache", topic: "Inference", definition: "在 autoregressive decode 中缓存旧 token 每层的 K/V，避免重复计算。" },
  { term: "Prefill", english: "prefill", topic: "Inference", definition: "并行处理完整 prompt，建立初始 KV cache 的阶段。" },
  { term: "Decode", english: "decode", topic: "Inference", definition: "每次生成一个新 token，并追加新 K/V 到 cache 的阶段。" },
  { term: "SIMT", english: "single instruction, multiple threads", topic: "CUDA", definition: "NVIDIA GPU 的执行模型：一个 warp 中线程通常同步执行同一条指令。" },
  { term: "Warp", english: "warp", topic: "CUDA", definition: "NVIDIA GPU 中通常 32 个线程组成的调度单位。" },
  { term: "Warp 分歧", english: "warp divergence", topic: "CUDA", definition: "同一 warp 内线程走不同分支，需要串行执行分支路径。" },
  { term: "合并内存访问", english: "coalesced memory access", topic: "CUDA", definition: "连续线程访问连续地址，使 global memory transaction 更高效。" },
  { term: "共享内存 bank conflict", english: "shared memory bank conflict", topic: "CUDA", definition: "同一 warp 多线程访问同一 bank 不同地址导致串行化；stride 与 32 的 gcd 常用于判断。" },
  { term: "Teacher forcing", english: "teacher forcing", topic: "Seq2Seq", definition: "训练 decoder 时输入真实上一个 target token，而不是模型预测。" },
  { term: "困惑度", english: "perplexity", topic: "Evaluation", definition: "语言模型交叉熵的指数形式，越低越好。" },
  { term: "BLEU", english: "bilingual evaluation understudy", topic: "Evaluation", definition: "基于 n-gram overlap 和 brevity penalty 的翻译/生成指标。" },
  { term: "FlashAttention", english: "IO-aware exact attention", topic: "Inference", definition: "通过 tiling/blocking 减少 HBM 与 SRAM 数据搬运，不在 HBM 中物化完整 n x n attention 矩阵。" },
  { term: "RLHF", english: "reinforcement learning from human feedback", topic: "Alignment", definition: "SFT、reward model、RL/PPO 与 KL penalty 组成的偏好对齐流程。" },
  { term: "量化", english: "quantization", topic: "Efficiency", definition: "把高精度数映射到低精度表示以降低内存和带宽，代价是误差。" },
];
