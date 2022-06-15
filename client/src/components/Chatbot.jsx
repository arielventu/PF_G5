import ChatBot from 'react-best-chatbot';
import style from './Chatbot.module.css';
// import  { ThemeProvider } from 'styled-components';


export default function ChatBotBB (){

    // const theme = {
    //     background: '#f5f8fb',
    //     fontFamily: 'Koulen',
    //     headerBgColor: 'rgb(23, 74, 105)',
    //     headerFontColor: '#fff',
    //     headerFontSize: '15px',
    //     botBubbleColor: 'rgb(23, 74, 105)',
    //     botFontColor: '#fff',
    //     userBubbleColor: '#fff',
    //     userFontColor: '#4a4a4a',
    //     height: '200px',
    //   };
    const config = {
      width: "300px",
      height: "400px",
      floating: true
  };
  
  const steps = [
    {
      id: 1,
      content: "Hi, human!",
      goTo: 2,
    },
    {
      id: 2,
      content: "Which animal is my favourite?",
      options: [
        {
          content: "Cat 🐱",
          value: 1,
          goTo: "error",
        },
        {
          content: "Dog 🐶",
          value: 2,
          goTo: 3,
        },
        {
          content: "Bear 🐻",
          value: 3,
          goTo: "error",
        },
      ],
    },
    {
      id: "error",
      content: "You're wrong! Try again...",
      goTo: 2,
    },
    {
      id: 3,
      content: "Wow! You're good! I give up...",
      goTo: 4,
    },
    {
      id: 4,
      content: "Bye!",
      end: true,
    },
  ];
    
return (
  //<ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
  // </ThemeProvider>
  )
}