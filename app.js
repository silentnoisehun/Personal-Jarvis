const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const speakbtn = document.querySelector("#speak");
const aitext = document.querySelector("#aiBox");
const userCommand = document.querySelector("#userCommand");
const userInput = document.querySelector("#textinput");
const inputSubmit = document.querySelector("#submit-btn");
const clearChat = document.querySelector("#clear-chat");

// speechRecognition setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// on start
recognition.onstart = function () {
  console.log("listening");
};

// // on end
// recognition.onend = function () {
//   console.log("stopped");
// };

function appendToDiv(type, message) {
  // Get the chat container
  const chatContainer = document.getElementById("ai-chat");

  // Create a new message div
  const messageDiv = document.createElement("div");
  messageDiv.style.marginBottom = "20px";
  messageDiv.style.padding = "12px";
  messageDiv.style.borderRadius = "1rem";
  messageDiv.style.maxWidth = "70%";
  messageDiv.style.wordWrap = "break-word";

  // Styling based on the type
  if (type === "user") {
    messageDiv.style.backgroundColor = " #111827";
    messageDiv.style.color = "white";
    messageDiv.style.fontSize = "1rem";
    messageDiv.style.borderRadius = "1rem";
    messageDiv.style.textAlign = "right";
    messageDiv.style.marginLeft = "auto"; // Align user messages to the right
  } else {
    messageDiv.style.backgroundColor = "#1f2937";
    messageDiv.style.fontSize = "1rem";
    messageDiv.style.color = "white";
    messageDiv.style.textAlign = "left";
    messageDiv.style.marginRight = "auto"; // Align AI messages to the left
  }

  // Set the message content
  messageDiv.textContent = message;

  // Append the message div to the chat container
  chatContainer.appendChild(messageDiv);

  // Automatically scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  let userdata = localStorage.getItem("jarvis-setup");
  console.log(userdata.name);
  let finalTranscript = transcript.toLowerCase();
  console.log(finalTranscript);
  if (finalTranscript.includes("hello jarvis")) {
    readOut("Hello Boss , I am here to help you");
  }
  if (finalTranscript.includes("open youtube")) {
    readOut("opening youtube boss");
    window.open("https://www.youtube.com/");
    return;
  }

  // search on youtube
  if (finalTranscript.includes("search on youtube")) {
    readOut("Searching boss");
    // Extract the command from the transcript
    let inputYoutube = finalTranscript.split("");
    inputYoutube.splice(0, 17);
    inputYoutube.pop();
    console.log(inputYoutube);

    inputYoutube = inputYoutube.join("").split(" ").join("+"); // Convert spaces to '+'
    console.log(inputYoutube);

    // Uncomment to open YouTube search in a new tab
    window.open(
      `https://www.youtube.com/results?search_query=${inputYoutube}`,
      "_blank"
    );
    return;
  }

  if (
    finalTranscript.includes("who is your boss") ||
    finalTranscript.includes("who developed you") ||
    finalTranscript.includes("Who is your master")
  ) {
    let res = " i am developed by shadil.  he is my boss";
    appendToDiv("user", finalTranscript);
    appendToDiv("ai", res);
    readOut(res);
    return;
  }

  if (finalTranscript.includes("shut up")) {
    stopSpeech();
    appendToDiv("user", finalTranscript);
    appendToDiv("ai", "Speech stopped");
    return;
  }

  if (
    finalTranscript.includes("hey jarvis introduce your master") ||
    finalTranscript.includes("hey jarvis introduce your developer") ||
    finalTranscript.includes("introduce your master") ||
    finalTranscript.includes("Who is your developer")
  ) {
    let res = `Hello! I am Jarvis, Shadil's personal assistant. Let me introduce the extraordinary mind behind my creation. Shadil is a talented individual from Bihar, India, currently pursuing a B.Tech in Computer Science at Galgotias University. His fascination with Artificial Intelligence and Machine Learning drives him to innovate and explore the limitless possibilities of technology. Shadil is not only a tech enthusiast but also a skilled communicator. He thrives in opportunities to speak and participate in programs where he can showcase his abilities and inspire others. His passion for learning and his knack for problem-solving make him a promising leader in the tech world. Get ready to witness his incredible journey! `;
    appendToDiv("user", finalTranscript);
    appendToDiv("ai", res);

    readOut(res);

    return;
  }

  if (finalTranscript.includes("open google")) {
    readOut("opening goggle boss");
    window.open("https://www.google.com/");
    return;
  }

  // GOOGLE SEARCH

  if (finalTranscript.includes("search for")) {
    readOut("here is your result ");
    let input = finalTranscript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split(" ").join("+");
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`);
    return;
  }
  if (
    finalTranscript.includes("hey jarvis open instagram") ||
    finalTranscript.includes("instagram")
  ) {
    readOut("opening instagram boss");
    window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`);
    return;
  }

  if (finalTranscript.includes("jarvis open twitter")) {
    readOut("opening twitter boss");
    window.open(`https://x.com/${JSON.parse(userdata).twitter}`);
    return;
  }

  if (
    finalTranscript.includes("open github") ||
    finalTranscript.includes("open guitar")
  ) {
    readOut("opening github boss");
    window.open(`https://github.com/${JSON.parse(userdata).github}`);
    return;
  }

  if (finalTranscript.includes("what is the weather today")) {
    readOut(weatherStatement);
  }

  if (finalTranscript.includes("what is the temperature today")) {
    readOut(weatherTemp);
  }

  if (
    finalTranscript.includes("hey jarvis please shut down") ||
    finalTranscript.includes("please shut down") ||
    finalTranscript.includes("Jarvis please shut up")
  ) {
    let res = "okay boss i am taking a nap";
    appendToDiv("user", finalTranscript);
    appendToDiv("ai", res);

    readOut(res);
    recognition.stop();
    return;
  }

  if (finalTranscript.includes("who is tausif")) {
    readOut("woh aek gandu hai");
  }

  // Example call
  callGeminiAPI(finalTranscript);
};

