import '@styles/globals.css';
import Nav from '@components/Nav';

export const metadata = {
    title: "erpmaster",
    description: 'Create and customize your ERP site landing page'
}
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <main className='app'>
                <Nav/>
                <div className='h-full pt-12'>
                    {children}
                </div>
            </main>
        </body>
    </html>  
    )
}

export default RootLayout