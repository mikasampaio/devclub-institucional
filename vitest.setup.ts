import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom não implementa IntersectionObserver, usado pelo `whileInView` do
// framer-motion. Stub mínimo para os componentes montarem nos testes.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
