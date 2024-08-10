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
            <div className="">
                <div></div>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
        </body>
    </html>  
    )
}

export default RootLayout