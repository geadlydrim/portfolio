export type PlayItem = {
  title: string;
  tags: string[];
  desc: string;
  image: string;
};

export const playground: PlayItem[] = [
  {
    title: "Tabi",
    tags: ["Sakay", "Local demo"],
    desc: "Flag a taxi that’s already coming your way. White taxis already cruise the roadside; Tabi only makes street hail visible — commuters signal, drivers only see people ahead on their heading.",
    image: "/playground/sakay.png",
  },
  // Hidden for now — restore when more studies land.
  // {
  //   title: "Ribbon field",
  //   tags: ["Three", "Shader"],
  //   desc: "A slow cloth of light, driven by a handful of sine fields.",
  //   image:
  //     "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb8?auto=format&fit=crop&w=1400&q=80",
  // },
  // {
  //   title: "Type as object",
  //   tags: ["Motion", "Type"],
  //   desc: "Letters that remember they used to be buildings.",
  //   image:
  //     "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
  // },
  // {
  //   title: "Night orchard",
  //   tags: ["3D", "Colour"],
  //   desc: "A colour study for a product that never shipped. Still my favourite.",
  //   image:
  //     "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80",
  // },
  // {
  //   title: "Paper orbit",
  //   tags: ["CSS", "Loop"],
  //   desc: "A paper plane that never quite lands.",
  //   image:
  //     "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1400&q=80",
  // },
  // {
  //   title: "Soft machine",
  //   tags: ["UI", "Prototype"],
  //   desc: "A keyboard that answers before you finish the sentence.",
  //   image:
  //     "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=1400&q=80",
  // },
];
