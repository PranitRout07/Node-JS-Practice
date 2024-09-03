import express from 'express';
const app = express()
app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.get('/api/data',(req,res)=>{
    const data = [
        {
            Name:"pranit",
            Age:23,
            Roll:19
        },
        {
            Name:"raghav",
            Age:21,
            Roll:25
        },
        {
            Name:"pratik",
            Age:22,
            Roll:45
        },
        {
            Name:"sumit",
            Age:25,
            Roll:23
        },
        {
            Name:"Rahul",
            Age:29,
            Roll:12
        },
        {
            Name:"pratyush",
            Age:21,
            Roll:14
        },
        {
            Name:"Rohit",
            Age:27,
            Roll:58
        },
        {
            Name:"Sandip",
            Age:24,
            Roll:29
        },
        
        
    ]
    res.send(data)
})




app.listen(3000,()=>{
    console.log('Listening in port :3000...')
})

//In package.json we add type as module so that the code can use import statement
//