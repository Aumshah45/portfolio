export interface QA {
  q: string;
  /** Answer copy; segments wrapped in *asterisks* render as Garamond italic. */
  a: string;
}

export const intermission: QA[] = [
  {
    q: 'What kind of project makes you say yes immediately?',
    a: "An internal tool that started as a clever hack and nobody wants to touch anymore. A dashboard a small team keeps wishing existed. An AI workflow where the real problem is *messy data*, not the model. If there's a real user with a real complaint at the other end, I'm in.",
  },
  {
    q: 'Can you actually do AI/ML, or is it résumé decoration?',
    a: "I built a production agentic pipeline for absence claims at Sun Life and published research on IoT botnet detection at the 15th ICCCNT. So, yes. But I won't pitch you AI if your problem is a button in the wrong place. *Most AI features should be a well-designed form.*",
  },
  {
    q: 'What did you actually own, versus what was handed to you?',
    a: 'The Copilot platform was mine end to end: six weeks, solo, schema to deploy. The claims system I architected and built alongside the trainees I mentored. On the document platform I owned the entire backend implementation, built to an architecture someone else designed. *Happy to go line by line on any of them.*',
  },
  {
    q: 'What are you looking for next?',
    a: 'A team shipping AI into a real product, where I own something end-to-end, backend through deployment. Full-stack or AI engineering, Bengaluru or remote. I care more about the problem and the people reviewing my code than the logo on the door.',
  },
  {
    q: 'Why leave Sun Life?',
    a: "Nothing dramatic. Two good years: I shipped real things, got recognised for them, and learned how a large regulated organisation works. But I've built the same shape of thing a few times now, and I want to be somewhere the AI work *is* the product, not a project inside it.",
  },
];

export const intermissionClose = {
  line: 'Anything else? Ask. Worst case I say no, or send you to someone better.',
  sig: 'aum, by email, usually within a day',
};
