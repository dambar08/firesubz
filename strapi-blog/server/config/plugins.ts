export default ({env}) => ({
  config: {
      endpoint: '/graphql',
      shadowCRUD: true,
       landingPage: (strapi) => {
        if (env("NODE_ENV") !== "production") {
          return true;
        } else {
          return false;
        }
      },
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
});
