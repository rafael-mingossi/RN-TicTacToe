import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "@contexts/settings-context";

type SoundType = "pop1" | "pop2" | "win" | "loss" | "draw";
const useSounds = () => {
  const { settings } = useSettings();
  ////SOUND CONTROL REFS
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const windSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const drawSoundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (sound: SoundType): Promise<void> => {
    const soundsMap = {
      pop1: popSoundRef,
      pop2: pop2SoundRef,
      win: windSoundRef,
      loss: lossSoundRef,
      draw: drawSoundRef,
    };

    try {
      const status = await soundsMap[sound].current?.getStatusAsync();
      status &&
        status.isLoaded &&
        settings?.sounds &&
        soundsMap[sound].current?.replayAsync();

      if (settings?.haptics) {
        switch (sound) {
          case "pop1":
          case "pop2":
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          case "win":
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            );
            break;
          case "loss":
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            );
            break;
          case "draw":
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            );
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const popSoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();
    const winSoundObject = new Audio.Sound();
    const lossSoundObject = new Audio.Sound();
    const drawSoundObject = new Audio.Sound();

    const loadSounds = async () => {
      await popSoundObject.loadAsync(require("@assets/play1.mp3"));
      popSoundRef.current = popSoundObject;
      await pop2SoundObject.loadAsync(require("@assets/play2.mp3"));
      pop2SoundRef.current = pop2SoundObject;
      await winSoundObject.loadAsync(require("@assets/win.mp3"));
      windSoundRef.current = winSoundObject;
      await lossSoundObject.loadAsync(require("@assets/lose.mp3"));
      lossSoundRef.current = lossSoundObject;
      await drawSoundObject.loadAsync(require("@assets/draw.mp3"));
      drawSoundRef.current = drawSoundObject;
    };

    loadSounds().then(() => {});
    return () => {
      popSoundObject && popSoundObject.unloadAsync();
      pop2SoundObject && pop2SoundObject.unloadAsync();
      winSoundObject && winSoundObject.unloadAsync();
      lossSoundObject && lossSoundObject.unloadAsync();
      drawSoundObject && drawSoundObject.unloadAsync();
    };
  }, []);

  return playSound;
};
export default useSounds;
