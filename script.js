function createBackgroundStars(container, count = 400) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div')
        star.className = 'background-star'
        const size = Math.random() * 2 + 0.5
        const opacity = Math.random() * 0.8 + 0.2
        const duration = Math.random() * 5 + 3
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.setProperty('--o', opacity);
        star.style.setProperty('--d', `${duration}s`)
        container.appendChild(star)
    }
}

const headerBg = document.getElementById('header_background')
createBackgroundStars(headerBg, 500)
document.getElementById('create_constellation').addEventListener('click', () => {
    document.getElementById('star_section').scrollIntoView({ 
        behavior: 'smooth' 
    })
})
    
document.getElementById('explore_space').addEventListener('click', () => {
    document.getElementById('nasa_section').scrollIntoView({ 
        behavior: 'smooth' 
    })
})
let sky = document.getElementById('sky')
let saveButton = document.getElementById('save_button')
let resetButton = document.getElementById('reset_button')
let nameInput = document.getElementById('constellation_name')
let legendElement = document.getElementById('legend')
let panelToggler = document.getElementById('panel_toggler')
let helpButton = document.getElementById('help_button')
let instructionsPanel = document.getElementById('instructions_panel')
let imcosmo = document.getElementById('image-cosmo')
    
let stars = []
let lines = []
let firstStar = null
let counter = 1
let panelsVisible = true
    
createBackgroundStars(sky, 400)

createBackgroundStars(imcosmo, 400)
    
function addStar(x, y) {
    const star = document.createElement('div')
    star.className = 'star'
    const sizes = ['small', 'medium', 'large']
    const colors = ['blue', 'white', 'yellow', 'red']
    const size = sizes[Math.floor(Math.random() * sizes.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]
    star.classList.add(size, color)
    star.style.left = `${x}px`
    star.style.top = `${y}px`
    star.dataset.id = stars.length
    star.style.transform = 'translate(-50%,-50%) scale(0)'
    star.style.opacity = '0'
    sky.appendChild(star)
    setTimeout(() => {
        star.style.transition = 'all .5s'
        star.style.transform = 'translate(-50%,-50%) scale(1)'
        star.style.opacity = '1'
    }, 10)
    star.addEventListener('click', handleStarClick)
    stars.push({
        id: stars.length,
        x,
        y,
        element: star,
        size,
        color
    });
}
    
function handleStarClick(e) {
    const id = parseInt(e.target.dataset.id)
    const star = stars.find(s => s.id === id)
    if (!star) return;
    if (firstStar === null) {
        firstStar = star;
        star.element.classList.add('selected')
    } else {
        if (firstStar.id === star.id) {
            star.element.classList.remove('selected')
            firstStar = null
            return;
        }
        createLine(firstStar, star);
        firstStar.element.classList.remove('selected')
        firstStar = null
    }
}
function createLine(star1, star2) {
    const exists = lines.some(line => 
        (line.star1.id === star1.id && line.star2.id === star2.id) ||
        (line.star1.id === star2.id && line.star2.id === star1.id)
    )
    if (exists) return
    const dx = star2.x - star1.x
    const dy = star2.y - star1.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * 180 / Math.PI
    const line = document.createElement('div')
    line.className = 'line'
    line.style.width = `${distance}px`
    line.style.left = `${star1.x}px`
    line.style.top = `${star1.y}px`
    line.style.transform = `rotate(${angle}deg)`
    line.style.opacity = '0'
    line.style.transformOrigin = '0 0'
    sky.appendChild(line)
    setTimeout(() => {
        line.style.transition = 'opacity .5s';
        line.style.opacity = '1';
    }, 10);
    lines.push({
        star1,
        star2,
        element: line
    });
}
saveButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert('Введите название созвездия')
        return
    }
    if (stars.length < 2) {
        alert('Добавьте как минимум две звезды')
        return
    }
    if (lines.length < 1) {
        alert('Соедините звезды линиями')
        return
    }
    const legend = createLegend(name)
    legendElement.innerHTML = legend
    legendElement.classList.add('glowing')
    setTimeout(() => {
        legendElement.classList.remove('glowing')
    }, 5000);
});
    
