import '@/app/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from '@/components/bootstrap';
import NavBar from './NavBar';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s - Nextjs Image Gallery',
    default: 'Nextjs Gallery',
  },
  description: 'Using nextjs to generate image gallery.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NavBar/>
          <main>
            <Container className='py-4'>
              {children}
            </Container>
          </main>
      </body>
    </html>
  );
}
