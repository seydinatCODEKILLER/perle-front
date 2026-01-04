/**
 * Lien vers login
 */
export const LoginLink = () => (
  <p className="text-center text-sm text-muted-foreground">
    Vous avez déjà un compte ?{" "}
    <a
      href="/login"
      className="text-orange-600 hover:text-orange-700 underline font-semibold transition-colors"
    >
      Se connecter
    </a>
  </p>
);
