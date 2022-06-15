import React from 'react';
import Chatbot from 'react-best-chatbot';
  
const steps = [
    {
      id: 1,
      content: "Hi, friend!",
      goTo: 2,
    },
    {
      id: 2,
      content: "How can we help you?",
      options: [
        {
          content: "Tips... 👌​​",
          value: 1,
          goTo: "tips",
        },
        {
          content: "seasonal sneakers 👟​​",
          value: 2,
          goTo: "season",
        },
        {
          content: "contact information ✍️​",
          value: 3,
          goTo: "contact",
        },
      ],
    },
    {
      id: "season",
      content: "It's autumn 🍂. We recommend warm shoes...",
      end: true,
    },
    {
      id: "tips",
      content: "temperate days ☀️​, going for a run is a good option 🏃‍♀️ ​🏃. Have you seen our running shoes? 👟​​",
      end: true,
    },
    {
      id: "contact",
      content: "email: bluebirdcommerce@gmail.com. You can also find us on the networks",
      end: true,
    },
  ];

const ChatbotBB = () => (
  <Chatbot steps={steps} />
);

export default ChatbotBB;