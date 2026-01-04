/**
 * Lien vers login
 */
export const LoginLink = () => (
  <p className="text-center text-sm text-muted-foreground">
    Vous avez déjà un compte ?{" "}
    <a
      href="/login"
      className="text-green-600 hover:text-green-700 font-semibold transition-colors"
    >
      Se connecter
    </a>
  </p>
);
