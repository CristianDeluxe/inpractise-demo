import mlx.core as mx
from mlx_whisper.audio import N_FRAMES, SAMPLE_RATE, log_mel_spectrogram, pad_or_trim
from mlx_whisper.load_models import load_model
from mlx_whisper.tokenizer import get_tokenizer

MODEL = 'mlx-community/whisper-large-v3-mlx'


def acoustic_scorer(audio):
    """Returns score(start, end, texts): Whisper large-v3 log-probability of each text given that audio span."""
    model = load_model(MODEL, dtype=mx.float16)
    tokenizer = get_tokenizer(model.is_multilingual, num_languages=model.num_languages,
                              language='en', task='transcribe')
    prefix = list(tokenizer.sot_sequence_including_notimestamps)

    def log_probability(features, text):
        ids = tokenizer.encode(' ' + text.strip()) + [tokenizer.eot]
        logits = model.logits(mx.array([prefix + ids]), features)[0].astype(mx.float32)
        logp = logits - mx.logsumexp(logits, axis=-1, keepdims=True)
        return sum(logp[len(prefix) - 1 + k, ids[k]].item() for k in range(len(ids)))

    def score(start, end, texts):
        clip = audio[int(max(0.0, start) * SAMPLE_RATE):int(end * SAMPLE_RATE)]
        mel = pad_or_trim(log_mel_spectrogram(clip, n_mels=model.dims.n_mels), N_FRAMES, axis=-2)
        features = model.embed_audio(mel.astype(mx.float16)[None])
        return [log_probability(features, text) for text in texts]

    return score
