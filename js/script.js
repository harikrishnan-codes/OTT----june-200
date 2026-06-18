window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.transition = "opacity 0.5s ease";
    preloader.style.opacity = "0";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);

  }, 3000); // 3 seconds

});



  /* SCROLL EFFECT */
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

    /* MOBILE MENU */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });


let isSignup = false;

/* OPEN */
function openLogin(){
  document.getElementById("loginModal").style.display = "flex";
  isSignup = false;
  updateForm();
}

/* CLOSE */
function closeLogin(){
  document.getElementById("loginModal").style.display = "none";
}

/* SWITCH LOGIN/SIGNUP */
function toggleAuth(){
  isSignup = !isSignup;
  updateForm();
}

/* UPDATE FORM */
function updateForm(){

  document.getElementById("formTitle").innerText =
    isSignup ? "Create Your OTT Account" : "Welcome Back";

  document.getElementById("formSubtitle").innerText =
    isSignup 
    ? "Sign up and enjoy unlimited streaming"
    : "Login to continue watching your favorite movies & shows";

  document.getElementById("submitBtn").innerText =
    isSignup ? "Create Account" : "Login to Dashboard";

  document.getElementById("switchText").innerText =
    isSignup ? "Already have an account?" : "Don't have an account?";

  document.querySelector(".switch-text a").innerText =
    isSignup ? "Login" : "Sign up";

  document.getElementById("fullName").style.display =
    isSignup ? "block" : "none";

  document.getElementById("confirmPassword").style.display =
    isSignup ? "block" : "none";

  document.getElementById("loginRoleBox").style.display =
    isSignup ? "none" : "block";
}

/* SUBMIT */
function handleAuthSubmit(e){
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if(!isSignup){

    const role = document.getElementById("loginRole").value;

    if(role === "admin"){
      window.location.href = "admin-dashboard.html";
    }
    else if(role === "user"){
      window.location.href = "user-dashboard.html";
    }

  } 
  else {

    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // ✅ VALIDATION
    if(name === "" || phone === "" || email === "" || password === "" || confirmPassword === ""){
      alert("Please fill all fields!");
      return;
    }

    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    // ✅ SUCCESS → REDIRECT
    window.location.href = "404.html";
  }
}

/* PASSWORD TOGGLE */
function togglePassword(){

  const password = document.getElementById("loginPassword");
  const eyeIcon = document.getElementById("eyeIcon");

  if(password.type === "password"){
    password.type = "text";
    eyeIcon.classList.replace("ri-eye-off-line","ri-eye-line");
  } else {
    password.type = "password";
    eyeIcon.classList.replace("ri-eye-line","ri-eye-off-line");
  }
}

/* OUTSIDE CLICK CLOSE */
window.addEventListener("click", function(e){
  const modal = document.getElementById("loginModal");
  if(e.target === modal){
    modal.style.display = "none";
  }
});


const videos = [
  {
    src: "images/zootopia_video.mp4",
    title: "Zootopia 2",
    desc: "In a city where every animal has a story, Judy Hopps and Nick Wilde return for a thrilling new case that uncovers hidden secrets, unexpected alliances, and a mystery that could change Zootopia forever."
  },
  {
    src: "images/conjuring_video.mp4",
    title: "Conjuring",
    desc: "“When a family is haunted by a terrifying supernatural presence, paranormal investigators Ed and Lorraine Warren step in—uncovering a dark and sinister force beyond imagination.”"
  },
  {
    src: "images/demon_video.mp4",
    title: "Demonslayer",
    desc: "After his family is slaughtered by demons, Tanjiro Kamado embarks on a relentless journey to become a demon slayer and save his sister—uncovering a world of danger, power, and unbreakable bonds."
  },
  {
    src: "images/jocker_video.mp4",
    title: "Joker",
    desc: "In a society that ignores and isolates him, Arthur Fleck slowly descends into madness—transforming into the iconic Joker and unleashing chaos on Gotham."
  },
  {
    src: "images/sita_video.mp4",
    title: "Sita Ram",
    desc: "A timeless love story unfolds through heartfelt letters as an orphaned soldier and a mysterious woman find each other—proving that true love transcends distance, fate, and time.."
  }
];

