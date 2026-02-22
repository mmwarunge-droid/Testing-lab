// src/tests/setup.jsx
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Helper to mock fetch responses consistently in tests
global.setFetchResponse = (val) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(val),
      ok: true,
      status: 200,
    })
  );
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});