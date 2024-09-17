import { Ollama } from "@langchain/ollama";
import express  from 'express'

const app = express()
const port = 4000
app.use(express.json())

const llm = new Ollama({
    model: "llama3.1", // Default value
    temperature: 0,
    maxRetries: 2,
      baseUrl: "http://localhost:11434",
  });

app.post('/resp/ai',async(req,res)=>{
    console.log(req.body.message)
    
    const inputText = req.body.message+"Explain within 30 words";
    const completion = await llm.invoke(inputText);
    console.log(completion)
    // console.log(completion)
    completion;
    res.send(completion)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })