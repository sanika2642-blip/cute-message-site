const splash = document.getElementById('splash');
const startBtn = document.getElementById('startBtn');
const mainContent = document.getElementById('mainContent');
const messageDiv = document.getElementById('message');
const messageImg = document.getElementById('messageImg');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const newBtn = document.getElementById('newBtn');
const heartParticles = document.getElementById('heartParticles');
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

// Typing animation, high contrast
function typeMessage(text) {
  messageDiv.innerHTML = `<span class="typing" style="color:#2E3A59;">${text}</span>`;
  setTimeout(() => {
    const span = messageDiv.querySelector('.typing');
    if(span) span.style.borderRight = 'none';
  }, 2000);
}

startBtn.addEventListener('click', () => {
  splash.style.display = 'none';
  mainContent.style.display = 'block';
  typeMessage(messages[0]);
  messageImg.classList.remove("hide-img");
});

nextBtn.addEventListener('click', () => {
  step++;
  if (step < messages.length) {
    typeMessage(messages[step]);
    messageImg.classList.remove("hide-img");
    if (step < 3) {
      messageImg.style.opacity = 0;
      setTimeout(() => {
        messageImg.src = images[step];
        messageImg.style.opacity = 1;
      }, 350);
    }
  }
  if (step === messages.length - 1) {
    nextBtn.style.display = 'none';
    yesBtn.style.display = 'inline';
    noBtn.style.display = 'inline';
  }
});

yesBtn.addEventListener('click', () => {
  typeMessage("aww! you made my heart happy 💗");
  releaseHearts(); 
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  newBtn.style.display = 'inline';
  messageImg.classList.remove("hide-img");
});

noBtn.addEventListener('click', () => {
  // Show goodbye message with the "4th" image, no hearts!
  typeMessage("Goodbye! 👋<br><span style='font-size:1.2em;'>Hope you will change your mindsoon.</span>");
  messageImg.src = "images/4th.jpg";
  messageImg.classList.remove("hide-img");
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
  // No releaseHearts() or heart splash here!
});


newBtn.addEventListener('click', () => {
  typeMessage("ohh you said yes! 💖 Sending you a virtual hug 🫂");
  messageImg.style.opacity = 0;
  setTimeout(() => {
    messageImg.src = "images/6th.jpg";
    messageImg.style.opacity = 1;
    messageImg.classList.remove("hide-img");
  }, 300);
  newBtn.style.display = 'none';
  document.getElementById('replySection').style.display = 'block';
  replyInput.focus();
});

sendBtn.addEventListener('click', () => {
  const replyText = replyInput.value.trim();
  if (replyText !== "") {
    document.getElementById('replySection').style.display = 'none';
    thankYou.style.display = 'block';
    userReply.textContent = `You said: "${replyText}" 💕`;
    userReply.style.display = 'block';
    setTimeout(() => {
      typeMessage("Bye for now 💌 Text me soon, okay?");
      thankYou.style.display = 'none';
      userReply.style.display = 'none';
    }, 2000);
  }
});

function releaseHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

// Keyboard accessibility for all buttons
document.addEventListener('keydown', function(event) {
  if (event.key === "Enter" && document.activeElement === startBtn) startBtn.click();
  if (event.key === "Enter" && document.activeElement === nextBtn) nextBtn.click();
  if (event.key === "Enter" && document.activeElement === yesBtn) yesBtn.click();
  if (event.key === "Enter" && document.activeElement === noBtn) noBtn.click();
  if (event.key === "Enter" && document.activeElement === newBtn) newBtn.click();
  if (event.key === "Enter" && document.activeElement === sendBtn) sendBtn.click();
});
