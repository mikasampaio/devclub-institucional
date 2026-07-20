Aqui está um prompt que você pode colar direto num assistente de código (Claude Code, Cursor, v0 etc.) para gerar essa seção:

---

**Prompt:**

Crie uma seção React (com Tailwind CSS e Framer Motion) chamada `AlemDoCodigoSection`, inspirada visualmente na seção de cursos "Cursos Skills" de um site de escola de design: cards grandes, full-width, com fundo colorido sólido (tons escuros/vibrantes diferentes por card), cantos bem arredondados, layout dividido em duas colunas (texto de um lado, ilustração/mockup interativo do outro, alternando o lado a cada card), e um botão CTA com ícone de seta dupla.

Título da seção (heading grande, centralizado, acima dos cards): "Tudo que você precisa ALÉM do Código para Evoluir mais rápido"

Crie 4 cards, cada um representando um grupo temático, com título, descrição curta e uma pequena ilustração/mockup animado que reforce visualmente o conceito:

1. **Carreira** — título: "Acompanhamento de carreira dedicado". Descrição: menciona acompanhamento semanal com recrutadora e acesso a vagas exclusivas. Ilustração: mockup de um card de "vaga" com badge animado tipo "Exclusiva" e uma lista simulando notificações de vagas aparecendo (fade-in sequencial).

2. **Saúde mental e performance** — título: "Suporte psicológico de alta performance". Descrição: menciona terapeuta especializado em alta performance para profissionais de tecnologia. Ilustração: mockup de chat/sessão com bolhas de mensagem aparecendo suavemente (efeito stagger).

3. **Aprendizado guiado** — título: "Mentoria e comunidade ativa". Descrição: menciona mentorias semanais e comunidade de tecnologia para trocar experiência. Ilustração: mockup de avatares se conectando por linhas animadas (rede/comunidade), com pulsos de destaque.

4. **Suporte contínuo** — título: "Suporte 24 horas, todos os dias". Descrição: menciona agentes de IA disponíveis 24h e suporte humano 7 dias por semana. Ilustração: mockup de painel de chat com indicador "online" pulsando e um ícone de IA alternando com ícone de atendente humano.

Requisitos técnicos:
- Componentes funcionais em React (TypeScript se possível), usando `motion` do Framer Motion para animações de entrada (`whileInView`, fade + slide) e microinterações dentro dos mockups.
- Layout responsivo: em telas mobile, as duas colunas de cada card colapsam em coluna única (texto acima, ilustração abaixo).
- Cores: usar uma paleta com 4 tons distintos por card, mantendo contraste alto com texto branco.
- Estrutura de dados: os 4 cards devem vir de um array `cards[]` (título, descrição, cor, tipo de ilustração) para facilitar manutenção, não hardcoded direto no JSX.
- Botão CTA reutilizável (`<CtaButton />`) com texto "Saiba mais" e ícone de seta dupla.
- Sem bibliotecas externas de ilustração pronta — os mockups devem ser feitos com divs/SVGs simples estilizados via Tailwind, para manter leveza.

---

Quer que eu ajuste esse prompt com nomes de cores específicos da identidade visual do seu mentor, ou ele já tem uma paleta definida?