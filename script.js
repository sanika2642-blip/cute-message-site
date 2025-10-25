// Message content and images
const splash = document.getElementById('splash');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const messageDiv = document.getElementById('message');
const typingSpan = document.getElementById('typing');
const cursorSpan = document.getElementById('cursor');
const messageImg = document.getElementById('messageImg');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const newBtn = document.getElementById('newBtn');
const floatingHearts = document.getElementById('floatingHearts');
const replyInput = document.getElementById('replyInput');
const sendBtn = document.getElementById('sendBtn');
const thankYou = document.getElementById('thankYou');
const userReply = document.getElementById('userReply');

const messages = [
  "🐼",
  "Hey, I want to tell you something 👉🏻👈🏻",
  "I missed you a lot! 🥺",
  "Do you even love me?! 🌟"
];
const images = [
  "images/1st.jpg",
  "images/2nd.jpg",
  "images/3rd.jpg",
  "images/3rd.jpg"
];
let step = 0;

function showTypingEffect(text, callback) {
  typingSpan.textContent = '';
  let idx = 0;
  cursorSpan.style.display = "inline";
  function type() {
    if (idx <= text.length) {
      typingSpan.textContent = text.slice(0, idx);
      idx++;
      setTimeout(type, 55); // speed of typing
    } else {
      cursorSpan.style.display = "none";
      if (callback) callback();
    }
  }
  type();
}

startBtn.addEventListener('click', () => {
  splash.style.display = 'none';
  mainContent.style.display = 'block';
  showTypingEffect(messages[0]);
});

nextBtn.addEventListener('click', () => {
  step++;
  if (step < messages.length) {
    showTypingEffect(messages[step]);
    if (step < 3) {
      messageImg.style.opacity = 0;
      setTimeout(() => {
        messageImg.src = images[step];
        messageImg.style.opacity = 1;
      }, 300);
    }
  }
  if (step === messages.length-1) {
    nextBtn.style.display = 'none';
    yesBtn.style.display = 'inline';
    noBtn.style.display = 'inline';
  }
});

yesBtn.addEventListener('click', () => {
  showTypingEffect("Then No text? 🙄");
  messageImg.style.opacity = 0;
  setTimeout(() => {
    messageImg.src = "images/5th.jpg";
    messageImg.style.opacity = 1;
  }, 300);
  makeFloatingHearts();
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  newBtn.style.display = 'inline';
});

noBtn.addEventListener('click', () => {
  showTypingEffect("Goodbye! 👋");
  messageImg.src = "images/4th.jpg";
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
});

newBtn.addEventListener('click', () => {
  showTypingEffect("ohh you said yes! 💖 Sending you a virtual hug 🫂");
  messageImg.style.opacity = 0;
  setTimeout(() => {
    messageImg.src = "images/6th.jpg";
    messageImg.style.opacity = 1;
  }, 300);
  newBtn.style.display = 'none';
  document.getElementById('replySection').style.display = 'block';
  setTimeout(() => { replyInput.focus(); }, 350);
});

sendBtn.addEventListener('click', () => {
  const replyText = replyInput.value.trim();
  if (replyText !== "") {
    document.getElementById('replySection').style.display = 'none';
    thankYou.style.display = 'block';
    userReply.textContent = `You said: "${replyText}" 💕`;
    userReply.style.display = 'block';
    setTimeout(() => {
      showTypingEffect("Bye for now 💌 Text me soon, okay?");
    }, 1200);
  }
});

function makeFloatingHearts() {
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = ["💖","💗","💘","💝"][Math.floor(Math.random() * 4)];
    heart.style.left = (10 + Math.random()*80) + "vw";
    heart.style.bottom = 0;
    heart.style.fontSize = (24 + Math.random()*18) + "px";
    heart.style.opacity = Math.random()*0.9+0.1;
    floatingHearts.appendChild(heart);
    setTimeout(() => { if (floatingHearts.contains(heart)) floatingHearts.removeChild(heart); }, 2200);
  }
}
