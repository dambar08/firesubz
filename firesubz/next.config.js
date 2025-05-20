/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    allowedDevOrigins: ['3000-idx-firesubz-1744693741777.cluster-6dx7corvpngoivimwvvljgokdw.cloudworkstations.dev']
};

export default config;
