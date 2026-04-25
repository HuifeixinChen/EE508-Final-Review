import type { Difficulty, QuizQuestion, QuizType } from "../types";

type Seed = Omit<QuizQuestion, "id">;

function q(topic: string, difficulty: Difficulty, type: QuizType, question: string, correctAnswer: string, explanation: string, commonMistake: string, options?: string[]): Seed {
  return { topic, difficulty, type, question, correctAnswer, explanation, commonMistake, options };
}

const cuda: Seed[] = [
  q("CUDA/GPU", "easy", "code", "__global__ void add(...) { int i = blockIdx.x * blockDim.x + threadIdx.x; if (i < N) C[i]=A[i]+B[i]; } 全局索引公式是什么？", "i = blockIdx.x * blockDim.x + threadIdx.x", "1D CUDA kernel 的标准全局 thread index 是 block 起点加 block 内 thread offset。", "只写 threadIdx.x，忘记 blockIdx.x * blockDim.x。"),
  q("CUDA/GPU", "easy", "code", "同一个 add kernel 中 if (i < N) 为什么需要？", "bounds check", "最后一个 block 可能超出 N，bounds check 防止越界访问。", "认为 grid size 总能整除 N。"),
  q("CUDA/GPU", "easy", "code", "A[i]、B[i]、C[i] 对连续线程通常是 coalesced 吗？", "yes", "连续线程访问连续地址，通常形成合并内存访问。", "只看到 global memory 就认为一定慢且不 coalesced。", ["yes", "no"]),
  q("CUDA/GPU", "medium", "code", "if (threadIdx.x % 2 == 0) { ... } else { ... } 是否会造成 warp divergence？", "yes", "同一 warp 内偶数/奇数 lane 走不同分支，分支路径会串行化。", "只要两个分支都有线程执行就认为是 block divergence 而忽略 warp。", ["yes", "no"]),
  q("CUDA/GPU", "medium", "scenario", "64-thread block 中 if (threadIdx.x < 32) 是否在每个 warp 内造成 divergence？", "no", "warp0 全 true，warp1 全 false；每个 warp 内路径一致。", "把不同 warp 走不同路径误判为同一 warp divergence。", ["yes", "no"]),
  q("CUDA/GPU", "hard", "calculation", "32 banks 下 shared[threadIdx.x * 32] 是几路 bank conflict？", "32", "stride=32，gcd(32,32)=32，所以是 32-way conflict。", "认为 threadIdx.x 不同就一定没有冲突。"),
  q("CUDA/GPU", "medium", "calculation", "32 banks 下 stride=33 的 shared memory access 冲突路数？", "1", "gcd(33,32)=1，无普通 bank conflict。", "看到 33 大于 32 就认为更糟。"),
  q("CUDA/GPU", "medium", "calculation", "blockIdx.x=6, blockDim.x=4, threadIdx.x=1，global index 是多少？", "25", "6*4+1=25。", "把 blockDim.x 和 threadIdx.x 相乘。"),
  q("CUDA/GPU", "easy", "short", "__syncthreads() 同步范围是什么？", "same block", "__syncthreads 只同步同一 block 内线程，不同步整个 grid。", "说它同步所有 blocks。"),
  q("CUDA/GPU", "medium", "scenario", "Row-major image 中 row-wise access 通常比 column-wise access 更 coalesced，正确吗？", "true", "row-wise 连续线程更可能访问连续地址；column-wise 通常 stride=width。", "忽略 row-major layout。", ["true", "false"]),
  q("CUDA/GPU", "easy", "short", "2D row-major index 公式是什么？", "idx = row * width + col", "行优先数组先跨过 row 行，每行 width 个元素，再加 col。", "写成 col * height + row。"),
  q("CUDA/GPU", "medium", "scenario", "GPU 经常偏好 SoA 而不是 AoS 的主要原因是什么？", "coalesced memory access", "SoA 让 warp 中相邻线程访问同一字段的连续地址。", "认为 GPU 总是喜欢处理单个 object 的所有字段。"),
  q("CUDA/GPU", "easy", "short", "__global__ 函数在哪里调用、在哪里运行？", "called from host and runs on device", "__global__ kernel 由 host launch，在 GPU device 执行。", "把 __global__ 与 __device__ 混淆。"),
  q("CUDA/GPU", "easy", "short", "GPU 相比 CPU 的核心设计倾向是什么？", "many simple throughput-oriented cores", "GPU 用大量简单核心追求吞吐，CPU 用较少强核心与复杂控制/cache。", "说 GPU 单线程延迟一定更低。"),
  q("CUDA/GPU", "medium", "short", "SIMT 是什么？", "single instruction multiple threads", "SIMT 表示多个线程通常以同一指令流并行执行，但每个线程有独立状态。", "把 SIMT 完全等同 SIMD，忽略 thread abstraction。"),
  q("CUDA/GPU", "medium", "scenario", "所有线程读取同一个 shared memory 地址时是否按普通 bank conflict 惩罚？", "no", "broadcast/multicast exception 可高效处理同地址读取。", "机械套 gcd 规则到 broadcast。", ["yes", "no"]),
  q("CUDA/GPU", "hard", "scenario", "tile[32][32] column access 常见 stride 是多少？", "32", "按列读连续 row 时地址相隔一整行，即 stride 32，易 32-way conflict。", "把二维数组视觉上的相邻列当成内存相邻。"),
  q("CUDA/GPU", "medium", "scenario", "tile[32][33] padding 为什么能缓解 column bank conflict？", "stride 33 makes gcd(33,32)=1", "padding 让列访问 stride 从 32 变 33，分散到不同 banks。", "认为 padding 只是为了对齐容量。"),
  q("CUDA/GPU", "easy", "short", "CUDA kernel launch 语法中的 blocks 和 threads 写在哪里？", "kernel<<<blocks, threads>>>", "三尖括号配置 grid/block 维度。", "写成普通函数参数。"),
  q("CUDA/GPU", "medium", "scenario", "缺少 __syncthreads 的 tiled shared-memory kernel 可能出现什么问题？", "race condition", "部分线程可能在数据未全部加载完成时读取 shared tile。", "认为 shared memory 自动同步。"),
];

