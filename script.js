// element`s
const header = document.querySelector('.header');
const boxContent = document.querySelector('.box-content');
const boxLoading = document.querySelector('.box-loading');

const btnMenu = document.querySelector('.menu-icon');
const boxMenu = document.querySelector('.box-menu');

const inputGridSize = document.querySelector('.input-grid-size'); 
const inputMainColor = document.querySelector('.input-main-color'); 
const inputLightColor = document.querySelector('.input-light-color'); 
const inputBackgroundColor = document.querySelector('.input-background-color'); 

const btnClear = document.querySelector('.btn-clear');
const btnReload = document.querySelector('.btn-reload');

const btnTop = document.querySelector('.button-top');

// variable`s
let row = 4;
let blockLoadingOnScroll = false;
let timerBlockLoadingOnScroll = 1000;
let timerShowImage = 300;
let timeoutHoverEffect;
let timeController;
let timeControllerNoImages = 10000;

const api = 'https://source.unsplash.com/random/';
const width_img = 270;


//btn`s
btnMenu.addEventListener('click', () => {
    if(boxMenu.classList.contains('close')){
        boxMenu.classList.remove('close');
    }else{
        boxMenu.classList.add('close');
    }
});

btnClear.addEventListener('click', async() => {
    let confirmClear = confirm('vc tem certeza q deseja excluir todo continuo?');
    if(confirmClear){
        if(confirm('deseja fazer load de novas imagens?') && confirmClear){
            init(true);
        }else{
            clearContent();
        }
    }
});

btnReload.addEventListener('click', async() => {
    if(confirm('vc realmente deseja fazer o reload das imagens?')){
        await init(true);
    }
});

btnTop.addEventListener('click', async() => goTop());

// input`s
inputGridSize.addEventListener('change', async (e) => resizeGrid(e.target.value));
inputMainColor.addEventListener('input', async (e) => document.documentElement.style.setProperty('--main-color', `${e.target.value}`)); 
inputLightColor.addEventListener('input', async (e) => document.documentElement.style.setProperty('--light-color', `${e.target.value}`));
inputBackgroundColor.addEventListener('input', async (e) => document.documentElement.style.setProperty('--background-color', `${e.target.value}`));

// function`s
const getImage = async() => {
    await fetch(`${api}${await randomSizeNR()}`).then((res) => loadImage(res));
}

const loadImage = async(json) => {
    const boxItem = document.createElement('div');
    boxItem.classList.add('box-item');
    boxItem.style = `width:${width_img / inputGridSize.value}px;`;

    console.log(`${width_img / inputGridSize.value}px;`);

    const img = document.createElement('img');
    img.src = `${json.url}`;

    const boxAction = document.createElement('div');
    boxAction.classList.add('box-action');
    
    const btnDel = document.createElement('button');
    btnDel.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnDel.addEventListener('click', () => {
        if(confirm('vc realmente deseja deletar esse item?')){
            boxItem.style.opacity = 0;

            setTimeout(() =>  boxItem.remove(), 300);
        }
    });

    const btnDow = document.createElement('button');
    btnDow.innerHTML = '<i class="fa-solid fa-download"></i>';
    btnDow.addEventListener('click', () => alert('um exemplo só'));

    boxAction.appendChild(btnDow);
    boxAction.appendChild(btnDel);

    boxItem.appendChild(boxAction);
    boxItem.appendChild(img);
    boxContent.appendChild(boxItem);

    setTimeout(() => boxItem.style.opacity = 1, timerShowImage);
}

const randomSizeNR = async() => {
    await randomSize().then((size) => {
        return `${size}x${size}`;
    });
}

const randomSize = async() => {
    return Math.floor(Math.random() * 10) + 1080;
}

const goTop = async() =>{
    let pos = document.documentElement.scrollTop || document.body.scrollTop;

    if (pos > 0) {
      window.requestAnimationFrame(goTop);
      window.scrollTo(0, pos - pos / 8);
    }
}

const onScroll = async() => {
    // anim h1
    await titleAnim();

    // btn to top
    if(window.scrollY > 500){
        btnTop.style.opacity = 1;
    }else{
        btnTop.style.opacity = 0;
    }

    // add new images
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && !blockLoadingOnScroll) {
        blockLoadingOnScroll = true;
        boxLoading.style.opacity = 1;
        
        for(let x = 0; x<= row * 4; x++){
            await getImage();
        }

        setTimeout(() => {
            blockLoadingOnScroll = false;
            boxLoading.style.opacity = 0;
        }, timerBlockLoadingOnScroll);
    }
}

const resizeGrid = async(total) => {
    document.querySelectorAll('.box-item').forEach((boxItem) => {
        boxItem.style = `width: ${width_img / total}px;`;
        boxItem.style.opacity = 1;
    });
}

const titleAnim = async() => {
    if(window.scrollY > 200 && header.querySelector('h1').classList.contains('tracking-in-expand')){
        header.querySelector('h1').classList.remove('tracking-in-expand');
    }else{
        header.querySelector('h1').classList.add('tracking-in-expand');
    }
}

const clearContent = async() =>{
    boxContent.innerHTML = '';
}

const hasItens = async() => {
    clearInterval(timeController);
    timeController = setInterval(async() => {
        if(document.querySelectorAll('.box-item').length <= 0){
            await init(true); 
            hasItens();
         }
    }, timeControllerNoImages);
}

// stat function
const init = async(stat = false) => {
    // show load
    boxLoading.style.opacity = 1;

    // set default value`s
    inputMainColor.value = window.getComputedStyle(document.documentElement).getPropertyValue('--main-color');
    inputLightColor.value = window.getComputedStyle(document.documentElement).getPropertyValue('--light-color'); 
    inputBackgroundColor.value = window.getComputedStyle(document.documentElement).getPropertyValue('--background-color'); 


    //
    await titleAnim();

    // check is stat
    if(stat){
        await clearContent();
        await hasItens();
    }
    
    // first add
    for(let x = 0; x<= row * 4; x++){
        await getImage();
    } 
}


// loader
window.addEventListener('scroll', () => onScroll());
window.addEventListener('load', async() => init(true));

