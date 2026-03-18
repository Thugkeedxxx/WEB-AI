export default async function handler(req,res){
  const {message}=req.body;
  try{
    const response=await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        method:"POST",
        headers:{
          Authorization:`Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({inputs:message})
      }
    );
    const data=await response.json();
    res.status(200).json({reply:data[0]?.generated_text||"No response"});
  }catch(err){
    console.error(err);
    res.status(500).json({reply:"Error contacting AI"});
  }
}