const attention: Seed[] = [
  q("Transformer/Attention", "easy", "shape", "X 是 n x d_model，Q 和 K 是 n x d_k，QK^T shape 是什么？", "n x n", "QK^T 比较每个 query token 与每个 key token。", "写成 d_k x d_k。"),
  q("Transformer/Attention", "easy", "shape", "V 是 n x d_v，attention weights 是 n x n，输出 shape 是什么？", "n x d_v", "(n x n)(n x d_v)=n x d_v。", "把输出写成 n x n。"),
  q("Transformer/Attention", "medium", "short", "为什么 scaled dot-product attention 要除以 sqrt(d_k)？", "prevent large logits and softmax saturation", "d_k 大时 dot product 方差变大，缩放能稳定 softmax。", "说只是为了改变矩阵 shape。"),
  q("Transformer/Attention", "easy", "short", "Q 在 attention 中的直觉含义是什么？", "what this token needs", "Query 表示当前 token 查找什么信息。", "把 Q 当成被混合的信息。"),
  q("Transformer/Attention", "easy", "short", "K 在 attention 中的直觉含义是什么？", "what each token offers for matching", "Key 是供 query 匹配的特征。", "把 K 当成输出值。"),
  q("Transformer/Attention", "easy", "short", "V 在 attention 中的直觉含义是什么？", "information to be mixed", "Value 是根据 weights 加权求和的信息。", "把 V 当成相似度分数。"),
  q("Transformer/Attention", "medium", "short", "Masked attention 中未来 logits 通常设成什么？", "-infinity", "softmax 后对应 future probability 变为 0。", "设成 0 会让 future token 仍有概率。"),
  q("Transformer/Attention", "medium", "scenario", "Token i 在 causal attention 中可以 attend 到哪些位置？", "j <= i", "autoregressive causality 只允许看当前和过去。", "允许看所有 source positions，与 cross-attention 混淆。"),
  q("Transformer/Attention", "medium", "short", "Masked attention 为什么允许 training 并行？", "full target sequence is processed with future mask", "训练时 target 全可用，但 mask 防作弊，所以所有位置可并行计算 loss。", "认为训练也必须逐 token 串行。"),
  q("Transformer/Attention", "medium", "short", "Multi-head attention 的主要作用是什么？", "attend to different positions and representation subspaces simultaneously", "不同 head 可学习不同关系与子空间。", "说 head 只是为了增加 batch size。"),
  q("Transformer/Attention", "easy", "multiple", "BERT 通常是哪类 Transformer？", "encoder-only", "BERT 使用 encoder-only bidirectional understanding。", "把所有 Transformer generation 都叫 BERT。", ["encoder-only", "decoder-only", "CNN", "RNN"]),
  q("Transformer/Attention", "easy", "multiple", "GPT 通常是哪类 Transformer？", "decoder-only", "GPT 是 causal decoder-only generation model。", "把 GPT 说成 encoder-decoder。", ["encoder-only", "decoder-only", "encoder-decoder", "LSTM"]),
  q("Transformer/Attention", "medium", "short", "Encoder-decoder Transformer 中 decoder cross-attention 的 K/V 来自哪里？", "encoder hidden states", "Decoder query attend 到 encoder output 的 K/V。", "说 K/V 来自 decoder future tokens。"),
  q("Transformer/Attention", "medium", "short", "Self-attention alone 为什么需要 positional encoding？", "it is permutation-invariant", "没有位置，attention 对顺序不敏感。", "说 positional encoding 是为了降维。"),
  q("Transformer/Attention", "medium", "short", "Input embedding 与 positional encoding 如何结合？", "token embedding + positional encoding", "标准做法是把位置向量加到 token embedding。", "把位置编码作为 label。"),
  q("Transformer/Attention", "hard", "short", "RoPE 的高层思想是什么？", "rotate Q and K based on position", "RoPE 在 dot-product 前按位置旋转 Q/K，使 attention 体现相对距离。", "说 RoPE 是固定 one-hot 位置编号。"),
  q("Transformer/Attention", "medium", "short", "Residual connection 在 Add & Norm 中有什么作用？", "improve gradient flow", "残差路径帮助梯度传播并保留原表示。", "说它只用于改变 vocabulary size。"),
  q("Transformer/Attention", "medium", "short", "LayerNorm 在 Transformer 中主要帮助什么？", "stabilize activations", "LayerNorm 让层输入分布更稳定，利于训练。", "把 LayerNorm 当成 loss function。"),
  q("Transformer/Attention", "medium", "shape", "n=12, d_k=64，attention score matrix shape 是什么？", "12 x 12", "score matrix 对所有 token pair 评分。", "写成 12 x 64。"),
  q("Transformer/Attention", "medium", "shape", "4 heads 每个 head 输出 n x 16，concat 后 shape 是什么？", "n x 64", "concat 沿 feature dimension 拼接，4*16=64。", "沿 sequence dimension 拼成 4n x 16。"),
  q("Transformer/Attention", "hard", "scenario", "为什么 decoder 训练时不能直接看完整 target 的未来 token？", "it would cheat and violate autoregressive causality", "生成时未来 token 不存在，训练看未来会造成目标泄露。", "认为看未来只是提高速度没有副作用。"),
  q("Transformer/Attention", "medium", "short", "Cross-attention 与 self-attention 的关键区别是什么？", "query comes from decoder while key/value come from encoder", "Cross-attention 连接两条序列；self-attention 在同一序列内部。", "只说名字不同。"),
  q("Transformer/Attention", "easy", "short", "Attention weights 每一行 softmax 后和是多少？", "1", "softmax 将每个 query 对所有 keys 的权重归一化。", "认为整个矩阵总和为 1。"),
  q("Transformer/Attention", "medium", "short", "Sinusoidal PE 使用多种频率的直觉是什么？", "create a Fourier-like positional fingerprint", "不同频率组合让位置具有可区分且可泛化的编码。", "只说为了让值在 0 到 1。"),
  q("Transformer/Attention", "hard", "scenario", "FlashAttention 是否改变 attention 的数学结果？", "no", "FlashAttention 是 exact attention 的 IO-aware 实现优化。", "把它当 approximate/sparse attention。", ["yes", "no"]),
];

