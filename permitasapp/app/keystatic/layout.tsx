import KeystaticApp from "./keystatic";

export default function Layout() {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        <KeystaticApp />
      </body>
    </html>
  );
}
