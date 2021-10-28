
let getConteiner = document.getElementById("conteiner");
let musics = document.getElementsByClassName("music");
let isPlay = false;
let playIMG = document.getElementsByClassName("cbtn")[1];
let index = 0;
let getVolume = getConteiner.querySelector(".volume");
let progBar = getConteiner.querySelector(".progBar");
let progBarFill = getConteiner.querySelector(".progBarFill");
let songIMG = document.getElementById("songIMG");
let musicsName = ["Angel", "Sad But True", "The Kids Are Back", "Never Say Never", "Fear Of The Dark",
                 "Classic Heavy Metal"];

//function to play and pause music
function playM(){
    if(isPlay == false){
        musics[index].play();
        playIMG.src = "./assets/images/buttons/pause.png";
        isPlay = true;
    }else{
        musics[index].pause();
        playIMG.src = "./assets/images/buttons/play.png";
        isPlay = false;
    }
}

//function to stop the music
function stopM(){
    musics[index].pause();
    playIMG.src = "./assets/images/buttons/play.png";
    isPlay = false;
    musics[index].currentTime = 0;
}

//function to go back to the previous song
function backM(){
    if(index == 0){
        stopM();
        index = 5;
        songName();
        playM();
    }else{
        stopM();
        index--;
        songName();
        playM();
    }
}

//function to go to the next song
function nextM(){
    if(index == 5){
        stopM();
        index = 0;
        songName();
        playM();
    }else{
        stopM();
        index++;
        songName();
        playM();
    }
}

//function to control the volume
getVolume.addEventListener("mousemove", (e)=>{
    for(let i = 0; i < musics.length; i++){
        musics[i].volume = e.target.value;
    }
})

//function to control the progress bar
progBar.addEventListener("click", (e)=>{
    let progTime = (e.offsetX / progBar.offsetWidth) * musics[index].duration;
    musics[index].currentTime = progTime;
})

//progress bar
function progBarFunc(){
    let percentage = (musics[index].currentTime / musics[index].duration) * 100;
    progBarFill.style.width = `${percentage}%`;
}

//mute function
songIMG.addEventListener("click", ()=>{
    for(let i = 0; i < musics.length; i++){
        musics[i].muted = !musics[i].muted;
    }
    if(musics[index].muted){
        songIMG.src = "./assets/images/buttons/songOff.png"
    }else{
        songIMG.src = "./assets/images/buttons/songOn.png"
    }
})

//function to display the name of the songs
function songName(){
    let songsName = document.getElementById("songsName");
    songsName.innerText = musicsName[index];
}

//function that will save the chosen song
function getMusic(mN){
    let musicNumber = mN.value;
    let saveM = {
        saveMusic: musicNumber
    }
    localStorage.setItem("savedMusic", JSON.stringify(saveM));
    window.location.href = "./index.html";
}

//function that will return the chosen song
function returnMusic(){
    let rM = localStorage.getItem("savedMusic");
    let converOBJ = JSON.parse(rM);
    index = converOBJ["saveMusic"];
    songName();
}
