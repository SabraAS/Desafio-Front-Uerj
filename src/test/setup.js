import '@testing-library/jest-dom';

// Mock do ResizeObserver que pode ser necessário em alguns testes
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
