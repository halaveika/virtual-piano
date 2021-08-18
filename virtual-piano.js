

const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const pianoКeysCode = [[68,'c'],[70,'d'],[71,'e'],[72,'f'],[74,'g'],[75,'a'],[76,'b'],[82,'c♯'],[84,'d♯'],[85,'f♯'],[73,'g♯'],[79,'a♯']];
let isPlaing = false; //flag for mousepreessed mod
const switcher=document.querySelectorAll('.btn');

//func plaing transmitted audio file;

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
  };

//mouse event handling;

piano.addEventListener('click', (event) => {
  if(event.target.classList.contains('piano-key')){
    playAudio(`./assets/audio/${event.target.dataset.note}.mp3`);
//active button from piano;
    pianoКeys.forEach((element) => { 
      if(element.classList.contains('piano-key-active')) element.classList.remove('piano-key-active');
    });
    event.target.classList.add('piano-key-active');
  }
});

//keyboard event handling;
window.addEventListener('keydown', (event) => {
  pianoКeysCode.forEach(element => {
      if(event.keyCode == element[0] && event.repeat!=true) playAudio (`./assets/audio/${element[1]}.mp3`);
//active button from keyboard;
      if(event.keyCode === element[0] && event.repeat!=true){
        pianoКeys.forEach((el) =>{
          if (element[1]===el.dataset.note) el.classList.contains ('piano-key-active') ? el.classList.remove('piano-key-active') : el.classList.add('piano-key-active')})
      ;}
  });
});

//transition event function;
function removeTransition (event){
 if (event.propertyName != 'transform') return
 this.classList.remove('piano-key-active');
}
//transition event handler;
pianoКeys.forEach((element) =>element.addEventListener('transitionend',removeTransition));

//mousedown event handler
piano.addEventListener('mousedown', event => {
  if(event.target.classList.contains('piano-key-active')){
    playAudio(`./assets/audio/${event.target.dataset.note}.mp3`);
    pianoКeys.forEach((element) => { 
      if(element.classList.contains('piano-key-active')) element.classList.remove('piano-key-active');
    });
    event.target.classList.add('piano-key-active');
  }
  isPlaing = true;
});

//mouseover event handler
piano.addEventListener('mouseover', event => {
  if (isPlaing === true) {
    if(event.target.classList.contains('piano-key')){
      playAudio(`./assets/audio/${event.target.dataset.note}.mp3`);
      pianoКeys.forEach((element) => { 
        if(element.classList.contains('piano-key-active')) element.classList.remove('piano-key-active');
      });
      event.target.classList.add('piano-key-active');
    }
  }
});

//mouseup event handler
window.addEventListener('mouseup', event => {
  if (isPlaing === true) {
    isPlaing = false;
    pianoКeys.forEach((element) => { 
      if(element.classList.contains('piano-key-active')) element.classList.remove('piano-key-active');
    });
  }
});


//fullscreenmod handler
document.querySelector('.fullscreen').addEventListener('click', (event)=>fullscreenFunction(event));

//fullscreenmod function
function fullscreenFunction(event){
  !document.fullscreenElement ? document.body.requestFullscreen() : document.exitFullscreen()};


//note switch handler
switcher[0].addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-active')){
    event.target.nextElementSibling.classList.remove('btn-active');
    event.target.classList.add('btn-active')
    switchPiano(event.target.classList[1]);
  }
});

//letter switch handler
switcher[1].addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-active')){
    event.target.previousElementSibling.classList.remove('btn-active');
    event.target.classList.add('btn-active');
    switchPiano(event.target.classList[1]);
  }
});

//letter/note switch function
function switchPiano(btn) {
  (btn ==='btn-notes') ? 
  pianoКeys.forEach((element)=>{
    element.classList.remove('letter');
    element.classList.add('notes');})
 : pianoКeys.forEach((element)=>{
    element.classList.remove('notes');
    element.classList.add('letter');});
};