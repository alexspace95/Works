const textForFooter = [
    'War never changes',
    'PLEASE STAND BY',
    'Prepare for the future',
    'Get the water chip for 150 days',
    'Line up in an orderly fashion',
    'Use protective eye wear',
    'Drink Nuke-Cola',
    'Do not eat irradiated food',
    "Commie ghosts what don't know they're dead. Hoping to steal our rockets so they can fly up and paint the moon pink and draw a Lenin face on it."
];
let countFooterText = 0;

const daysOfCalendar = [{
    month: 0,
    day: 1,
    events: 'New Year'
}, {
    month: 0,
    day: 7,
    events: 'Christmas'
}, {
    month: 0,
    day: 14,
    events: 'Old New Year'
}, {
    month: 1,
    day: 14,
    events: `Valentine's Day`
}, {
    month: 1,
    day: 23,
    events: `Defenders Day`
}, {
    month: 2,
    day: 8,
    events: `International Women's Day`
}, {
    month: 3,
    day: 12,
    events: `International Day of Human Space Flight `
}, {
    month: 9,
    day: 23,
    events: 'Great War'
}, {
    month: 11,
    day: 5,
    events: 'Vault Dweller leaved the Vault 13'
}];

const musicSRC = [{
    name: 'Jo Stafford - Blue moon',
    src: './music/Jo Stafford - Blue moon.mp3'
}, {
    name: 'Frank Sinatra - Moon river',
    src: './music/Frank Sinatra - Moon river.mp3'
}, {
    name: 'Jo Stafford - Dearie',
    src: './music/Jo Stafford - Dearie.mp3'
}, {
    name: 'Jo Stafford - No Other Love',
    src: './music/Jo Stafford - No Other Love.mp3'
}, {
    name: 'Jo Stafford - Stardust',
    src: './music/Jo Stafford - Stardust.mp3'
}, {
    name: 'Frank Sinatra - Let It Snow',
    src: './music/Frank Sinatra - Let It Snow.mp3'
}, {
    name: 'The Ink Spots - Maybe',
    src: './music/The Ink Spots - Maybe.mp3'
}, {
    name: "The Ink Spots - I Don't Want To Set The World On Fire",
    src: "./music/The Ink Spots - I Don't Want To Set The World On Fire.mp3"
}, {
    name: "The Ink Spots - It's all over",
    src: "./music/The Ink Spots - It's all over.mp3"
}, {
    name: 'Louis Armstrong - A kiss to build a dream on',
    src: './music/Louis Armstrong - A kiss to build a dream on.mp3'
}, {
    name: 'Louis Armstrong - I Love Jazz',
    src: './music/Louis Armstrong - I Love Jazz.mp3'
}, {
    name: "Bob Crosby And The Bobcats - Way Back Home",
    src: "./music/Bob Crosby And The Bobcats - Way Back Home.mp3"
}, {
    name: "Allan Gray - Swing doors",
    src: "./music/Allan Gray - Swing doors.mp3"
}, {
    name: "Jack Shaindlin - Let's Go Sunning",
    src: "./music/Jack Shaindlin - Let's Go Sunning.mp3"
}, {
    name: "Jack Shaindlin - I'm tickled pink",
    src: "./music/Jack Shaindlin - I'm tickled pink.mp3"
}, {
    name: "Vera Lynn - We'll Meet Again",
    src: "./music/Vera Lynn - We'll Meet Again.mp3"
}, {
    name: "Amos Milburn - Atomic baby",
    src: "./music/Amos Milburn - Atomic baby.mp3"
}, {
    name: "Betty Hutton - He's a demon",
    src: "./music/Betty Hutton - He's a demon.mp3"
}, {
    name: "Bob Crosby - Dear Hearts And Gentle People",
    src: "./music/Bob Crosby - Dear Hearts And Gentle People.mp3"
}, {
    name: "The Ink Spots - Into each life some rain must fall",
    src: "./music/The Ink Spots - Into each life some rain must fall.mp3"
}, {
    name: "Roy Brown - Mighty mighty man",
    src: "./music/Roy Brown - Mighty mighty man.mp3"
}, {
    name: "Gerhard Trede - Fox Boogie",
    src: "./music/Gerhard Trede - Fox Boogie.mp3"
}, {
    name: "The Andrews Sisters - In the Mood",
    src: "./music/The Andrews Sisters - In the Mood.mp3"
}, {
    name: "Billy Munn - Jazzy Interlude",
    src: "./music/Billy Munn - Jazzy Interlude.mp3"
}, {
    name: "Billie Holiday - Easy Living",
    src: "./music/Billie Holiday - Easy Living.mp3"
}, {
    name: "Billie Holiday - Crazy he calls me",
    src: "./music/Billie Holiday - Crazy he calls me.mp3"
}, {
    name: "Cole Porter - Anything goes",
    src: "./music/Cole Porter - Anything goes.mp3"
}];




