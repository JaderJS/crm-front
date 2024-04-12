export const APP_ROUTES = {
  private: {
    home: {
      path: "/",
    },
  },

  public: {
    Login: {
      path: "/Login",
    },
    LoginMindForge: {
      path: "/LoginMindForge",
    },
    Cadastro: {
      path: "/Cadastro",
    },
    Thanksforregistering: {
      path: "/Thanksforregistering",
    },
    ForgotPassword: {
      path: "/ForgotPassword",
    },
    ForgotPasswordToken: {
      path: "/ForgotPassword/[token]",
    },
    CadastroQnpEcommerce: {
      path: "/CadastroQnp/QnpEcommerce/[uuid]",
    },
    CadastroQnpIs: {
      path: "/CadastroQnp/QnpIs/[uuid]",
    },
    CadastroQnpThanks: {
      path: "/CadastroQnp/ThanksQnp",
    },
    PageNotFound: {
      path: "/404",
    },
    
  },
}
