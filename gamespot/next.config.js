/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    allowedDevOrigins: ["3000-firebase-firesubz-1747205888472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev","9000-firebase-firesubz-1747205888472.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev"],
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default config;