let musicCounter = 0;
let trackCounter = 0;
let isListRepeat = 2;


function createPlayList(musicArray) {
    const divMusicList = document.getElementById('music-list');
    for (let i = 0; i < musicArray.length; i++) {
        divMusicList.insertAdjacentHTML('beforeend',
            `<p><input type='button' class='choose-music-button' data-number='${i}' />№${i+1}. ${musicArray[i].name.toUpperCase()}</p>`)
    }
}

function chooseTrack(arr) {
    const musicList = document.getElementById('music-list');
    musicList.addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'input') {
            const audio = document.getElementById('audio');
            audio.src = `${arr[(Number(e.target.getAttribute('data-number')))].src}`;
            audio.play();
            const playButton = document.getElementById('play-controler');
            playButton.setAttribute('class', 'audio-controler audio-play');
            musicCounter = Number(e.target.getAttribute('data-number'));
        }
        setColorForThisTrack();
    });
}

function setChangingOnAudioRepeatButton() {
    const repeatButton = document.getElementById('repeat-controler');
    repeatButton.addEventListener('click', function() {
        const audio = document.getElementById('audio');
        if (audio.hasAttribute('loop')) {
            audio.removeAttribute('loop');
            repeatButton.setAttribute('class', 'repeat-controler repeat-not-active');
        } else {
            audio.setAttribute('loop', 'loop');
            repeatButton.setAttribute('class', 'repeat-controler repeat-active');
        }
    });
}

function setPlayingButton() {
    const playButton = document.getElementById('play-controler');
    const audio = document.getElementById('audio');
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playButton.setAttribute('class', 'audio-controler audio-play')
        } else {
            audio.pause();
            playButton.setAttribute('class', 'audio-controler audio-pause');
        }
    })
}

function createNextTrackButton(list) {
    const nextButton = document.getElementById('next-track-button');
    nextButton.addEventListener('click', function() {
        nextTrack(list);
        changeTrack(list);
        setColorForThisTrack();
        const playButton = document.getElementById('play-controler');
        playButton.setAttribute('class', 'audio-controler audio-play')
    })
}

function nextTrack(arr) {
    if (musicCounter === arr.length - 1) {
        musicCounter = 0;
    } else {
        musicCounter++;
    }
}

function changeTrack(arr) {
    const audio = document.getElementById('audio');
    audio.src = `${arr[musicCounter].src}`;
    audio.play();
}

function changePlaylistRepeatButton() {
    const repeatPlaylistButton = document.getElementById('repeat-playlist-controler');
    repeatPlaylistButton.addEventListener('click', function() {
        if ((Number(isListRepeat)) % 2) {
            repeatPlaylistButton.setAttribute('class', 'repeat-controler repeat-playlist-controler repeat-not-active');
        } else {
            repeatPlaylistButton.setAttribute('class', 'repeat-controler repeat-playlist-controler repeat-active');
        }
        isListRepeat++;
    })

}

function setPlaylistRepeatting(list) {
    const audio = document.getElementById('audio');
    audio.addEventListener('ended', function() {
        if ((Number(isListRepeat)) % 2 !== 0) {
            nextTrack(list);
            changeTrack(list);

        }
        setColorForThisTrack();
    })
}

