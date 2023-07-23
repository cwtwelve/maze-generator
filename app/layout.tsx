import "./globals.scss";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
	title: "Maze Generator"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<body className={robotoMono.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
