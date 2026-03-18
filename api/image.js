export default async function handler(req,res){
  const {prompt}=req.body;
  try{
    const response=await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method:"POST",
        headers:{
          Authorization:`Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({inputs:prompt})
      }
    );
    const data=await response.json();
    res.status(200).json({result:data[0]?.generated_text||"No result"});
  }catch(err){
    console.error(err);
    res.status(500).json({result:"Error generating text"});
  }
}