export default function Header() {
    const models = ["llama3.1","Phi3","Mistral","Gemma2"]
    return (
        <>
            <nav className="p-4 bg-purple-500 flex space-x-6">
            <p className='text-6xl font-bold text-blue-800 p-4 my-2 text-center'>AiTalker</p>
            <div className="justify-end my-auto">
                <select className="px-4 py-2">
                    {
                        models.map((model)=>(
                            <option key={model}>
                                {model}
                            </option>
                        ))
                    }
                </select>
            </div>
            </nav>       
        </>
    )
}