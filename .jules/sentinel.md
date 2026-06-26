# Sentinel Security Journal

## [2026-06-26] Fix JS-YAML Quadratic-complexity DoS (GHSA-h67p-54hq-rp68)

- **Vulnerability**: Quadratic-complexity DoS in merge key handling via repeated aliases in `js-yaml` <= 4.1.1.
- **Fix**:
    - Overrode `js-yaml` to `^5.1.0` in `package.json`.
    - Switched `gray-matter` to `@11ty/gray-matter` (fork) to support `js-yaml` v4+ parsing (removal of `safeLoad`).
    - Updated `vite.config.ts` to use namespace import for `js-yaml` and configured custom engines for frontmatter parsing.
- **Verification**: `pnpm audit` and `audit-ci` confirm no moderate+ vulnerabilities.

## [2026-06-26] Fix OpenTelemetry Core Unbounded memory allocation (GHSA-8988-4f7v-96qf)

- **Vulnerability**: Unbounded memory allocation in W3C Baggage propagation in `@opentelemetry/core` < 2.8.0.
- **Fix**: Overrode `@opentelemetry/core` to `^2.8.0` in `package.json`.
- **Verification**: `pnpm run security-audit` passes.
