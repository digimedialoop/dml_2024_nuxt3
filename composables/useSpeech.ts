import { ref } from "vue";

export function useSpeech() {
  const synth = window.speechSynthesis;
  let utterance: SpeechSynthesisUtterance | null = null;

  const isSpeaking = ref(false);
  const isPaused = ref(false);

  // **Hilfsfunktion: SSML-Formatierung**
  const formatSSML = (text: string) => {
    return `
      <speak>
        <p><break time="500ms"/>${text.replace(/Webagentur/g, '<phoneme alphabet="ipa" ph="veˈb.aɡenˌtuːɐ̯">Webagentur</phoneme>')}</p>
      </speak>
    `;
  };

  const speak = (text: string) => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      isPaused.value = true;
      return;
    }

    if (synth.paused) {
      synth.resume();
      isPaused.value = false;
      return;
    }

    stop();

    utterance = new SpeechSynthesisUtterance();
    utterance.lang = "de-DE";
    utterance.rate = 1;
    utterance.pitch = 1;

    // **SSML als Speech Output setzen**
    utterance.text = formatSSML(text);

    utterance.onend = () => {
      isSpeaking.value = false;
      isPaused.value = false;
    };

    synth.speak(utterance);
    isSpeaking.value = true;
  };

  const stop = () => {
    synth.cancel();
    isSpeaking.value = false;
    isPaused.value = false;
  };

  return { speak, stop, isSpeaking, isPaused };
}
