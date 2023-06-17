import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Maze Generator',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<body className={inter.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
