import './globals.css'
import Navigation from '../components/layout/Navigation'
import Sidebar from '../components/layout/Sidebar'
import { ThemeProvider } from '../components/theme-provider'

export const metadata = {
    title: 'Prodizzy',
    description: 'Build meaningful projects with confidence.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Navigation />
                    <Sidebar />
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    )
}
