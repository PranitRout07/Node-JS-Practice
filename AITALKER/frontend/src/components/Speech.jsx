import React, { useEffect, useState } from "react";
import axios from 'axios';


function SpeechR(){

    const [msg,setMsg] = useState('')
    const [resp,setResp] = useState('')
    let speech = new SpeechSynthesisUtterance();
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let r = new SpeechRecognition();

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

    function btnclicked(e){
        e.preventDefault()
        if(msg===""){
            speech.text = "Please don't give an empty prompt or querry."
            window.speechSynthesis.speak(speech)
            console.log("Please don't give an empty prompt or querry.")
            return
        }else{
            //ai call http://localhost:4000/resp/ai
            axios.post('/resp/ai', {
                "message": msg,
              })
              .then((response) =>{
                speech.text = response.data;
                setResp(response.data)
                window.speechSynthesis.speak(speech);

              })
              .catch((error)=> {
                console.log(error);
              });
            // speech.text = msg
            // window.speechSynthesis.speak(speech)
            // setMsg('')
        }
    }
    function speak(e){
        e.preventDefault();
        r.start();
        r.onresult = function(event){
            // console.log(event)
            // console.log(event.results[0][0]['transcript'])
            setMsg(event.results[0][0]['transcript'])
        
        }
        
    }
    return (
        <>
        <div className="w-full h-full">
        <form onSubmit={btnclicked}>
            <textarea className="m-2 w-1/2 h-auto text-2xl" placeholder="write you querry" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
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
            <button className="bg-lime-200 hover:bg-emerald-300 text-2xl p-2 rounded-2xl font-bold text-center m-2" type="submit">Answer</button>
            
        </form>
        <button className="hover:bg-emerald-300" onClick={speak}>🗣️</button>


        <div>
                {resp}
        </div>
        </div>
        </>
    )

}

export default SpeechR