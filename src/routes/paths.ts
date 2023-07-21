export const paths = {
  menu: "/",
  auth: {
    signIn: {
      root: "/auth/sign-in",
    },
    createAccount: {
      root: "/auth/create-account",
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
};
