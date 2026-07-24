"use client";

import { ParallaxProvider } from "react-scroll-parallax";

/**
 * Fronteira client para o ParallaxProvider (react-scroll-parallax usa contexto
 * e APIs de browser). Reexportado como Client Component para que a page possa
 * permanecer Server Component e só este provider entre no bundle de cliente —
 * as seções são renderizadas no servidor e passadas como children.
 */
export default ParallaxProvider;
