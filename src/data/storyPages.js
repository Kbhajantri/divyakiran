export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || './';
  return baseUrl.endsWith('/') ? baseUrl + cleanPath : `${baseUrl}/${cleanPath}`;
};

export const STORY_PAGES = [
  {
    chapterNumber: 0,
    seasonInfo: "Cover Page",
    episodeTitle: "Cover Page",
    chapterTitle: "Our Story — Journey from 1st sem to forever",
    dateMeta: "Belagavi to Hubballi... Miles apart, heart close.",
    quote: "This is our story. ♡",
    exactImage: getAssetUrl("/assets/user_parchment_exact_cover.jpg")
  },
  {
    chapterNumber: 1,
    seasonInfo: "Season 1 — The Beginning",
    episodeTitle: "Episode 1",
    chapterTitle: "The First Time I Saw You",
    dateMeta: "August 2022 — First Semester, VTU Engineering College, Belagavi",
    quote: "Mine began on a normal college morning...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep1.jpg")
  },
  {
    chapterNumber: 2,
    seasonInfo: "Season 2 — The Waiting",
    episodeTitle: "Episode 2",
    chapterTitle: "Another Year, The Same Feeling",
    dateMeta: "Second Year, Engineering",
    quote: "Maybe today you'll be here...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep2.jpg")
  },
  {
    chapterNumber: 3,
    seasonInfo: "Season 3 — The First Words",
    episodeTitle: "Episode 3",
    chapterTitle: "From Silent Glances to Small Conversations",
    dateMeta: "Third Year — Fifth & Sixth Semester",
    quote: "Puri late prepare aytu, sir... canteen olage.",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep3.jpg")
  },
  {
    chapterNumber: 4,
    seasonInfo: "Season 4 — The Distance That Led Me to You",
    episodeTitle: "Episode 4 (Part 1)",
    chapterTitle: "Eight Months Without Seeing You",
    dateMeta: "Final Year — Seventh & Eighth Semester (Pages 1/4 & 2/4)",
    quote: "6 April 2026 – 7:57 PM",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep4_part1.jpg")
  },
  {
    chapterNumber: 5,
    seasonInfo: "Season 4 — The Distance That Led Me to You",
    episodeTitle: "Episode 4 (Part 2)",
    chapterTitle: "5 May 2026 & Farewell Regrets",
    dateMeta: "5 May 2026 – 10 May 2026 (Pages 3/4 & 4/4)",
    quote: "Every extra minute on the road meant one more minute with you...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep4_part2.jpg")
  },
  {
    chapterNumber: 6,
    seasonInfo: "Season 5 — The Days That Changed Everything",
    episodeTitle: "Episode 5 (Part 1)",
    chapterTitle: "Every Journey With You Became a Memory",
    dateMeta: "20 May 2026 – 21 May 2026 (Pages 1/4 & 2/4)",
    quote: "Even hours don't feel long when waiting for you...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep5_part1.jpg")
  },
  {
    chapterNumber: 7,
    seasonInfo: "Season 5 — The Days That Changed Everything",
    episodeTitle: "Episode 5 (Part 2)",
    chapterTitle: "Polar Bear, Tolanakere & Special Moments",
    dateMeta: "23 May 2026 – 24 May 2026 (Pages 3/4 & 4/4)",
    quote: "Watching the peaceful surroundings...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep5_part2.jpg")
  },
  {
    chapterNumber: 8,
    seasonInfo: "Season 6 — The Day I Almost Told You",
    episodeTitle: "Episode 6",
    chapterTitle: "One More Journey Before Everything Changed",
    dateMeta: "5 June 2026 (Pages 1/2 & 2/2)",
    quote: "Take a little piece of Belagavi with you...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep6.jpg")
  },
  {
    chapterNumber: 9,
    seasonInfo: "Season 7 — The Night That Changed Everything",
    episodeTitle: "Episode 7 (Part 1)",
    chapterTitle: "Before You Became Someone Else",
    dateMeta: "27 June 2026 – 28 June 2026 (Pages 1/6 & 2/6)",
    quote: "Before you become someone else's forever...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep7_part1.jpg")
  },
  {
    chapterNumber: 10,
    seasonInfo: "Season 7 — The Night That Changed Everything",
    episodeTitle: "Episode 7 (Part 2)",
    chapterTitle: "The Promise & The Answer",
    dateMeta: "28 June 2026 (Pages 3/6 & 4/6)",
    quote: "Yes. ❤️ My one-sided love story became our love story.",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep7_part2.jpg")
  },
  {
    chapterNumber: 11,
    seasonInfo: "Season 7 — The Epilogue",
    episodeTitle: "Epilogue",
    chapterTitle: "Happy Girlfriend's Day, Divya. ♡",
    dateMeta: "Epilogue (Pages 5/6 & 6/6)",
    quote: "I promise to keep choosing you...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep7_part3.jpg")
  },
  {
    chapterNumber: 12,
    seasonInfo: "Season 8 — Our First Date After \"Yes\" ❤️",
    episodeTitle: "Episode 8 (Part 1)",
    chapterTitle: "A Rainy Day I'll Never Forget",
    dateMeta: "6 July 2026 — 11:00 AM, CBT Belagavi",
    quote: "For me, 6 July 2026 was one of those days...",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep8_part1.jpg")
  },
  {
    chapterNumber: 13,
    seasonInfo: "Season 8 — Our First Date After \"Yes\" ❤️",
    episodeTitle: "Episode 8 (Part 2)",
    chapterTitle: "Burger King & Rajahansa Fort",
    dateMeta: "6 July 2026 — Belagavi to Fort",
    quote: "After four years of loving you silently... You were finally beside me. ❤️",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep8_part2.jpg")
  },
  {
    chapterNumber: 14,
    seasonInfo: "Season 8 — Our First Date After \"Yes\" ❤️",
    episodeTitle: "Episode 8 (Part 3)",
    chapterTitle: "Running Through the Rain Together",
    dateMeta: "6 July 2026 — Evening",
    quote: "Kiran... Neni beda mali valag... baa, jacket olage. ❤️",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep8_part3.jpg")
  },
  {
    chapterNumber: 15,
    seasonInfo: "Season 8 — Our First Date After \"Yes\" ❤️",
    episodeTitle: "Episode 8 (Part 4)",
    chapterTitle: "Abhi Na Jao Chhod Kar & The Hair Clip",
    dateMeta: "6 July 2026 — CBT Bus Stand",
    quote: "I'll give this hair clip back to you on the day I stand beside you at our wedding. ❤️",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep8_part4.jpg")
  },
  {
    chapterNumber: 16,
    seasonInfo: "Season 8 — Our First Date After \"Yes\" ❤️",
    episodeTitle: "Episode 8 (Part 5)",
    chapterTitle: "Yummy... 🍫 & The Snapchat Video",
    dateMeta: "6 July 2026 — 9:45 PM",
    quote: "6 July 2026 will always be one of the most beautiful days of my life. ❤️",
    exactImage: getAssetUrl("/assets/user_parchment_exact_ep8_part5.jpg")
  },
  {
    chapterNumber: 17,
    seasonInfo: "Finale",
    episodeTitle: "Final Chapter",
    chapterTitle: "The Best Chapter Is Still Being Written ❤️",
    dateMeta: "Forever Yours",
    quote: "Happy Girlfriend's Day, My Love ❤️",
    isFinale: true,
    paragraphs: [
      "This story doesn't end here.",
      "Every day with you becomes another beautiful page.",
      "And I promise... I'll keep writing our story forever."
    ]
  }
];
