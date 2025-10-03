import '@testing-library/jest-dom'

// Mock do IntersectionObserver para testes
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock do window.scrollTo para testes de navegação
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true
})
