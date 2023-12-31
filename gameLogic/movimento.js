function colisao(objA, objB) {
    return (
        objA.x < objB.x + objB.width &&
        objA.x + objA.width > objB.x &&
        objA.y < objB.y + objB.height &&
        objA.y + objA.height > objB.y
    );
}

function atualiza() {

    colisaoInimigo();

    atualizaInimigo();

    if (teclas['a'] || teclas['A']) {
        player.x -= player.velocidade;
    }

    if (teclas['d'] || teclas['D']) {
        player.x += player.velocidade;
    }

    for(var i = 0; i < cano.length; i++){
    
    
        if(colisao(player, cano[i]) && player.y <  cano[i].y){
        
        player.velocidadeY = 0;
        player.y = cano[i].y - player.height;
        player.pulando = false;
        noChao = true;

        if ((teclas['w'] || teclas['W']) && !player.pulando && noChao) {
            player.velocidadeY = -player.alturaPulo;
            player.pulando = true;
            noChao = false;
        }
        break;

        }else{
            player.velocidadeY += player.gravidade/(cano.length + npcs.length) ;
        
        }
        if(colisao(player, cano[i]) && player.x < cano[i].x + cano[i].width * 0.5){
            player.x = cano[i].x - player.height;
        }

        if(colisao(player, cano[i]) && player.x > cano[i].x + cano[i].width * 0.5){
            player.x = cano[i].x + cano[i].width
        }
    };

    for(var i = 0; i < npcs.length; i++){
    
    
    if(colisao(player, npcs[i]) && player.y <  npcs[i].y){
    
    player.velocidadeY = 0;
    player.y = npcs[i].y - player.height;
    player.pulando = false;
    noChao = true;

    if ((teclas['w'] || teclas['W']) && !player.pulando && noChao) {
        player.velocidadeY = -player.alturaPulo;
        player.pulando = true;
        noChao = false;
    }
    break;

    }else{
        player.velocidadeY += player.gravidade/(cano.length + npcs.length);
    
    }
};

player.y += player.velocidadeY;

    var noChao = false;
    plataforma.forEach(function(plataforma) {
        if (
            player.x < plataforma.x + plataforma.width &&
            player.x + player.width > plataforma.x &&
            player.y + player.height > plataforma.y &&
            player.y < plataforma.y + plataforma.height
        ) {
            player.y = plataforma.y - player.height;
            player.pulando = false;
            player.velocidadeY = 0;
            noChao = true;
        }
    });
        barreira.forEach(function(barreira) {
            if (
                player.x < barreira.x + barreira.width &&
                player.x + player.width > barreira.x &&
                player.y + player.height > barreira.y &&
                player.y < barreira.y + barreira.height
            ) {
                if(barreira.x == -200)
                {
                    player.velocidadeY = 0;
                    player.x = player.x + 5;
                }
                else
                {
                    player.velocidadeY = 0;
                    player.x = player.x - 5;
                }
            }
    });

    
    if (!noChao) {
        player.pulando = true;
    }

if ((teclas['w'] || teclas['W']) && !player.pulando && noChao) {
    player.velocidadeY = -player.alturaPulo;
    player.pulando = true;
}

    npcs.forEach(function(npc) {
        var distancia = Math.sqrt(Math.pow((player.x + player.width / 2) - (npc.x + npc.width / 2), 2) +
                                Math.pow((player.y + player.height / 2) - (npc.y + npc.height / 2), 2));

        var raio = 75;

        if (distancia < raio) {

            if (teclas['Enter'] && npc.respondido == false) {
                mostrarDialogo(npc.quiz.question, npc.quiz.options);
                startCronometro(cronometro);
                npc.respondido = true;
            }
        }
    });

    camera.x = player.x - canvas.width / 4;
}