function changeVolume() {
    const volumeInput = document.getElementById('volume-range')
    volumeInput.addEventListener('input', function() {
        const audio = document.getElementById('audio');
        volumeInput.title = `${volumeInput.value}`;
        audio.volume = `${(volumeInput.value)/100}`;
    })
}

function setColorForThisTrack() {
    const musicList = document.getElementById('music-list');
    musicList.childNodes.forEach(e => e.removeAttribute('class'));
    (musicList.childNodes[musicCounter]).setAttribute('class', 'this-track')
}

function createAudioTimeControler() {
    const audio = document.getElementById('audio');
    const audioTimeControler = document.getElementById('audio-time-controler');
    const timeControlerText = document.getElementById('time-controler-text');

    audioTimeControler.addEventListener('input', function() {
        audio.currentTime = `${audioTimeControler.value}`;
    });
    audio.addEventListener('timeupdate', function() {
        audioTimeControler.max = `${audio.duration}`;
        audioTimeControler.value = audio.currentTime;

        titleTimeMin = (Math.floor(Number(audio.currentTime / 60)));
        titleTimeSec = Math.floor((audio.currentTime) - (titleTimeMin * 60));
        if ((titleTimeMin < 10) && (titleTimeMin !== 0)) {
            titleTimeMin = `0${titleTimeMin}`
        }
        if (titleTimeSec < 10) {
            titleTimeSec = `0${titleTimeSec}`
        }
        audioTimeControler.title = `${titleTimeMin}:${titleTimeSec}`;
        timeControlerText.innerHTML = `${audioTimeControler.title}`;
    })
}





function creatLeftSection() {
    const sectionLeft = document.getElementById('section-left');
    sectionLeft.innerHTML = '';
    sectionLeft.insertAdjacentHTML('beforeend', `
    <div>
        <figure class="vault-symbol" id="vault-symbol"></figure>
    </div>
    <div class="calendar-year text-center back-yellow font-100 padding-0-50 ">
        <p id="calendar-year">2077</p>
    </div>
    <div class="calendar-month text-center back-yellow font-100 padding-0-50 ">
        <p id="calendar-month">OCT</p>
    </div>
    <div class='events-table green' id='events-table'></div>
    <div class="calendar-day" id="calendar-day">
        <table>
            <tbody class="calendar-tbody" id="calendar-tbody">
            </tbody>
        </table>
    </div>`);

    setYear();
    setMonth();
    setDays();
}

function createRightSection() {
    const sectionRight = document.getElementById('section-right');
    sectionRight.innerHTML = '';
    sectionRight.insertAdjacentHTML('beforeend', `
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="mon">MON</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="tue">TUE</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="wed">WED</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="thu">THU</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="fri">FRI</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="sat">SAT</p>
    </div>
    <div class="day font-80 padding-0-50  back-yellow text-center">
        <p id="sun">SUN</p>
    </div>`);

    setDayOfWeek();
}

function createTextForFooter() {
    const footer = document.getElementById('footer-text');
    footer.innerHTML = '';
    footer.insertAdjacentHTML('beforeend', textForFooter[countFooterText]);
}

function setTextForFooterUp() {
    countFooterText++;
    if (countFooterText >= textForFooter.length) {
        countFooterText = 0;
    }
    createTextForFooter();
}

function setTextForFooterDown() {
    countFooterText--;
    if (countFooterText <= 0) {
        countFooterText = textForFooter.length - 1;
    }
    createTextForFooter();
}

function setFooterArrow() {
    const footerDiv = document.getElementById('footer-arrows');
    footerDiv.innerHTML = '';
    footerDiv.insertAdjacentHTML('beforeend', `
<span class='footer-arrow-up' id='footer-arrow-up'></span>
<span class='footer-arrow-down' id='footer-arrow-down'></span>
`)
    const arrowUp = document.getElementById('footer-arrow-up');
    const arrowDown = document.getElementById('footer-arrow-down');
    arrowUp.addEventListener('click', setTextForFooterUp);
    arrowDown.addEventListener('click', setTextForFooterDown);
}

