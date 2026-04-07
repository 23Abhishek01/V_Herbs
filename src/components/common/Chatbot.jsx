import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// slice reducers
import { setChats } from '../../slices/chatbotSlice'; 

// components
import useComponentVisible from '../../hooks/useComponentVisible';

// importing chatting loading css
import './loader.css';

// icons
import { IoChatboxSharp } from "react-icons/io5";
import { RiGeminiLine } from "react-icons/ri";
import { IoMdClose, IoMdSend } from "react-icons/io";

// APIs
import { sendMessageToBot } from '../../services/operations/chatBotAPIs';

// 😥😥😥 BUG: on first render both chatbox and dashboard options are opening on opening any one 😥😥😥 

const ChatBox = ({ref, setIsComponentVisible, inputText, setInputText, chats, setChats}) => {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const chatBoxRef = useRef(null);

    // calls chatbot API
    const handleSendMessage = async () => {
        const query = inputText.trim();
        // if empty input
        if(query.length === 0) {
            return;
        }

        // add user message to chats
        let updatedChats = [...chats, {role: 'user', content:query}];
        dispatch(setChats(updatedChats));

        // reset input box
        setInputText('');

        // create loader for chatbot response
        setLoading(true);

        // call API
        const response = await sendMessageToBot(inputText);

        // update chats and disable loading
        if(response) {
            updatedChats = [...updatedChats, {role: 'bot', content:response}];
            dispatch(setChats(updatedChats));
            setLoading(false);
        }
    }

    // auto scroll chatbox to bottom to display latest chat
    useEffect(() => {
        chatBoxRef.current.scrollTop += chatBoxRef.current.scrollHeight;
    }, [chats]);

    return (
        <div 
            ref={ref}
            className='rounded-lg w-[300px] sm:w-[330px] md:w-[350px] overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
        >
            {/* bot name and close button */}
            <div className='bg-sky-400 px-4 py-6 flex justify-between items-center'>
                <p className='select-none text-white text-xl font-bold tracking-widest'>AyuAI</p>
                
                {/* close button */}
                <button 
                    onClick={() => setIsComponentVisible(false)}
                    className='hover:scale-[1.2] transition-all duration-300 cursor-pointer text-white'
                >
                    <IoMdClose size={25}/>
                </button>
            </div>

            
            {/* message container */}
            <div 
                ref={chatBoxRef} 
                className='h-[350px] overflow-auto scroll-smooth p-4 text-[#06132B] bg-white flex flex-col gap-2'
            >
                {/* default bot messages */}
                <div className='flex flex-col items-start gap-2'>
                    <p className='bg-[#ebecf1] p-2 rounded-lg max-w-[80%]'>
                        Hi 👋  I'm AyuAI, a bot working for VHerbs 🤖
                    </p>

                    <p className='bg-[#ebecf1] p-2 rounded-lg max-w-[80%]'>
                        For urgent issues, you can email us at {" "}
                        <a 
                            href='mailto:annuragdabral100200@gmail.com'
                            className='text-blue-200 underline decoration-1 underline-offset-2'
                        >
                            
                            ouremail@gmail.com
                        </a>
                    </p>
                </div>
                
                {/* conversation messages */}
                <div className='flex flex-col gap-2'>
                    {/* sample conversation */}
                    {
                        chats && chats.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex
                                    ${chat.role === 'user' ? 'mt-4 justify-end' 
                                    : 'justify-start'}
                                `}
                            >
                                <p className='bg-[#ebecf1] p-2 rounded-lg max-w-[80%]'>
                                    {chat.content}
                                </p>
                            </div>
                        ))
                    }

                    {/* bot typing animation loader */}
                    {
                        loading && <div className='loader2'></div>
                    }
                </div>

            </div>

            {/* input box */}
            <div className='p-4 bg-white'>
                {/* input and send button */}
                <div className='flex justify-between border-t-[#c7c7c7] border-t-[1px]'>
                    {/* input */}
                    <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        rows='3'
                        placeholder='Enter your message...'
                        className='mt-4 outline-none w-full [&::-webkit-scrollbar]:w-0 resize-none'
                    />

                    {/* send button */}
                    <button 
                        className='mt-4 p-3 h-fit rounded-full hover:bg-[#c1e6fd] transition-all duration-300 cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage();
                        }}
                    >
                        {
                            loading ? <div className='loader3 -mt-2'></div> 
                            : <IoMdSend size={20} fill='#0566FF'/>
                        }
                    </button>
                </div>

                {/* powered by gemini */}
                <div className='opacity-55 select-none'>
                    <p className='text-sm flex items-center justify-center text-richblack-600'>
                        Powered by  
                        <span className='mx-1'><RiGeminiLine size={16}/></span>
                        Gemini
                    </p>
                </div>
            </div>
        </div>
    )
}


const Chatbot = () => {

    const {chats} = useSelector((state) => state.chatbot);
    const dispatch = useDispatch();

    const [inputText, setInputText] = useState('');
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    // fetch previous chats from local storage on first render
    useEffect(() => {
        let previousChats = [];
        if(localStorage.getItem('chats')) {
            previousChats = JSON.parse(localStorage.getItem('chats'));
        }

        dispatch(setChats(previousChats));
    }, []);

  return (

    <div className='z-50'>
        {/* dispaly chatbot container button */}
        <button 
            ref={ref}
            onClick={(e) => {
                e.stopPropagation();
                setIsComponentVisible(true)
            }}
            className={`${!isComponentVisible ? 'flex' : 'hidden'}
            w-16 h-16 rounded-full bg-[#31A354] items-center justify-center text-white cursor-pointer hover:scale-110 transition-all duration-300`}
        >
            <IoChatboxSharp size={25} />
        </button>
        
        {/* chatbot container */}
        {
            isComponentVisible && (
                <ChatBox
                    ref={ref}
                    setIsComponentVisible={setIsComponentVisible}
                    inputText={inputText}
                    setInputText={setInputText}
                    chats={chats}
                    setChats={setChats}
                />
            )
        }
    </div>
  )
}

export default Chatbot