const thumbs = document.querySelectorAll(".thumb");

function changeVideo(index) {
  const mainVideo = document.getElementById("bgVideo");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");

  // change background video
  mainVideo.src = videos[index].src;
  mainVideo.play();

  // change text
  title.innerText = videos[index].title;
  desc.innerText = videos[index].desc;

  // active border
  thumbs.forEach(v => v.classList.remove("active"));
  thumbs[index].classList.add("active");
}


/* AUTO SLIDER */
const autoSlider = document.getElementById("slider");

let autoScroll = 0;

function autoSlide() {
  autoScroll += 200;

  if (autoScroll >= autoSlider.scrollWidth / 2) {
    autoScroll = 0;
  }

  autoSlider.style.transform = `translateX(-${autoScroll}px)`;
}

setInterval(autoSlide, 2000);


const manualSlider = document.getElementById("sliders");

let manualScroll = 0;
const scrollStep = 300;

/* 🔥 CLONE FIRST FEW ITEMS */
const cards = manualSlider.children;
const cloneCount = 5; // smooth loop

for (let i = 0; i < cloneCount; i++) {
  let clone = cards[i].cloneNode(true);
  manualSlider.appendChild(clone);
}

/* TOTAL WIDTH LIMIT */
const maxScroll = manualSlider.scrollWidth - manualSlider.clientWidth;

function slideRight() {
  manualScroll += scrollStep;

  manualSlider.style.transition = "transform 0.4s ease";
  manualSlider.style.transform = `translateX(-${manualScroll}px)`;

  /* RESET (SEAMLESS LOOP) */
  if (manualScroll >= maxScroll) {
    setTimeout(() => {
      manualSlider.style.transition = "none";
      manualScroll = 0;
      manualSlider.style.transform = `translateX(0px)`;
    }, 400);
  }
}

function slideLeft() {
  manualScroll -= scrollStep;

  if (manualScroll < 0) {
    manualScroll = 0;
  }

  manualSlider.style.transition = "transform 0.4s ease";
  manualSlider.style.transform = `translateX(-${manualScroll}px)`;
}

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});










/* TAMIL MOVIES SLIDER FUNCTIONS */

const tamilSlider = document.getElementById("tamilSliders");
let tamilScroll = 0;
const tamilScrollStep = 300;

/* Clone first few items for a seamless loop match */
const tamilCards = tamilSlider.children;
const tamilCloneCount = Math.min(5, tamilCards.length);

for (let i = 0; i < tamilCloneCount; i++) {
  let clone = tamilCards[i].cloneNode(true);
  tamilSlider.appendChild(clone);
}

const maxTamilScroll = tamilSlider.scrollWidth - tamilSlider.clientWidth;

function slideTamilRight() {
  tamilScroll += tamilScrollStep;

  tamilSlider.style.transition = "transform 0.4s ease";
  tamilSlider.style.transform = `translateX(-${tamilScroll}px)`;

  /* SEAMLESS RESET LOOP */
  if (tamilScroll >= maxTamilScroll) {
    setTimeout(() => {
      tamilSlider.style.transition = "none";
      tamilScroll = 0;
      tamilSlider.style.transform = `translateX(0px)`;
    }, 400);
  }
}

function slideTamilLeft() {
  tamilScroll -= tamilScrollStep;

  if (tamilScroll < 0) {
    tamilScroll = 0;
  }

  tamilSlider.style.transition = "transform 0.4s ease";
  tamilSlider.style.transform = `translateX(-${tamilScroll}px)`;
}










/* WEB SERIES SLIDER FUNCTIONS */

const seriesSlider = document.getElementById("seriesSliders");
let seriesScroll = 0;
const seriesScrollStep = 300;

