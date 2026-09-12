export type PlayItem = {
  title: string;
  tags: string[];
  desc: string;
  image: string;
};

export const playground: PlayItem[] = [
  {
    title: "Tabi",
    tags: ["Cursor Manila Build Night", "Local demo"],
    desc: "Flag a taxi that’s already coming your way. White taxis already cruise the roadside; Tabi only makes street hail visible — commuters signal, drivers only see people ahead on their heading.",
    image: "/playground/sakay.png",
  },
  {
    title: "Form Auto Eval",
    tags: ["Chrome extension", "Autofill"],
    desc: "Detect the submit button, then write one 1–5 rating across the longest consecutive run of selects. Autofill stays locked until the selector matches the page.",
    image: "/playground/faculty-auto-eval.jpg",
  },
  {
    title: "Canvas Cards",
    tags: ["Chrome extension", "Quizlet"],
    desc: "Scrape a classic Canvas quiz into text Quizlet’s Import can turn into a study set. Capture across a session, copy the formatted cards, paste.",
    image: "/playground/canvas-cards.jpg",
  },
  {
    title: "Syscall Snake",
    tags: ["NASM", "x86-64"],
    desc: "Snake, done in full assembly. An exercise to understand low-level programming — registers, syscalls, and what the machine is actually doing.",
    image: "/playground/syscall-snake.jpg",
  },
  {
    title: "Studio Rig",
    tags: ["Roblox Studio", "Lua"],
    desc: "Roblox Studio notes: script the input in Lua, keyframe the rig. An experiment in making a character move.",
    image: "/playground/studio-rig.jpg",
  },
];
