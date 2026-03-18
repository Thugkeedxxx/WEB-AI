// --- AI CHAT ---
async function sendChat(){
  const input=document.getElementById('chatInput').value;
  const output=document.getElementById('chatOutput');
  if(!input)return;
  output.innerText="Thinking...";

  try{
    const res=await fetch("/api/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:input})
    });
    const data=await res.json();
    let text=data.reply||"No response";

    output.innerText="";
    let i=0;
    function typeEffect(){
      if(i<text.length){
        output.innerText+=text.charAt(i);
        i++;
        setTimeout(typeEffect,15);
      }
    }
    typeEffect();
  }catch(err){
    output.innerText="Error contacting AI";
    console.error(err);
  }
}

// --- IMAGE GENERATOR ---
async function genImage(){
  const input=document.getElementById('imgInput').value;
  const output=document.getElementById('imgOutput');
  if(!input)return;
  output.src='';

  try{
    const res=await fetch("/api/image",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt:input})
    });
    const blob=await res.blob();
    output.src=URL.createObjectURL(blob);
  }catch(err){
    console.error(err);
    output.src='https://via.placeholder.com/300x200.png?text=Error';
  }
}

// --- BIO / TEXT GENERATOR ---
async function genText(){
  const input=document.getElementById('textInput').value;
  const output=document.getElementById('textOutput');
  if(!input)return;
  output.innerText="Thinking...";

  try{
    const res=await fetch("/api/text",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt:input})
    });
    const data=await res.json();
    output.innerText=data.result||"No result";
  }catch(err){
    console.error(err);
    output.innerText="Error generating text";
  }
}