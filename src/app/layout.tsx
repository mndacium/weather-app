import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { AppHeader } from "@/components/layout";
import { GoogleMapsAPIProvider, ReactQueryProvider } from "@/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <GoogleMapsAPIProvider>
            <Stack minHeight="100vh">
              <AppHeader />
              <Stack flex="1">
                <Container maxWidth="xl" sx={{ my: 4 }}>
                  {children}
                </Container>
              </Stack>
            </Stack>
          </GoogleMapsAPIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
