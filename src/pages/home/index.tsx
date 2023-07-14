import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonStylePrimary } from "../../assets/class-styles";
import { setAccountData } from "../../store/accountSlice";
import CarouselPhotos from "./page/carousel-photos";
import LoginRegister from "./page/float-buttons";
import FooterHome from "./page/footer-page";
import Header from "./page/header";
import HomeCards from "./page/home-cards";
import './page/home.css';
export default function Home() {
	return (
		<>
			<Header></Header>
			<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
			<HomeCards></HomeCards>
			<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
			<CarouselPhotos></CarouselPhotos>
			<hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
			<FooterHome></FooterHome>
		</>
	)
}