# TpcIcmIonic
Food app developed in Ionic

############################################################

Notas acerca do trabalho.
 
Possui cache e mapa com pontos a trabalhar (passar o dedo por cima dos pontos para ver as legendas). 
A aplicação vai buscar as refeições para o dia (e se o utilizador aceder várias vezes à app ela vai usar a cache, e se o utilizador 
estiver sem net e possuir uma cache, a aplicação também a vai usar. Caso o utilizador não tenha acedido uma única vez num dado dia 
à internet então a cache anterior não vai ser válida.  


############################################################


Notas sobre o deployment 

Tentei fazer deployment em android mas sem sucesso. Apesar de ter verificado várias vezes que tinha o android studio instalado (e mesmo tentando desinstalar e instalar outra vez) o ionic queixava-se sempre de que lhe faltava variáveis e plataformas android para fazer o deployment. As soluções que encontrei na net nomeadamente StackOverflow não ajudaram. 


Uma outra coisa a notar foi o facto de ter sido necessário instalar um plugin no meu browser, "CORS", visto que a aplicação continha sempre um erro quando tentava aceder à api devido a erros "Access-Control-Allow-Origin". Pelo que percebi foi de usar comandos deployment em ionic (nomeadamente o ionic serve para testar no browser) e que isto não aconteceria se correr em modo produção. De qualquer das formas adicionei este plugin à plataforma android mas como não consegui testar não verifiquei se estava bem. Para correr em browser basta ter este plugin instalado e a correr. 

Ás vezes no chrome o plugin deixava de trabalhar e portanto tinha que o desligar e voltar a ligar e fazer f5 na página. 


