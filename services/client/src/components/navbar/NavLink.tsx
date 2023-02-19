import { Link } from "react-router-dom";

interface Props {
	title: string;
	href: string;
	className?: string;
}

export default function NavLink({ title, href, className } : Props) {
	return  (
		<Link to={ href } className={ className }>{ title }</Link>
	)
}
