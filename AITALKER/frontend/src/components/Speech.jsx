import React, { useEffect, useState , useRef } from "react";
import axios from 'axios';
import io from 'socket.io-client'


function SpeechR(){

    const socket = io('http://localhost:4000')
    const [msg,setMsg] = useState('')
    let speech = new SpeechSynthesisUtterance();
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let r = new SpeechRecognition();
    const inputBox = document.getElementById('ta')
    const timeoutRef = useRef(null);
    const [voices,setVoices] = useState([])
    const [selectedValue,setSelectedValue] = useState(0)
    window.speechSynthesis.onvoiceschanged = () => {
        setVoices(window.speechSynthesis.getVoices());
    };



    useEffect(()=>{
        
        console.log("value is: ",selectedValue)
        speech.voice = voices[selectedValue];
        console.log(speech.voice);
        
    },[selectedValue])

    if(msg!==""){
            socket.on('ai_reply', async (message) => {
                console.log("Output Message:",message)
                speech.text = message;
                window.speechSynthesis.speak(speech);
                setMsg('')
            });
            
    }
    useEffect(() => {
        function sendMessage() {
            const message = inputBox.value;
            if (message.trim() !== "") {
                socket.emit('userStoppedTyping', message);
                console.log(`Message sent: ${message}`);
            }
        }
    
        ///////////////////
        const resetTimer = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            sendMessage();
          }, 2000); 
        };

        const handleUserActivity = () => {
          resetTimer();
        };
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('input', handleUserActivity);
        return () => {
          window.removeEventListener('keydown', handleUserActivity);
          window.removeEventListener('input', handleUserActivity);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };    
      }, [msg]);
    
      const handleChange = (e) => {
        setMsg(e.target.value)
      };
      ////////

    function speak(e){
        e.preventDefault();
        
        r.start();
        r.onresult = function(event){
            console.log(event)
            console.log(event.results[0][0]['transcript'])
            let msgFromSpeech = { target: { value: event.results[0][0]['transcript'] } };
            handleChange(msgFromSpeech)
        
        }
        
    }
    return (
        <>
        <div className="w-full h-full">
        <form >
            <textarea className="m-2 w-1/2 h-auto text-2xl" id='ta' placeholder="write you querry" value={msg} onChange={handleChange} />
            <br/>        
            <select onChange={(e)=>setSelectedValue(e.target.value)} value={selectedValue} className="m-4">
                {
                    voices.map((voice, index) => (
                        <option value={index} key={index}>
                            {voice.name}
                        </option>
                    ))
                }
            </select>
            <br/>
            
            
        </form>
        <button className="hover:bg-emerald-300" onClick={speak}>🗣️</button>
        </div>
        </>
    )

}

export default SpeechR

// {
//     let value = e.target.value
//     setMsg(value);
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(()=>{
//         setFinalMsg(value)
//         console.log(finalMsg)
//     },2000)
// }