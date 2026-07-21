Confirmei o efeito rolando a página real: é um clássico **parallax de colunas** — cada coluna se move em uma velocidade/direção diferente conforme o scroll (a do meio segue mais "normal", as laterais sobem mais rápido), sem rotação 3D visível.

Sobre as libs que mencionei:

- **Magic UI e Aceternity UI** — são bibliotecas de componentes prontos, não vão ter esse efeito específico "pronto pra copiar" com esse comportamento exato. A mais próxima é o componente **"Hero Parallax"** da Aceternity UI, que acabei de abrir e confirmar: ele já faz colunas/linhas se movendo em velocidades diferentes no scroll, mas com rotação e perspectiva 3D — visual mais "inclinado". Daria pra usar como base e remover a rotação para chegar num efeito mais parecido com o do AcademySkills.

Para reproduzir exatamente o que você viu (colunas simples subindo em velocidades diferentes, sem 3D), as opções mais diretas são:

- **Framer Motion** com os hooks `useScroll` + `useTransform`: você lê o progresso do scroll e mapeia para um `translateY` diferente em cada coluna (ex: coluna do meio `y: [0, -50]`, laterais `y: [0, -150]`). É a abordagem mais comum em sites React/Next.js para esse efeito.
- **react-scroll-parallax**: lib dedicada a exatamente isso — você envolve cada coluna num `<Parallax speed={...}>` e define velocidades diferentes por coluna. É a mais "plug and play" para esse caso específico.
- **GSAP + ScrollTrigger**: mais usado fora do ecossistema React puro, mas funciona muito bem também e é o que sites com esse tipo de efeito (estilo Awwwards) costumam usar.

Não existe uma "skill" específica minha para isso — mas eu consigo montar esse componente do zero em React com Framer Motion ou react-scroll-parallax, com 3 colunas e velocidades diferentes, se você quiser. Quer que eu monte esse exemplo?