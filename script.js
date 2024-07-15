document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector('html');
    const btns = document.querySelectorAll('.app__card-button');
    const banner = document.querySelector('.app__image');
    const titulo = document.querySelector('.app__title');
    const musicInput = document.querySelector('#alternar-musica');
    const starPauseBtn = document.querySelector('#start-pause');
    const starPauseText = document.querySelector('#start-pause span');
    const iconPausePlay = document.querySelector('.app__card-primary-butto-icon');
    const tempScreen = document.querySelector('#timer');

    const songPlay = new Audio('/sons/play.wav');
    const songPause = new Audio('/sons/pause.mp3');
    const songBeep = new Audio('/sons/beep.mp3');
    const music = new Audio('/sons/luna-rise-part-one.mp3');
    music.loop = true;

    let tempSeg = 15;
    let intervaloId = null;

    const contextos = {
        'foco': {
            tempo: 15,
            texto: `Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>`,
            img: 'imagens/foco.png'
        },
        'descanso-curto': {
            tempo: 300,
            texto: `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
            img: 'imagens/descanso-curto.png'
        },
        'descanso-longo': {
            tempo: 900,
            texto: `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`,
            img: 'imagens/descanso-longo.png'
        }
    };

    musicInput.addEventListener('change', () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    });

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const contexto = btn.dataset.contexto;
            tempSeg = contextos[contexto].tempo;
            alterarContexto(contexto);
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    function alterarContexto(contexto) {
        showTimer();
        html.setAttribute('data-contexto', contexto);
        banner.setAttribute('src', contextos[contexto].img);
        titulo.innerHTML = contextos[contexto].texto;
    }

    const contaRegress = () => {
        if (tempSeg <= 0) {
            songBeep.play();
            const focoAtivo = html.getAttribute('data-contexto') == 'foco'
            if(focoAtivo){
                const event = new CustomEvent('FocoFinalizado')
                document.dispatchEvent(event)
            } 
            zerar();
            alert('Tempo Finalizado !');
            return;
        }

        tempSeg -= 1;
        showTimer();
    };

    starPauseBtn.addEventListener('click', iniciarOuPausar);

    function iniciarOuPausar() {
        if (intervaloId) {
            songPause.play();
            zerar();
            return;
        }
        songPlay.play();
        intervaloId = setInterval(contaRegress, 1000);
        starPauseText.textContent = "Pausar";
        iconPausePlay.setAttribute('src', `imagens/pause.png`);
    }

    function zerar() {
        clearInterval(intervaloId);
        starPauseText.textContent = "Começar";
        iconPausePlay.setAttribute('src', `imagens/play_arrow.png`);
        intervaloId = null;
    }

    function showTimer() {
        const time = new Date(tempSeg * 1000);
        const timeFormatado = time.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
        tempScreen.innerHTML = `${timeFormatado}`;
    }

    showTimer();
});