function setYear() {
    const yearNow = new Date().getFullYear();
    const year = document.getElementById('calendar-year');
    year.innerHTML = `${yearNow}`;
}

function setMonth() {
    let monthNow = new Date().getMonth();
    switch (monthNow) {
        case 0:
            monthNow = 'JAN'
            break;
        case 1:
            monthNow = 'FEB'
            break;
        case 2:
            monthNow = 'MAR'
            break;
        case 3:
            monthNow = 'APR'
            break;
        case 4:
            monthNow = 'MAY'
            break;
        case 5:
            monthNow = 'JUN'
            break;
        case 6:
            monthNow = 'JUL'
            break;
        case 7:
            monthNow = 'AUG'
            break;
        case 8:
            monthNow = 'SEP'
            break;
        case 9:
            monthNow = 'OCT'
            break;
        case 10:
            monthNow = 'NOV'
            break;
        case 11:
            monthNow = 'DEC'
            break;
    }
    const month = document.getElementById('calendar-month');
    month.innerHTML = `${monthNow}`;
}

function setDayOfWeek() {
    let dayOfWeek = new Date().getDay();
    const weekArray = [
        mon = document.getElementById('mon'),
        tue = document.getElementById('tue'),
        wed = document.getElementById('wed'),
        thu = document.getElementById('thu'),
        fri = document.getElementById('fri'),
        sat = document.getElementById('sat'),
        sun = document.getElementById('sun')
    ];

    for (i = 0; i < weekArray.length; i++) {
        if (weekArray[i].hasAttribute) {
            weekArray[i].removeAttribute('class');
        }
    }

    if (dayOfWeek === 0) {
        sun.setAttribute('class', 'active-day');
    } else {
        weekArray[dayOfWeek - 1].setAttribute('class', 'active-day');
    }

}

function setDays() {
    let daysInMonth = 0;
    switch (new Date().getMonth()) {
        case 0, 2, 4, 6, 7, 9, 11:
            daysInMonth = 31;
            break;
        case 3, 5, 8, 10:
            daysInMonth = 30;
        case 1:
            if (((new Date().getFullYear()) % 4 === 0) && ((new Date().getFullYear()) % 100 !== 0)) {
                daysInMonth = 29;
            } else {
                daysInMonth = 28;
            }
            break;
    }

    const tbody = document.getElementById('calendar-tbody');
    tbody.innerHTML = '';
    tbody.insertAdjacentHTML('beforeend',
        `<tr id='tr-week-1'>
                <td class='td-calendar text-center' id='td-day-1' data-day='1'>1</td>
                <td class='td-calendar text-center' id='td-day-2' data-day='2'>2</td>
                <td class='td-calendar text-center' id='td-day-3' data-day='3'>3</td>
                <td class='td-calendar text-center' id='td-day-4' data-day='4'>4</td>
                <td class='td-calendar text-center' id='td-day-5' data-day='5'>5</td>
                <td class='td-calendar text-center' id='td-day-6' data-day='6'>6</td>
                <td class='td-calendar text-center' id='td-day-7' data-day='7'>7</td>
            </tr>
            <tr id='tr-week-2'>
                <td class='td-calendar text-center' id='td-day-8' data-day='8'>8</td>
                <td class='td-calendar text-center' id='td-day-9' data-day='9'>9</td>
                <td class='td-calendar text-center' id='td-day-10' data-day='10'>10</td>
                <td class='td-calendar text-center' id='td-day-11' data-day='11'>11</td>
                <td class='td-calendar text-center' id='td-day-12' data-day='12'>12</td>
                <td class='td-calendar text-center' id='td-day-13' data-day='13'>13</td>
                <td class='td-calendar text-center' id='td-day-14' data-day='14'>14</td>
            </tr>
            <tr id='tr-week-3'>
                <td class='td-calendar text-center' id='td-day-15' data-day='15'>15</td>
                <td class='td-calendar text-center' id='td-day-16' data-day='16'>16</td>
                <td class='td-calendar text-center' id='td-day-17' data-day='17'>17</td>
                <td class='td-calendar text-center' id='td-day-18' data-day='18'>18</td>
                <td class='td-calendar text-center' id='td-day-19' data-day='19'>19</td>
                <td class='td-calendar text-center' id='td-day-20' data-day='20'>20</td>
                <td class='td-calendar text-center' id='td-day-21' data-day='21'>21</td>
            </tr>
            <tr id='tr-week-4'>
                <td class='td-calendar text-center' id='td-day-22' data-day='22'>22</td>
                <td class='td-calendar text-center' id='td-day-23' data-day='23'>23</td>
                <td class='td-calendar text-center' id='td-day-24' data-day='24'>24</td>
                <td class='td-calendar text-center' id='td-day-25' data-day='25'>25</td>
                <td class='td-calendar text-center' id='td-day-26' data-day='26'>26</td>
                <td class='td-calendar text-center' id='td-day-27' data-day='27'>27</td>
                <td class='td-calendar text-center' id='td-day-28' data-day='28'>28</td>
            </tr>`);

    if (daysInMonth === 31) {
        tbody.insertAdjacentHTML('beforeend',
            `<tr id = 'tr-week-5' >
        <td class='td-calendar text-center' id ='td-day-29' data-day='29'> 29 </td> 
        <td class='td-calendar text-center' id ='td-day-30' data-day='30'> 30 </td> 
        <td class='td-calendar text-center' id ='td-day-31' data-day='31'> 31 </td> 
            </tr>`
        );
    }

    if (daysInMonth === 30) {
        tbody.insertAdjacentHTML('beforeend',
            `<tr id='tr-week-5'>
                <td class='td-calendar text-center' id='td-day-29' data-day='29'>29</td>
                <td class='td-calendar text-center' id='td-day-30' data-day='30'>30</td>
            </tr>`
        );
    }

    if (daysInMonth === 29) {
        tbody.insertAdjacentHTML('beforeend',
            `<tr id='tr-week-5'>
                <td class='td-calendar text-center' id='td-day-29' data-day='29'>29</td>
            </tr>`
        );
    }

    const date = new Date().getDate();
    const today = document.getElementById(`td-day-${date}`);
    today.setAttribute('class', 'td-calendar text-center today');
}

