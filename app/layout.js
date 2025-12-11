import './globals.css'
import Navigation from '../components/layout/Navigation'
import Sidebar from '../components/layout/Sidebar'

export const metadata = {
    title: 'Prodizzy',
    description: 'Build meaningful projects with confidence.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navigation />
                <Sidebar />
                <main>{children}</main>
            </body>
        </html>
    )
}
