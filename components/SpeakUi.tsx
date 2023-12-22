/* eslint-disable no-unused-vars */
"use client";

import { toast } from "@/components/ui/use-toast";
// import { deleteChat } from "@/lib/actions/chat.action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { deleteChat } from "@/lib/actions/chat.action";

type Chats = { role: string; content: string }[];

const SpeakUi = ({ user, code }: { user: string; code?: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chats>([]);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>(null);
  useEffect(() => {
    const speech = window.speechSynthesis;
    const filterVoiceIndexes = [0, 1, 2]; // Specify the indexes of the voices you want to include
    const updateVoices = () => {
      const allVoices = speech.getVoices();
      const filteredVoices = filterVoiceIndexes.map(
        (index) => allVoices[index],
      );
      setVoices(filteredVoices);
    };

    if (speech.onvoiceschanged !== undefined) {
      speech.onvoiceschanged = updateVoices;
    }

    updateVoices(); // Call initially to set the voices
  }, []);

  // eslint-disable-next-line new-cap
  const recognition =
    typeof window !== "undefined"
      ? new (window as any).webkitSpeechRecognition()
      : null;

  const startVoiceRecognition = () => {
    recognition.lang = "en-US"; // Correct language code
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    if (!code)
      return toast({
        title: "Please Enter a Code to use the app.",
        variant: "destructive",
      });
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      handleSendMessage(transcript, "");
      recognition.stop();
    };
    recognition.onerror = (event: any) => {
      console.error("Recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      toast({
        title: "Message Sent Successfully ",
      });
      setIsListening(false);
    };
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (isListening) {
      setIsListening(false);
      recognition.stop();
    }
  };
  const handleSendMessage = async (userMessage: string, botMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, user }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      setMessage("");

      const data = await response.json();
      const assistantResponse = data.choices[0]?.message?.content;
      speakResponse(assistantResponse);

      setChats((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userMessage },
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const speakResponse = (response: string) => {
    const speech = new SpeechSynthesisUtterance(response);
    setIsSpeaking(true);
    speech.lang = "en-US"; // Updated to use correct language code
    speech.text = response;
    speech.voice = voice;
    speech.rate = 1;
    speechSynthesis.speak(speech);

    // Store the SpeechSynthesisUtterance object in a state variable

    speech.onend = () => {
      setIsSpeaking(false);
      startVoiceRecognition();
    };
  };
  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handledeleteChat = async () => {
    try {
      await deleteChat({ userId: user });
      setChats([]);
      return toast({
        title: "New Conversation Started",
        variant: "destructive",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={`relative mb-5 mx-0`}>
        <Select
          onValueChange={(value) => setVoice(value)}
          defaultValue={voices[0] || undefined}
        >
          <SelectTrigger
            className={` body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className="line-clamp-1">
              <SelectValue placeholder="select a Voice" />
            </div>
          </SelectTrigger>
          <SelectContent className="text-gray-500 border-none bg-slate-50">
            <SelectGroup className="text-light400_light500">
              <SelectLabel>Voices</SelectLabel>

              {voices.map((voice: any) => (
                <SelectItem
                  key={voice?.name}
                  value={voice}
                  className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-300"
                >
                  {voice?.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`text-4xl font-black text-white flex min-h-[10rem] min-w-[10rem] md:h-40 md:w-40 lg:h-52 lg:w-52 ${
          isSpeaking ? "animate-spin" : ""
        } cursor-pointer items-center justify-center rounded-full border-2 shadow-xl transition-all hover:scale-105 dark:shadow-dark-200`}
        onClick={() => startVoiceRecognition()}
      >
        Speak
      </div>
      {isListening && (
        <p className="h3-bold mt-5 animate-pulse text-green-400 ">
          Ai is Listing
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-5 p-5 mt-10  ">
        <Button
          className={`dark-gradient border-2 border-red-400 ${
            isListening ? "" : "hidden"
          } text-red-400`}
          onClick={() => stopListening()}
        >
          End Conversation
        </Button>
        <Button
          className={`dark-gradient border-2 border-red-400 ${
            isSpeaking ? "" : "hidden"
          } text-red-400`}
          onClick={() => stopSpeaking()}
        >
          Shut Up
        </Button>

        <Button
          className="dark-gradient border-2 border-green-400 text-green-400"
          onClick={() => handledeleteChat()}
        >
          New Conversation
        </Button>
      </div>
    </>
  );
};

export default SpeakUi;
