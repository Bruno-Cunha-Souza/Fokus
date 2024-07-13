document.addEventListener("DOMContentLoaded", () => {

    const html = document.querySelector('html');
    const focoBt = document.querySelector('.app__card-button.app__card-button--foco');
    const curtoBt = document.querySelector('.app__card-button.app__card-button--curto');
    const longoBt = document.querySelector('.app__card-button.app__card-button--longo');
    const banner = document.querySelector('.app__image');
    const titulo = document.querySelector('.app__title');
    const btns = document.querySelectorAll('.app__card-button');
    const musicInput = document.querySelector('#alternar-musica');
    const starPauseBtn = document.querySelector('#start-pause');
    const starPauseText = document.querySelector('#start-pause span');
    const iconPausePlay = document.querySelector('.app__card-primary-butto-icon')
    const tempScreen = document.querySelector('#timer')

    const songPlay = new Audio('/sons/play.wav')
    const songPause = new Audio('/sons/pause.mp3')
    const songBeep = new Audio('/sons/beep.mp3')
    const music = new Audio('/sons/luna-rise-part-one.mp3');

    music.loop = true

    let tempSeg = 1500
    let intervaloId = null

    musicInput.addEventListener('change', () => {
        if (music.paused) {
            music.play()
        } else {
            music.pause()
        }
    });

    focoBt.addEventListener('click', () => {
        tempSeg = 1500
        alterarContexto('foco')
        focoBt.classList.add('active')
    });

    curtoBt.addEventListener('click', () => {
        tempSeg = 300
        alterarContexto('descanso-curto')
        curtoBt.classList.add('active')
    });

    longoBt.addEventListener('click', () => {
        tempSeg = 900
        alterarContexto('descanso-longo')
        longoBt.classList.add('active')
    });

    function alterarContexto(contexto) {
        ShowTimer()
        btns.forEach(function (contexto) {
            contexto.classList.remove('active')
        })
        html.setAttribute('data-contexto', contexto)
        banner.setAttribute('src', `imagens/${contexto}.png`)
        switch (contexto) {
            case "foco":
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
                break;
            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `
            default:
                break;

        }
    }

    const contaRegress = () => {
        if (tempSeg <= 0 ){
            songBeep.play()
            zerar()
            alert('Tempo Finalizado !')
            return
        }

        tempSeg -= 1
        ShowTimer()
    }

    starPauseBtn.addEventListener('click', iniciarOuPausar)

    function iniciarOuPausar() {
        if(intervaloId){
            songPause.play()
            zerar()
            return
        }
        songPlay.play()
        intervaloId = setInterval(contaRegress, 1000)
        starPauseText.textContent = "Pausar"
        iconPausePlay.setAttribute('src', `imagens/pause.png`)
        
    }

    function zerar(){
        clearInterval(intervaloId)
        starPauseText.textContent = "Começar"
        iconPausePlay.setAttribute('src', `imagens/play_arrow.png`)
        intervaloId = null
    }

    function ShowTimer(){
        const time = new Date(tempSeg * 1000)
        const timeFormatado = time.toLocaleTimeString('pt-Br',{ minute: '2-digit', second:'2-digit'})
        tempScreen.innerHTML = `${timeFormatado}`
    }

    ShowTimer()

});