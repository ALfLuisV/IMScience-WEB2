// import "./globals.css";
import '../app/globals.css'

export const metadata = {
  title: "IMscience",
  description: "Painel de Administração",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}