function createLegend(name) {
    const beginnings = [
        "Когда мир был молод,",
        "В далёкие времена,",
        "Когда звёзды были ближе,",
        "В эпоху древних богов,",
        "В золотой век человечества,"
    ];
    const heroes = [
        "могучий дракон",
        "храбрый воин",
        "прекрасная царевна",
        "мудрый старец",
        "хитрая лиса",
        "гордый орёл",
        "огненный феникс",
        "великий маг"
    ];
    const actions = [
        "отправился к звёздам",
        "совершил подвиг",
        "нашёл древний артефакт",
        "победил тёмного владыку",
        "спас королевство",
        "обрел бессмертие",
        "освободил земли",
        "нашел истинную любовь"
    ];
    const results = [
        `и боги создали созвездие ${name}.`,
        `и появилось созвездие ${name}.`,
        `и небеса засияли ${name}.`,
        `и с тех пор ${name} светит нам.`,
        `и астрономы назвали его ${name}.`,
        `и родилось созвездие ${name}.`
    ];
    return `${beginnings[Math.floor(Math.random()*beginnings.length)]} ${heroes[Math.floor(Math.random()*heroes.length)]} ${actions[Math.floor(Math.random()*actions.length)]} ${results[Math.floor(Math.random()*results.length)]}`
}

resetButton.addEventListener('click', () => {
    stars = [];
    lines = [];
    firstStar = null;
    counter = 1;
    document.querySelectorAll('.star').forEach(star => star.remove());
    document.querySelectorAll('.line').forEach(line => line.remove());
    nameInput.value = '';
    legendElement.textContent = 'Создайте звезды и соедините их, чтобы получить легенду...';
    legendElement.classList.remove('glowing');
});
    
sky.addEventListener('click', (e) => {
    if (e.target !== sky) return;
    const rect = sky.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    addStar(x, y);
});
    
panelToggler.addEventListener('click', () => {
    panelsVisible = !panelsVisible;
    document.querySelectorAll('.panel').forEach(panel => {
        panel.style.opacity = panelsVisible ? '1' : '0';
        panel.style.pointerEvents = panelsVisible ? 'all' : 'none';
    });
    panelToggler.innerHTML = panelsVisible ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
});

helpButton.addEventListener('click', () => {
    const visible = instructionsPanel.style.display === 'block';
    instructionsPanel.style.display = visible ? 'none' : 'block';
    helpButton.innerHTML = visible ? '<i class="fas fa-question-circle"></i> Помощь' : '<i class="fas fa-times"></i> Закрыть';
});
    
setTimeout(() => {
    const skyRect = sky.getBoundingClientRect();
    addStar(skyRect.width * 0.3, skyRect.height * 0.3);
    addStar(skyRect.width * 0.4, skyRect.height * 0.4);
    addStar(skyRect.width * 0.5, skyRect.height * 0.35);
    addStar(skyRect.width * 0.45, skyRect.height * 0.55);
    addStar(skyRect.width * 0.35, skyRect.height * 0.5);
}, 500);
    
const apodLoader = document.getElementById('apod_loader');
const apodImage = document.getElementById('apod_image');
const apodDetails = document.getElementById('apod_details');
const apodTitle = document.getElementById('apod_title');
const apodDate = document.getElementById('apod_date');
const apodExplanation = document.getElementById('apod_explanation')
const apiKey = 'YbbMNWeWX2BqxoPKXEiWWcKMgNlUHhHXgqWG5XBt';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        apodLoader.style.display = 'none';
            
        apodImage.src = data.url;
        apodImage.style.display = 'block';
            
        apodTitle.textContent = data.title;
        apodDate.textContent = `Дата: ${data.date}`;
        apodExplanation.textContent = data.explanation;
        apodDetails.style.display = 'block';
    })
    .catch(error => {
        console.error('Ошибка загрузки данных NASA:', error);
        apodLoader.innerHTML = '<p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>';
    });


const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showSlide(index) {
    galleryItems.forEach(item => item.classList.remove('active'));
    galleryItems[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showSlide(currentIndex);
});


setInterval(() => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showSlide(currentIndex);
}, 7000);


document.getElementById('image-cosmo').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    
    document.querySelector('.parallax-bg').style.transform = `translate(${x}px, ${y}px)`;
    document.querySelector('.gallery-item.active img').style.transform = `translate(${-x/2}px, ${-y/2}px) scale(1.05)`;
});


const audio = document.getElementById('space-ambience');
const audioToggle = document.querySelector('.audio-toggle');

audioToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audio.pause();
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});


const parallaxBg = document.querySelector('.parallax-bg');
createBackgroundStars(parallaxBg, 400);

window.addEventListener('resize', () => {
    stars.forEach(star => {
        star.element.style.left = `${star.x}px`;
        star.element.style.top = `${star.y}px`;
    });
});