const inference: Seed[] = [
  q("KV/Inference/Decoding", "easy", "short", "为什么 cache K/V 而不是 old Q？", "old K/V are reused by future queries; Q is only needed for current token", "未来新 query 需要匹配所有旧 K 并读取旧 V；旧 Q 不再被使用。", "认为 Q/K/V 都必须永久缓存。"),
  q("KV/Inference/Decoding", "easy", "short", "Prefill 是什么？", "process full prompt in parallel and build KV cache", "Prefill 处理完整 prompt，建立初始 cache。", "说 prefill 是逐 token 生成回复阶段。"),
  q("KV/Inference/Decoding", "easy", "short", "Decode 是什么？", "generate one token at a time using cached K/V", "Decode 每步只处理最新 token，并追加新 K/V。", "说 decode 重新处理完整 prompt。"),
  q("KV/Inference/Decoding", "medium", "calculation", "layers=2, heads=4, head_dim=8, seq=10, bytes=2，KV cache 约多少 bytes？", "2560", "2*K/V * 2 layers * 4 heads * 8 * 10 * 2 = 2560。", "漏掉 K 和 V 的因子 2。"),
  q("KV/Inference/Decoding", "medium", "short", "KV cache 的主要 trade-off 是什么？", "more memory for less repeated computation", "Cache 加速推理但 memory 随序列和层数增长。", "认为 cache 没有任何代价。"),
  q("KV/Inference/Decoding", "easy", "multiple", "Greedy decoding 每步选择什么？", "argmax token", "Greedy 选择当前概率最高 token。", "把 greedy 当采样。", ["argmax token", "lowest probability token", "random token", "all tokens"]),
  q("KV/Inference/Decoding", "easy", "multiple", "Beam width B=1 等价于什么？", "greedy", "只保留一个最佳 partial sequence 就是 greedy。", "认为 B=1 比 greedy 更全局。", ["greedy", "top-p", "contrastive", "speculative"]),
  q("KV/Inference/Decoding", "medium", "short", "Temperature T>1 对分布有什么影响？", "flatter and more random", "logits 除以更大 T，softmax 更平坦。", "说 T>1 更确定。"),
  q("KV/Inference/Decoding", "medium", "short", "Top-k 与 Top-p 的核心区别？", "top-k fixed count; top-p adaptive cumulative probability", "Top-k 保留固定 k 个；top-p 保留累计概率达到 p 的最小集合。", "把 top-p 解释成固定 p 个 token。"),
  q("KV/Inference/Decoding", "hard", "short", "Speculative decoding 如何加速？", "draft model proposes tokens and target model verifies in parallel", "小模型草拟多个 token，大模型并行验证，接受率高时减少大模型调用步数。", "认为小模型输出无需大模型检查。"),
  q("KV/Inference/Decoding", "medium", "short", "Contrastive decoding 的概念分数可以写成什么？", "log p_expert(x) - alpha log p_base(x)", "它偏好 expert 高概率且 base/generic 不过分偏好的 token。", "把 contrastive decoding 当 top-k。"),
  q("KV/Inference/Decoding", "medium", "scenario", "Beam search 是否保证找到全局最优序列？", "no", "Beam 会剪枝，只保留 B 个候选，不保证全局最优。", "把 beam 当 exhaustive search。", ["yes", "no"]),
  q("KV/Inference/Decoding", "hard", "short", "FlashAttention 的核心高层思想是什么？", "exact attention with IO-aware tiling that avoids materializing full attention matrix in HBM", "它利用 GPU memory hierarchy，在 SRAM/shared memory tile 中计算，减少 HBM 往返。", "只说它是近似 attention。"),
  q("KV/Inference/Decoding", "medium", "short", "标准 attention 对长序列昂贵的矩阵是什么？", "n x n attention matrix", "所有 token pair 的 score/weights 形成 n x n 矩阵。", "说是 vocabulary x vocabulary。"),
  q("KV/Inference/Decoding", "easy", "short", "Top-p 也叫什么？", "nucleus sampling", "Top-p sampling 常称 nucleus sampling。", "把它叫 beam search。"),
];