function returnEventOfDay(arr) {
    const tbody = document.getElementById('calendar-tbody');

    tbody.addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'td') {
            e.preventDefault();
            const toDay = Number(e.target.getAttribute('data-day'));
            const theMonth = new Date().getMonth();
            const textTable = document.getElementById('events-table');
            textTable.innerHTML = '';
            textTable.insertAdjacentHTML('beforeend', `
            <p>${toDay}.${theMonth+1}</p>
            `);
            for (let i = 0; i < arr.length; i++)
                if ((arr[i].day === toDay) && (arr[i].month === theMonth)) {
                    textTable.insertAdjacentHTML('beforeend', `
            <p class='event-text' id='event-text'>${arr[i].events}</p>
            `);
                }
        }
    })
}

function cleanCalendar() {
    const sections = document.getElementById('main-section');
    sections.innerHTML = ''
}

createPlayList(musicSRC);
setChangingOnAudioRepeatButton();
chooseTrack(musicSRC);
setPlayingButton();
changePlaylistRepeatButton();
setPlaylistRepeatting(musicSRC);
createNextTrackButton(musicSRC);
changeVolume();
setColorForThisTrack();
createAudioTimeControler();


creatLeftSection();
createRightSection();
setFooterArrow();
createTextForFooter();
setInterval(setTextForFooterUp, 15000);
returnEventOfDay(daysOfCalendar);



let cube = 0;

function getCube() {
    const cubeSpan = document.getElementById('cube');
    const audio = document.getElementById('audio');
    audio.addEventListener('timeupdate', function() {
        // cube = Math.ceil(audio.currentTime);
        cubeSpan.setAttribute('style', `background-image: url(./pics/cubeImg/${((cube % 8)+1)*11}.png)`);
        cube++;
        if (cube === 8) {
            cube = 0;
        }
        if (audio.paused) {
            cubeSpan.removeAttribute('style');
        }
    })
}

getCube();