// gemmini ai integration

function callGeminiAPI(finalTranscript) {
  const API = "AIzaSyAWtFDRSmDcrq-TrHbAEMl1ieMJz1Z3Joc"; // Replace with your API key
  const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API}`;

  const request = new XMLHttpRequest();
  request.open("POST", api_url, true);

  // Set headers for JSON content
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {
    if (this.status === 200) {
      const apiResult = JSON.parse(this.responseText);
      console.log("API Result:", apiResult);

      if (
        apiResult.candidates &&
        apiResult.candidates[0].content.parts[0].text.replace(
          /\* \*\*(.*?)\*\*:/g,
          "<ul><li><strong>$1</strong>:</li></ul>",
          /\* /g,
          "<ul><li>",
          /\n/g,
          "<br><br>"
        )
      ) {
        let resultPart = apiResult.candidates[0].content.parts[0].text;

        // Post-process the response to preserve bullet points and spacing

        console.log(resultPart);
        appendToDiv("user", finalTranscript);
        appendToDiv("ai", resultPart);

        readOut(resultPart);
      } else {
        console.error("Unexpected API Response Structure");
      }
    } else {
      console.error(`Gemini API Error: ${this.status} - ${this.responseText}`);
    }
  };

  request.onerror = function () {
    console.error("Request failed.");
  };

  // Correct payload structure
  const requestData = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: finalTranscript,
          },
        ],
      },
    ],
  });

  // Send the request
  request.send(requestData);
}

const handleUserInput = () => {
  const userMessage = userInput.value;

  if (userMessage.trim() !== "") {
    appendToDiv("user", userMessage);
    userInput.value = "";
    callGeminiAPI(userMessage);
  }

  if (userMessage.includes("who is your developer")) {
    return "i am developed by shadil";
  }
};

inputSubmit.addEventListener("click", handleUserInput);

// Listen for Enter key press
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleUserInput();
  }
});

// sr for continous capturing voice
recognition.continuous = true;

startbtn.addEventListener("click", () => {
  recognition.start();
});

stopbtn.addEventListener("click", () => {
  recognition.stop();
});

let currentSpeech; // Define a global variable to reference the current speech

function readOut(message) {
  currentSpeech = new SpeechSynthesisUtterance();
  let allVoices = speechSynthesis.getVoices();

  if (allVoices.length === 0) {
    speechSynthesis.addEventListener("voiceschanged", () => {
      allVoices = speechSynthesis.getVoices();
      setAndSpeak(currentSpeech, allVoices, message);
    });
  } else {
    setAndSpeak(currentSpeech, allVoices, message);
  }
}

function setAndSpeak(speech, voices, message) {
  speech.voice = voices[12]; // Use a fallback if index 10 is not available
  speech.volume = 1;
  speech.rate = 0.9;

  const chunks = splitTextIntoSentences(message); // Use sentence-based chunking
  let chunkIndex = 0;

  function speakChunk() {
    if (chunkIndex < chunks.length) {
      speech.text = chunks[chunkIndex];
      speech.onend = () => {
        chunkIndex++;
        setTimeout(speakChunk, 100); // Adding a slight pause between chunks
      };
      window.speechSynthesis.speak(speech);
      console.log(`Speaking chunk: ${chunkIndex + 1}/${chunks.length}`);
    } else {
      console.log("Finished speaking all chunks");
    }
  }

  speakChunk(); // Start with the first chunk
  console.log("You are speaking");
}

function splitTextIntoSentences(text) {
  return text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text by sentence endings
}

function stopSpeech() {
  if (currentSpeech) {
    window.speechSynthesis.cancel(); // Stop the speech
    currentSpeech = null; // Clear the current speech reference
  }
}

speakbtn.addEventListener("click", () => {
  setTimeout(() => {
    readOut(" hello boss how are you");
  }, 500);
});

// to get responce from the gemini api using voice

function weather(location) {
  const weatherCount = document.querySelector(".temp").querySelectorAll("*");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=da910630414c14d238cb706c7898252b`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      weatherCount[0].textContent = `Location : ${data.name}`;
      weatherCount[1].textContent = `Country : ${data.sys.country}`;
      weatherCount[2].textContent = `Weather type: ${data.weather[0].main}`;

      weatherCount[3].textContent = `Weather description : ${data.weather[0].description}`;

      // weatherCount[4].scr = `https://openweathermap.org/img/wn/10d@2x.png`

      weatherCount[5].textContent = `Original Temperature: ${ktc(
        data.main.temp
      )}°C`;

      weatherCount[6].textContent = `Feels like: ${ktc(
        data.main.feels_like
      )}°C`;

      weatherCount[7].textContent = `Max Temp: ${ktc(data.main.temp_max)}°C`;

      weatherCount[8].textContent = `Min Temp: ${ktc(data.main.temp_min)}°C`;

      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.temp)}`;

      weatherTemp = `sir today temperature is ${ktc(data.main.temp)}`;

      console.log(data);
    } else {
      weatherCount[0].textContent = "Weather info not Found";
    }
  };
  // calling the api
  xhr.send();
}

// convertin kelvin into celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

clearChat.addEventListener("click", () => {
  let chatHistory = document.querySelector("#ai-chat");
  chatHistory.innerText = "";
});

const setup = document.querySelector(".jarvis-setup");
setup.style.display = "block";

// Check if localStorage has setup data
if (!localStorage.getItem("jarvis-setup")) {
  setup.style.display = "flex";
  setup.querySelector("button").addEventListener("click", userInfo);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelector("#name").value,
    bio: setup.querySelector("#bio").value,
    location: setup.querySelector("#location").value,
    instagram: setup.querySelector("#instagram").value,
    github: setup.querySelector("#github").value,
    twitter: setup.querySelector("#twitter").value,
  };

  console.log(setupInfo); // Output the value for verification

  let testArr = [];
  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut("Sir, please enter your complete information.");
  } else {
    // Save to localStorage
    localStorage.clear();
    localStorage.setItem("jarvis-setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis-setup")).location);

    // Call the weather function
    // const location = JSON.parse(localStorage.getItem("jarvis-setup")).location;
    // weather(location);
  }
}

weather("samastipur");
