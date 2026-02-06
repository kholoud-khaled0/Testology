import { Chapter } from "../types";

export const CHAPTER_5_PRACTICE: Chapter = {
  id: "genai-5-practice",
  title: "ISTQB CT-GenAI – Chapter 5 Practice",
  description: "Deploying and Integrating Generative AI in Test Organizations",
  icon: "Briefcase",
  questions: [

    {
      id: "5-1-1-1",
      code: "GenAI-5.1.1",
      kLevel: "K1",
      text: "What is the definition of shadow AI within an organization?",
      options: [
        "The use of AI to generate test cases for legacy systems.",
        "The use of GenAI tools or systems without formal approval or oversight.",
        "A strategy where AI models are trained in a dark (secure) environment.",
        "Deploying AI agents that operate without any human verification."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-1-2",
      code: "GenAI-5.1.1",
      kLevel: "K1",
      text: "Which is a primary risk associated with vague intellectual property in shadow AI?",
      options: [
        "The LLM failing to recognize Gherkin syntax.",
        "High energy consumption during off-peak hours.",
        "Exposure to disputes if copyrighted data is processed without authorization.",
        "The model's context window becoming too large."
      ],
      correctIndex: 2
    },
    {
      id: "5-1-1-3",
      code: "GenAI-5.1.1",
      kLevel: "K1",
      text: "How does shadow AI impact compliance and regulatory issues?",
      options: [
        "It guarantees compliance by using public models.",
        "It can lead to non-compliance and legal consequences.",
        "It reduces the need for GDPR.",
        "It improves transparency of AI decisions."
      ],
      correctIndex: 1
    },

    {
      id: "5-1-2-1",
      code: "GenAI-5.1.2",
      kLevel: "K2",
      text: "Why should an organization establish measurable test objectives in a GenAI strategy?",
      options: [
        "To ensure temperature is zero.",
        "To measure improvements in productivity, cycles, and quality.",
        "To prevent multimodal models.",
        "To eliminate human testers."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-2-2",
      code: "GenAI-5.1.2",
      kLevel: "K2",
      text: "What role does data quality play in a successful GenAI strategy?",
      options: [
        "Only relevant for training foundation models.",
        "Essential for trustworthy results.",
        "Minimizes licensing fees.",
        "Bypasses security audits."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-2-3",
      code: "GenAI-5.1.2",
      kLevel: "K2",
      text: "Which aspect of a GenAI strategy ensures ethical guidelines and transparency?",
      options: [
        "Selecting largest models.",
        "Implementing disclosure process guidelines.",
        "Using only open-source models.",
        "Avoiding prompt libraries."
      ],
      correctIndex: 1
    },

    {
      id: "5-1-3-1",
      code: "GenAI-5.1.3",
      kLevel: "K2",
      text: "Why is fine-tuning potential important when selecting a model?",
      options: [
        "Determines number of users.",
        "Allows adaptation with domain-specific data.",
        "Reduces CO2 emissions.",
        "Eliminates prompt engineering."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-3-2",
      code: "GenAI-5.1.3",
      kLevel: "K2",
      text: "What should be considered under recurring cost for LLM selection?",
      options: [
        "One-time hardware purchase.",
        "Licensing fees and operational expenses.",
        "Hiring a prompt engineer.",
        "Energy to charge a phone."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-3-3",
      code: "GenAI-5.1.3",
      kLevel: "K2",
      text: "How should model performance be evaluated for selection?",
      options: [
        "Using public NLP benchmarks only.",
        "Against organization-specific benchmarks.",
        "Choosing the most expensive model.",
        "Using the smallest context window."
      ],
      correctIndex: 1
    },

    {
      id: "5-1-4-1",
      code: "GenAI-5.1.4",
      kLevel: "K1",
      text: "What is the primary focus of the Discovery phase?",
      options: [
        "Full CI/CD integration.",
        "Awareness, capability building, and experimentation.",
        "Measuring ROI.",
        "Retiring legacy tools."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-4-2",
      code: "GenAI-5.1.4",
      kLevel: "K1",
      text: "Which activity is characteristic of the Initiation and usage definition phase?",
      options: [
        "Basic AI training.",
        "Identifying and prioritizing use cases and infrastructure.",
        "Automating all manual testing.",
        "Calculating CO2 emissions."
      ],
      correctIndex: 1
    },
    {
      id: "5-1-4-3",
      code: "GenAI-5.1.4",
      kLevel: "K1",
      text: "What defines the Utilization and iteration phase?",
      options: [
        "First stakeholder introduction.",
        "Full integration with continuous monitoring.",
        "Banning personal AI tools.",
        "Selecting one foundation model."
      ],
      correctIndex: 1
    },

    {
      id: "5-2-1-1",
      code: "GenAI-5.2.1",
      kLevel: "K2",
      text: "Beyond prompt engineering, what skill must testers develop?",
      options: [
        "Writing neural network code.",
        "Reviewing and evaluating AI-generated testware.",
        "Manually calculating vectors.",
        "Configuring GPU cooling."
      ],
      correctIndex: 1
    },
    {
      id: "5-2-1-2",
      code: "GenAI-5.2.1",
      kLevel: "K2",
      text: "What is a critical security practice for testers using LLMs?",
      options: [
        "Sharing full production data.",
        "Masking or sanitizing confidential data.",
        "Using zero-shot prompts only.",
        "Avoiding constraints."
      ],
      correctIndex: 1
    },
    {
      id: "5-2-1-3",
      code: "GenAI-5.2.1",
      kLevel: "K2",
      text: "How should testers consider environmental impact?",
      options: [
        "Always use the largest model.",
        "Optimize usage and select right-sized models.",
        "Print AI outputs.",
        "Use AI only in winter."
      ],
      correctIndex: 1
    },

    {
      id: "5-2-2-1",
      code: "GenAI-5.2.2",
      kLevel: "K1",
      text: "What is a Prompt Pattern?",
      options: [
        "A recurring LLM bug.",
        "A reusable template for effective prompts.",
        "Token frequency distribution.",
        "A security vulnerability."
      ],
      correctIndex: 1
    },
    {
      id: "5-2-2-2",
      code: "GenAI-5.2.2",
      kLevel: "K1",
      text: "How do Internal Communities of Practice support GenAI adoption?",
      options: [
        "Sharing prompt patterns and lessons learned.",
        "Paying licensing fees.",
        "Replacing management oversight.",
        "Focusing on manual regression."
      ],
      correctIndex: 0
    },
    {
      id: "5-2-2-3",
      code: "GenAI-5.2.2",
      kLevel: "K1",
      text: "Which training approach is emphasized for GenAI skills?",
      options: [
        "Purely theoretical learning.",
        "Hands-on practice with guided exercises.",
        "Waiting for the LLM to adapt.",
        "Outsourcing all prompting."
      ],
      correctIndex: 1
    },

    {
      id: "5-2-3-1",
      code: "GenAI-5.2.3",
      kLevel: "K1",
      text: "How does the tester role evolve in an AI-enabled organization?",
      options: [
        "Stops traditional testing.",
        "Becomes an AI-assisted specialist verifying outputs.",
        "Labels training data full-time.",
        "Becomes a developer."
      ],
      correctIndex: 1
    },
    {
      id: "5-2-3-2",
      code: "GenAI-5.2.3",
      kLevel: "K1",
      text: "What new responsibility is added to the Test Manager role?",
      options: [
        "Reviewing every token.",
        "Developing AI-based test strategy and governance.",
        "Writing all agent code.",
        "Supporting the LLM vendor."
      ],
      correctIndex: 1
    },
    {
      id: "5-2-3-3",
      code: "GenAI-5.2.3",
      kLevel: "K1",
      text: "What must a Test Manager oversee in a hybrid team?",
      options: [
        "Developers and analysts only.",
        "Manual and rule-based automation.",
        "Humans working with GenAI-powered agents.",
        "Remote and office workers."
      ],
      correctIndex: 2
    }

  ]
};
