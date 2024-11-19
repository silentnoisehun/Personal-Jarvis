const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const speakbtn = document.querySelector("#speak");


// speechRecognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// on start
recognition.onstart = function() {
  console.log("listening");
};




// on end
recognition.onend = function(){
  console.log("stopped");
};

recognition.onresult =function (event){
   let current= event.resultIndex;
   let transcript = event.results[current][0].transcript;
   let finalTranscript = transcript.toLowerCase()
  console.log(finalTranscript)
  if(finalTranscript.includes("hello jarvis")){
    readOut("Hello Boss , I am here to help you")
  }
  if (finalTranscript.includes("open youtube")){
    readOut("opening youtube boss");
    window.open("https://www.youtube.com/");
  }

  // search on youtube 
  if (finalTranscript.includes("search on youtube")){
    readOut("Searching boss");
    // Extract the command from the transcript
    let inputYoutube= finalTranscript.split("");
    inputYoutube.splice(0,17)
    inputYoutube.pop();
    console.log(inputYoutube);
   
    inputYoutube = inputYoutube.join("").split(" ").join("+");// Convert spaces to '+'
    console.log(inputYoutube);

    // Uncomment to open YouTube search in a new tab
    window.open(`https://www.youtube.com/results?search_query=${inputYoutube}`, "_blank");
}


if (finalTranscript.includes("who is your boss") || finalTranscript.includes("who developed you")){
  readOut(" i am developed by shadil.  he is my boss")
};

if ( finalTranscript.includes("hey jarvis introduce your master") || finalTranscript.includes("hey jarvis introduce your developer")){
  readOut("Hello! I am Jarvis, Shadil's personal assistant. Let me introduce the extraordinary mind behind my creation. Shadil is a talented individual from Bihar, India, currently pursuing a B.Tech in Computer Science at Galgotias University. His fascination with Artificial Intelligence and Machine Learning drives him to innovate and explore the limitless possibilities of technology. Shadil is not only a tech enthusiast but also a skilled communicator. He thrives in opportunities to speak and participate in programs where he can showcase his abilities and inspire others. His passion for learning and his knack for problem-solving make him a promising leader in the tech world. Get ready to witness his incredible journey!")
}


  if (finalTranscript.includes("open google")){
    readOut("opening goggle boss");
    window.open("https://www.google.com/");
  }

  // GOOGLE SEARCH

  if (finalTranscript.includes("search for")){
    readOut("here is your result ");
    let input = finalTranscript.split("");
    input.splice(0,11);
    input.pop();
    input = input.join("").split(" ").join("+");
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`)
  }
  if (finalTranscript.includes("open instagram")){
    readOut("opening instagram boss");
    window.open("https://www.instagram.com/");
  }

  if (finalTranscript.includes("open github")){
    readOut("opening github boss");
    window.open("https://github.com/login");
  }
};

// sr for continous capturing voice

// recognition.continuous = true;

startbtn.addEventListener("click", () => {
  recognition.start()
});

stopbtn.addEventListener("click", () => {
  recognition.stop()
});


function readOut (message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices()
  speech.voice = allVoices[4];
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech)
  console.log(" you are speaking")

};


  speakbtn.addEventListener("click",() => {
    readOut("     hey how are you")
 
});


function weather(location){
  const weatherCount = document.querySelector(".temp").querySelectorAll("*");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=da910630414c14d238cb706c7898252b`

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url , true);
  xhr.onload = function() {
    if (this.status === 200){
      let data = JSON.parse(this.responseText);
      weatherCount[0].textContent = `Location : ${data.name}`;
      console.log(data)
    }
  }
// calling the api
  xhr.send();
}


weather("patna");