const recurrent: Seed[] = [
  q("RNN/LSTM/Seq2Seq", "easy", "short", "RNN 为什么能处理 variable-length input？", "same recurrent cell is applied across time", "同一参数可重复应用到任意长度序列。", "认为必须固定输入长度。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "RNN hidden state h_t 的作用是什么？", "memory of previous tokens", "h_t 汇总到当前时间的历史信息。", "把 h_t 当成固定 label。"),
  q("RNN/LSTM/Seq2Seq", "medium", "short", "BPTT 中为什么会 vanishing/exploding gradients？", "repeated multiplication by recurrent weights", "长链反复乘 W，特征值小于/大于 1 会收缩/放大。", "只说因为数据太长。"),
  q("RNN/LSTM/Seq2Seq", "medium", "calculation", "W=2, T=10 时标量梯度倍率是多少？", "1024", "2^10=1024，倾向 explode。", "把 2*10 当 20。"),
  q("RNN/LSTM/Seq2Seq", "medium", "calculation", "W=0.5, T=10 时梯度倾向 vanish 还是 explode？", "vanish", "0.5^10 很小，梯度收缩。", "只看 W 为正就认为 explode。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "LSTM 的 C_t 通常表示什么？", "long-term memory", "Cell state 是较长期的信息通道。", "把 C_t 当输出 logits。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "LSTM 的 H_t 通常表示什么？", "short-term hidden state", "H_t 是暴露给输出/下一步的 hidden state。", "与 C_t 完全混同。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "Forget gate 的作用是什么？", "filters old memory", "f_t 控制 C_{t-1} 保留多少。", "说 forget gate 写入新记忆。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "Input gate 的作用是什么？", "writes new information", "i_t 控制 candidate memory 写入多少。", "说 input gate 决定输出词概率。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "Output gate 的作用是什么？", "controls exposed hidden state", "o_t 控制 tanh(C_t) 暴露为 H_t 的比例。", "说 output gate 删除旧 memory。"),
  q("RNN/LSTM/Seq2Seq", "medium", "short", "Seq2Seq fixed context vector bottleneck 是什么？", "compressing whole source sequence into one vector hurts long sequences", "长源句信息被压到单一向量中，decoder 难以访问细节。", "说 bottleneck 是 GPU memory bank。"),
  q("RNN/LSTM/Seq2Seq", "medium", "short", "Cross-attention 如何缓解 Seq2Seq bottleneck？", "dynamically weights encoder hidden states at each decoder step", "Decoder 每步可选择相关 source positions。", "说它缩短 source sentence。"),
  q("RNN/LSTM/Seq2Seq", "easy", "short", "Teacher forcing 训练时喂给 decoder 的上一个 token 是什么？", "true previous target token", "即使模型上一步预测错，也喂 ground-truth previous token。", "认为喂模型自己预测。"),
  q("RNN/LSTM/Seq2Seq", "medium", "short", "Seq2Seq attention weights alpha_{t,i} 经过什么归一化？", "softmax", "score e_{t,i} 经过 softmax 变成权重。", "把它当 sigmoid independent weights。"),
  q("RNN/LSTM/Seq2Seq", "hard", "scenario", "Teacher forcing 的一个 inference mismatch 是什么？", "training sees true previous tokens but inference uses model predictions", "训练和推理输入分布不同，可能导致 exposure bias。", "认为 teacher forcing inference 仍可使用答案。"),
];

const trainingEval: Seed[] = [
  q("Training/Evaluation", "easy", "calculation", "TP=10, FP=5, FN=5, TN=80，precision 是多少？", "0.667", "10/(10+5)=0.666...。", "把 FN 放进 precision 分母。"),
  q("Training/Evaluation", "easy", "calculation", "TP=10, FP=5, FN=5, TN=80，recall 是多少？", "0.667", "10/(10+5)=0.666...。", "把 FP 放进 recall 分母。"),
  q("Training/Evaluation", "medium", "short", "为什么 imbalanced data 中 accuracy 可能误导？", "majority-class predictions can be high accuracy while minority recall is low", "全预测多数类也能 accuracy 高，但少数类完全失败。", "只看总正确数。"),
  q("Training/Evaluation", "medium", "short", "F1 为什么不是算术平均？", "it is harmonic mean and penalizes imbalance", "调和平均在 precision/recall 不平衡时更低。", "把 F1 写成 (P+R)/2。"),
  q("Training/Evaluation", "easy", "short", "One-hot label 下 cross-entropy loss 等于什么？", "-log(p_correct)", "只有正确类别 y_i=1，其余为 0。", "写成 -p_correct log p_correct。"),
  q("Training/Evaluation", "medium", "short", "Perplexity 越低越好吗？", "yes", "低 PPL 表示正确 token 平均概率更高。", "把 PPL 当 accuracy。", ["yes", "no"]),
  q("Training/Evaluation", "medium", "short", "完美语言模型的 PPL 接近多少？", "1", "如果每个正确 token 概率接近 1，负 log 近 0，exp(0)=1。", "说接近 0。"),
  q("Training/Evaluation", "medium", "short", "BLEU 的核心是什么？", "n-gram overlap with brevity penalty", "BLEU 比较候选与参考的 n-gram overlap，并惩罚过短输出。", "说 BLEU 是人工评分。"),
  q("Training/Evaluation", "hard", "scenario", "BLEU 对 paraphrase 的局限是什么？", "it may miss semantic equivalence", "语义等价但 n-gram 不重合会被低估。", "认为 BLEU 完全语义理解。"),
  q("Training/Evaluation", "medium", "short", "Transformer decoder training 为什么可并行？", "shifted targets plus causal mask", "完整 target 可同时输入；mask 阻止位置看未来。", "认为任何 decoder 训练都必须逐 token。"),
];

const alignmentQuant: Seed[] = [
  q("RLHF/Quantization", "easy", "short", "RLHF 的三个主要步骤是什么？", "SFT, reward model, RL fine-tuning", "通常先监督微调，再用偏好训练 reward model，再 PPO/RL 优化 policy。", "漏掉 reward model。"),
  q("RLHF/Quantization", "medium", "short", "Reward model 的训练信号来自哪里？", "human preference rankings", "人类对响应 A/B 的偏好排序用于训练 reward model。", "认为来自 next-token labels。"),
  q("RLHF/Quantization", "medium", "short", "RLHF 中 KL penalty 的作用是什么？", "avoid drifting too far from reference model", "KL 限制 policy 远离 reference，降低 reward hacking/退化风险。", "说 KL 是分类 accuracy。"),
  q("RLHF/Quantization", "medium", "short", "Reward hacking 是什么？", "optimizing the reward model in unintended ways", "模型利用 reward model 缺陷提高分数但不真正改进行为。", "把 reward hacking 当 regularization。"),
  q("RLHF/Quantization", "easy", "short", "Floating point 的 exponent 控制什么？", "dynamic range", "Exponent 决定可表示数值范围。", "说 exponent 控制小数精度。"),
  q("RLHF/Quantization", "easy", "short", "Floating point 的 mantissa/significand 控制什么？", "precision", "Mantissa/fraction 决定有效数字精度。", "说 mantissa 控制符号。"),
  q("RLHF/Quantization", "medium", "calculation", "FP32 到 INT8，每值 bit 数约减少到多少？", "1/4", "32 bits -> 8 bits，是四分之一 memory。", "说减少到 1/8。"),
  q("RLHF/Quantization", "medium", "short", "量化的近似反量化公式是什么？", "x ~= scale * (q - zero_point)", "Affine quantization 用 scale 和 zero_point 近似恢复实值。", "漏掉 zero_point。"),
  q("RLHF/Quantization", "medium", "short", "量化主要 trade-off 是什么？", "efficiency versus accuracy", "省内存/带宽/可能加速，但引入误差与可能 accuracy loss。", "认为量化总是无损加速。"),
  q("RLHF/Quantization", "hard", "scenario", "为什么 softmax 或 layer norm 常保留较高精度？", "they are numerically sensitive", "归一化/指数等操作对数值误差敏感，低精度可能不稳定。", "认为所有层都必须同一精度。"),
];

const mixed: Seed[] = [
  q("Mixed Final", "hard", "scenario", "一道 CUDA snippet 题的标准检查顺序是什么？", "index, bounds, coalescing, divergence, shared memory sync and bank conflicts", "先确定线程对应数据，再检查越界、内存连续性、warp 分支、shared memory 同步与 bank。", "直接猜优化策略。"),
  q("Mixed Final", "hard", "scenario", "用一句话区分 masked self-attention 与 cross-attention。", "masked self-attention attends within decoder past tokens; cross-attention attends from decoder queries to encoder states", "前者保证因果生成，后者连接 source 和 target。", "只说两者都有 attention。"),
  q("Mixed Final", "medium", "scenario", "为什么 KV cache 和 FlashAttention 都与 memory hierarchy 有关但解决的问题不同？", "KV cache avoids recomputing previous K/V during decode; FlashAttention reduces HBM IO for attention computation", "KV cache 是推理跨步复用；FlashAttention 是单次 attention 的 IO-aware tiling。", "把二者都说成 approximate attention。"),
  q("Mixed Final", "hard", "scenario", "如果模型在训练中 PPL 降低但人类偏好差，post-training 可做什么？", "SFT and RLHF", "PPL 只度量 next-token likelihood，不保证 helpful/aligned；可用 SFT/RLHF 对齐。", "认为继续降低 PPL 必然提升用户体验。"),
  q("Mixed Final", "medium", "scenario", "长上下文推理中量化 KV cache 的潜在收益和风险？", "lower memory bandwidth and capacity pressure but possible accuracy loss", "KV cache 随 seq_len 增长；低精度可省内存，但 attention 数值可能受误差影响。", "认为只要 INT4 就一定无质量损失。"),
];

export const quizzes: QuizQuestion[] = [
  ...cuda,
  ...attention,
  ...inference,
  ...recurrent,
  ...trainingEval,
  ...alignmentQuant,
  ...mixed,
].map((item, index) => ({ id: `q-${String(index + 1).padStart(3, "0")}`, ...item }));
