export default async function handler(req,res){
  const {prompt}=req.body;
  try{
    const response=await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method:"POST",
        headers:{
          Authorization:`Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({inputs:prompt})
      }
    );
    const buffer=await response.arrayBuffer();
    res.setHeader("Content-Type","image/png");
    res.send(Buffer.from(buffer));
  }catch(err){
    console.error(err);
    res.status(500).send("Error generating image");
  }
}