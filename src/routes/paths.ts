export const paths = {
  menu: "/",
  auth: {
    signIn: {
      root: "/auth/sign-in",
    },
    forgotPassword: {
      send: "/auth/forgot-password/send",
      reset: "/auth/forgot-password/reset",
    },
    createAccount: {
      root: "/auth/create-account",
      finishUp: {
        root: "/auth/create-account/finish-up",
      },
    },
  },
  multiplayer: {
    root: "/multiplayer",
    lobby: {
      root: "/multiplayer/lobby",
      createRoom: {
        root: "/multiplayer/lobby/create-room",
      },
    },
    game: {
      root: "/multiplayer/game",
      addedToRoom: "/multiplayer/game/added-to-room",
      waitingForPlayers: "/multiplayer/game/waiting-for-players",
    },
  },
};

export const apiRoutes = {
  ioTokens: {
    root: "/api/io-tokens",
  },
  user: {
    createAccount: {
      root: "/api/user/create-account",
    },
  },
};
