# DevClub — Landing Institucional

Landing page institucional do DevClub, uma escola de programação. O projeto reconstrói a página de vendas com foco em performance, animações fluidas e uma arquitetura de componentes organizada por seção.

**🔗 Ver ao vivo:** [devclub-institucional-ia.vercel.app](https://devclub-institucional-ia.vercel.app/)

> Desafio técnico — desenvolvido por [Mikaeli Sampaio](https://github.com/mikasampaio).

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com)** + **shadcn/ui** e **[Base UI](https://base-ui.com)**
- **[GSAP](https://gsap.com)** e **[Framer Motion](https://motion.dev)** para animações
- **[OGL](https://github.com/oframe/ogl)** para o efeito de raios de luz (WebGL)
- **[Embla Carousel](https://www.embla-carousel.com)** para os carrosséis
- **[Vitest](https://vitest.dev)** + **Testing Library** para testes
- **ESLint** + **Prettier**

## Como rodar

Pré-requisitos: **Node.js 20+** e **[pnpm](https://pnpm.io)**.

```bash
# instalar dependências
pnpm install

# rodar em desenvolvimento
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Outros scripts

```bash
pnpm build         # build de produção
pnpm start         # sobe o build de produção
pnpm lint          # ESLint
pnpm format        # Prettier (escrita)
pnpm format:check  # Prettier (verificação)
pnpm test          # testes (Vitest)
pnpm test:watch    # testes em watch mode
```

## Estrutura

```
src/
├── app/                  # App Router (layout, page, estilos globais)
├── components/
│   ├── sections/         # seções da página (Hero, Team, Pricing, FAQ, ...)
│   ├── ui/               # componentes de UI reutilizáveis
│   ├── lightrays/        # efeito de raios de luz
│   └── ...               # componentes agrupados por feature
├── hooks/                # hooks customizados
└── lib/                  # utilitários (cn, helpers)
```

A página inicial ([src/app/page.tsx](src/app/page.tsx)) monta as seções na ordem do layout de referência: Hero, Formações, Tecnologias, Diferenciais, Plataforma, Projetos, Depoimentos, Time, Bônus, Certificados, Comparação salarial, Garantia, FAQ e CTA final.

## Decisões técnicas

- **Organização por feature** — cada seção complexa tem sua própria pasta com componentes, dados (`.ts`) e estilos, mantendo o `page.tsx` enxuto e legível.
- **Animações** — GSAP para animações ligadas a scroll e Framer Motion para transições de componentes.
- **Dados desacoplados da UI** — conteúdos como depoimentos, mentores e certificados ficam em arquivos de dados próprios, separados dos componentes que os renderizam.
- **Testes** — cobertura em componentes de lógica sensível (ex.: comparação salarial, seção de garantia) com Vitest + Testing Library.
