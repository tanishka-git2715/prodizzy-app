import './globals.css'
import Navigation from '../components/layout/Navigation'

export const metadata = {
    title: 'Prodizzy',
    description: 'Build meaningful projects with confidence.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navigation />
                <main>{children}</main>
            </body>
        </html>
    )
}