/* Clone initial set for infinite slider illusion */
const seriesCards = seriesSlider.children;
const seriesCloneCount = Math.min(5, seriesCards.length);

for (let i = 0; i < seriesCloneCount; i++) {
  let clone = seriesCards[i].cloneNode(true);
  seriesSlider.appendChild(clone);
}

const maxSeriesScroll = seriesSlider.scrollWidth - seriesSlider.clientWidth;

function slideSeriesRight() {
  seriesScroll += seriesScrollStep;

  seriesSlider.style.transition = "transform 0.4s ease";
  seriesSlider.style.transform = `translateX(-${seriesScroll}px)`;

  /* INFINITE LOOP RESET */
  if (seriesScroll >= maxSeriesScroll) {
    setTimeout(() => {
      seriesSlider.style.transition = "none";
      seriesScroll = 0;
      seriesSlider.style.transform = `translateX(0px)`;
    }, 400);
  }
}

function slideSeriesLeft() {
  seriesScroll -= seriesScrollStep;

  if (seriesScroll < 0) {
    seriesScroll = 0;
  }

  seriesSlider.style.transition = "transform 0.4s ease";
  seriesSlider.style.transform = `translateX(-${seriesScroll}px)`;
}








/* COMING SOON AUTOMATIC SLIDER FUNCTIONS */

const csSlider = document.getElementById("comingSoonSlider");
let csScroll = 0;

// Clone items dynamically to provide seamless infinity rollover elements
const csCards = Array.from(csSlider.children);
csCards.forEach(card => {
  let clone = card.cloneNode(true);
  csSlider.appendChild(clone);
});

function autoSlideComingSoon() {
  // Pull dynamic item gap and width based on real-time device size mutations
  const cardWidth = csSlider.children[0].offsetWidth;
  const computedGap = parseInt(window.getComputedStyle(csSlider).gap) || 15;
  const stepDistance = cardWidth + computedGap;

  csScroll += stepDistance;

  csSlider.style.transition = "transform 0.5s ease";
  csSlider.style.transform = `translateX(-${csScroll}px)`;

  // Reset tracking pointer seamlessly when full loop threshold runs out
  if (csScroll >= csSlider.scrollWidth / 2) {
    setTimeout(() => {
      csSlider.style.transition = "none";
      csScroll = 0;
      csSlider.style.transform = `translateX(0px)`;
    }, 500);
  }
}

// Tick the animation every 2.5 seconds matching the trending cadence profile
setInterval(autoSlideComingSoon, 2500);












/* GLOBAL MOVIES MANUAL SLIDER CONTROLS */

const globalSlider = document.getElementById("globalSliders");
let globalScroll = 0;
const globalScrollStep = 300;

/* Clone standard layout cards loop block to manage seamless bounds rollover */
const globalCards = globalSlider.children;
const globalCloneCount = Math.min(5, globalCards.length);

for (let i = 0; i < globalCloneCount; i++) {
  let clone = globalCards[i].cloneNode(true);
  globalSlider.appendChild(clone);
}

const maxGlobalScroll = globalSlider.scrollWidth - globalSlider.clientWidth;

function slideGlobalRight() {
  globalScroll += globalScrollStep;

  globalSlider.style.transition = "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
  globalSlider.style.transform = `translateX(-${globalScroll}px)`;

  /* SEAMLESS REDIRECT BOUNDS CHECK */
  if (globalScroll >= maxGlobalScroll) {
    setTimeout(() => {
      globalSlider.style.transition = "none";
      globalScroll = 0;
      globalSlider.style.transform = `translateX(0px)`;
    }, 450);
  }
}

function slideGlobalLeft() {
  globalScroll -= globalScrollStep;

  if (globalScroll < 0) {
    globalScroll = 0;
  }

  globalSlider.style.transition = "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)";
  globalSlider.style.transform = `translateX(-${globalScroll}px)`;
}